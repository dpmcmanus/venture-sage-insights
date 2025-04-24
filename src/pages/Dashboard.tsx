
import { StatsCard } from "@/components/stats-card";
import { CompanyCard } from "@/components/company-card";
import { MiniChart } from "@/components/mini-chart";
import { portfolioCompanies } from "@/services/mock-data";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart2, TrendingUp, Users, DollarSign } from "lucide-react";

const Dashboard = () => {
  // Calculate portfolio metrics
  const totalInvested = portfolioCompanies.reduce(
    (sum, company) => sum + company.investmentAmount,
    0
  );
  
  const totalValuation = portfolioCompanies.reduce(
    (sum, company) => sum + company.valuation,
    0
  );
  
  const averageGrowth = portfolioCompanies.reduce(
    (sum, company) => sum + company.growth, 
    0
  ) / portfolioCompanies.length;
  
  const totalRevenue = portfolioCompanies.reduce(
    (sum, company) => sum + company.revenue.current,
    0
  );

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Total Companies"
          value={portfolioCompanies.length}
          description="Active Portfolio"
          icon={<Users size={18} />}
        />
        <StatsCard
          title="Total Invested"
          value={`$${(totalInvested / 1000000).toFixed(1)}M`}
          description="Capital Deployed"
          icon={<DollarSign size={18} />}
        />
        <StatsCard
          title="Portfolio Valuation"
          value={`$${(totalValuation / 1000000).toFixed(1)}M`}
          trend={15}
          icon={<TrendingUp size={18} />}
        />
        <StatsCard
          title="Average Growth"
          value={`${averageGrowth.toFixed(1)}%`}
          description="Year over Year"
          trend={8}
          icon={<BarChart2 size={18} />}
        />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Portfolio Overview</CardTitle>
          <CardDescription>
            AI-generated insights on current portfolio performance and trends
          </CardDescription>
        </CardHeader>
        <CardContent className="bg-gray-50 p-4 text-sm">
          <p className="mb-2 font-medium">Key insights:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Your portfolio has grown 15% in valuation over the past quarter, outperforming the tech index by 4%.</li>
            <li>NeuraTech AI shows the strongest growth trajectory, with revenue increasing 142% YoY.</li>
            <li>GreenMile is approaching a potential Series D with strong metrics.</li>
            <li>Two companies are showing early warning signs with increased churn: QuantumCloud and SecureBlock.</li>
          </ul>
        </CardContent>
      </Card>

      <div>
        <h2 className="mb-4 text-xl font-semibold">Portfolio Companies</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {portfolioCompanies.map((company) => (
            <CompanyCard key={company.id} company={company} />
          ))}
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Portfolio Revenue Trends</CardTitle>
          <CardDescription>
            Quarterly revenue growth across portfolio companies
          </CardDescription>
        </CardHeader>
        <CardContent className="p-4">
          <div className="grid gap-4 sm:grid-cols-2">
            {portfolioCompanies.map((company) => (
              <Card key={company.id} className="overflow-hidden">
                <CardContent className="p-4">
                  <div className="mb-2 flex items-center justify-between">
                    <h3 className="font-medium">{company.name}</h3>
                    <span 
                      className={`text-xs font-semibold ${
                        company.growth >= 0 ? "text-vc-green" : "text-vc-red"
                      }`}
                    >
                      {company.growth > 0 ? "+" : ""}{company.growth}%
                    </span>
                  </div>
                  <MiniChart 
                    data={company.revenue.trend}
                    color="#0747A6"
                    height={50}
                  />
                  <div className="mt-2 flex items-center justify-between text-xs text-muted-foreground">
                    <span>Rev: ${(company.revenue.current / 1000000).toFixed(1)}M</span>
                    <span className="text-vc-gray">
                      YoY: ${((company.revenue.current - company.revenue.previous) / 1000000).toFixed(1)}M
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
