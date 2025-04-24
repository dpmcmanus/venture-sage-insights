
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MiniChart } from "@/components/mini-chart";
import { FileChartLine } from "lucide-react";
import { Company } from "@/types/company";
import { generateFinancialModel } from "./report-generators";

interface RevenueAnalysisProps {
  company: Company;
}

export const RevenueAnalysis = ({ company }: RevenueAnalysisProps) => {
  return (
    <Card className="col-span-full md:col-span-2">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Revenue Analysis</CardTitle>
          <CardDescription>Historical performance and projections</CardDescription>
        </div>
        <Button variant="outline" className="ml-auto" onClick={() => generateFinancialModel(company)}>
          <FileChartLine className="mr-2 h-4 w-4" />
          Export Financial Model
        </Button>
      </CardHeader>
      <CardContent>
        <div className="h-[400px] w-full">
          <MiniChart data={company.revenue.trend} height={350} />
        </div>
        <div className="mt-4 grid grid-cols-3 gap-4 border-t pt-4">
          <div>
            <p className="text-sm text-muted-foreground">Current Revenue</p>
            <p className="text-lg font-medium">
              ${(company.revenue.current / 1000000).toFixed(1)}M
            </p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">YoY Growth</p>
            <p className={`text-lg font-medium ${
              company.growth > 0 ? "text-vc-green" : "text-vc-red"
            }`}>
              {company.growth > 0 ? "+" : ""}{company.growth}%
            </p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Previous Period</p>
            <p className="text-lg font-medium">
              ${(company.revenue.previous / 1000000).toFixed(1)}M
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
