
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Company } from "@/types/company";

interface CompanyOverviewProps {
  company: Company;
}

export const CompanyOverview = ({ company }: CompanyOverviewProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Company Overview</CardTitle>
      </CardHeader>
      <CardContent>
        <p>{company.description}</p>
        <Separator className="my-4" />
        <h3 className="mb-2 text-lg font-medium">AI Insights</h3>
        <div className="rounded-md bg-gray-50 p-4 text-sm">
          {company.insights}
        </div>
      </CardContent>
    </Card>
  );
};
