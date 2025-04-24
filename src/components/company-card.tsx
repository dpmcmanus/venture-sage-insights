
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
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 overflow-hidden rounded-md bg-sage-100">
              <img
                src={company.logo}
                alt={company.name}
                className="h-full w-full object-cover"
              />
            </div>
            <div>
              <h3 className="font-medium text-sage-400">{company.name}</h3>
              <p className="text-sm text-sage-300">{company.industry}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-8">
            <div>
              <p className="text-xs text-sage-300">Investment</p>
              <p className="font-medium text-sage-500">
                ${(company.investmentAmount / 1000000).toFixed(1)}M
              </p>
            </div>
            <div>
              <p className="text-xs text-sage-300">Valuation</p>
              <p className="font-medium text-sage-500">
                ${(company.valuation / 1000000).toFixed(1)}M
              </p>
            </div>
            <div>
              <p className="text-xs text-sage-300">Growth YoY</p>
              <p
                className={`font-medium ${
                  company.growth > 0 ? "text-vc-green-dark" : "text-vc-red"
                }`}
              >
                {company.growth > 0 ? "+" : ""}
                {company.growth}%
              </p>
            </div>
            <div>
              <p className="text-xs text-sage-300">Churn</p>
              <p className="font-medium text-sage-500">{company.churn}%</p>
            </div>
            <ArrowUpRight className="h-4 w-4 text-sage-400" />
          </div>
        </div>
      </CardContent>
    </Link>
  );
}
