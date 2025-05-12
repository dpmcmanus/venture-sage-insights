
import { Card, CardContent } from "@/components/ui/card";
import { Company } from "@/services/mock-data";
import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";

interface CompanyCardProps {
  company: Company;
}

export function CompanyCard({ company }: CompanyCardProps) {
  return (
    <Link to={`/companies/${company.id}`}>
      <Card className="h-full overflow-hidden transition-all hover:shadow-md hover:bg-vc-sage-bg">
        <CardContent className="p-6">
          <div className="flex flex-col space-y-6">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-4">
                <div className="h-16 w-16 overflow-hidden rounded-lg bg-vc-sage-light/20 flex items-center justify-center">
                  <img
                    src={company.logo}
                    alt={company.name}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-vc-sage-dark">{company.name}</h3>
                  <p className="text-base text-muted-foreground">{company.industry}</p>
                </div>
              </div>
              <ArrowUpRight className="h-5 w-5 text-vc-sage" />
            </div>
            
            <div className="grid grid-cols-2 gap-6">
              <div>
                <p className="text-sm text-muted-foreground">Investment</p>
                <p className="text-lg font-medium">
                  ${(company.investmentAmount / 1000000).toFixed(1)}M
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Valuation</p>
                <p className="text-lg font-medium">
                  ${(company.valuation / 1000000).toFixed(1)}M
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Growth YoY</p>
                <p
                  className={`text-lg font-medium ${
                    company.growth > 0 ? "text-vc-sage" : "text-vc-red"
                  }`}
                >
                  {company.growth > 0 ? "+" : ""}
                  {company.growth}%
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Churn</p>
                <p className="text-lg font-medium">{company.churn}%</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
