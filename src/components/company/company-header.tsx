
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Download } from "lucide-react";
import { Company } from "@/types/company";
import { generateFullReport } from "./report-generators";

interface CompanyHeaderProps {
  company: Company;
}

export const CompanyHeader = ({ company }: CompanyHeaderProps) => {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
          <div className="h-16 w-16 overflow-hidden rounded-md bg-gray-100">
            <img
              src={company.logo}
              alt={company.name}
              className="h-full w-full object-cover"
            />
          </div>
          <div className="flex-1">
            <h1 className="text-2xl font-bold">{company.name}</h1>
            <p className="text-muted-foreground">
              {company.industry} • {company.location} • {company.stage}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" className="ml-auto" onClick={() => generateFullReport(company)}>
              <Download className="mr-2 h-4 w-4" />
              Generate Report
            </Button>
            <div className="rounded-md bg-vc-blue-light bg-opacity-10 px-3 py-1 text-vc-blue">
              {company.status}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
