import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MiniChart } from "@/components/mini-chart";
import { format } from "date-fns";

interface FinancialMetricsProps {
  revenue: {
    current: number;
    previous: number;
    trend: number[];
  };
  growth: number;
  projectedGrowth: number[];
  burnRate: number[];
}

export function FinancialMetrics({
  revenue,
  growth,
  projectedGrowth,
  burnRate
}: FinancialMetricsProps) {
  const today = new Date();
  const currentMonth = format(today, 'MMM yyyy');

  return (
    <Card className="col-span-full md:col-span-2">
      <CardHeader>
        <CardTitle>Financial Analysis</CardTitle>
        <CardDescription>Historical performance and projections</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="revenue">
          <TabsList className="mb-4">
            <TabsTrigger value="revenue">Revenue</TabsTrigger>
            <TabsTrigger value="burn">Burn Rate</TabsTrigger>
            <TabsTrigger value="growth">Growth Rate</TabsTrigger>
          </TabsList>
          
          <TabsContent value="revenue">
            <div className="h-[400px] w-full">
              <MiniChart 
                data={revenue.trend} 
                height={350}
                xAxisLabel="Time (Months)"
                yAxisLabel="Revenue"
                dataLabel="Revenue"
              />
            </div>
            <div className="mt-4 grid grid-cols-3 gap-4 border-t pt-4">
              <div>
                <p className="text-sm text-muted-foreground">Current Revenue</p>
                <p className="text-lg font-medium">
                  ${(revenue.current / 1000000).toFixed(1)}M
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">As of</p>
                <p className="text-lg font-medium">{currentMonth}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Previous Period</p>
                <p className="text-lg font-medium">
                  ${(revenue.previous / 1000000).toFixed(1)}M
                </p>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="burn">
            <div className="h-[400px] w-full">
              <MiniChart 
                data={burnRate} 
                height={350}
                color="#D946EF"
                xAxisLabel="Time (Months)"
                yAxisLabel="Monthly Burn"
                dataLabel="Burn Rate"
              />
            </div>
            <div className="mt-4 grid grid-cols-2 gap-4 border-t pt-4">
              <div>
                <p className="text-sm text-muted-foreground">Current Burn Rate</p>
                <p className="text-lg font-medium">
                  ${((burnRate[burnRate.length - 1] || 0) / 1000000).toFixed(1)}M
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Runway</p>
                <p className="text-lg font-medium">18 months</p>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="growth">
            <div className="h-[400px] w-full">
              <MiniChart 
                data={projectedGrowth} 
                height={350}
                color="#0EA5E9"
                xAxisLabel="Time (Months)"
                yAxisLabel="Growth Rate (%)"
                dataLabel="Growth"
              />
            </div>
            <div className="mt-4 grid grid-cols-2 gap-4 border-t pt-4">
              <div>
                <p className="text-sm text-muted-foreground">Current Growth Rate</p>
                <p className="text-lg font-medium">{growth}%</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Projected EOY</p>
                <p className="text-lg font-medium">
                  {(projectedGrowth[projectedGrowth.length - 1] || growth)}%
                </p>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
