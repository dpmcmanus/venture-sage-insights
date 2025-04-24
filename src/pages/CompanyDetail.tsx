
import { useParams } from "react-router-dom";
import { getCompanyById } from "@/services/mock-data";
import { StatsCard } from "@/components/stats-card";
import { MiniChart } from "@/components/mini-chart";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart2, Users, DollarSign, FileText, Award } from "lucide-react";

const CompanyDetail = () => {
  const { id } = useParams<{ id: string }>();
  const company = getCompanyById(id || "");

  if (!company) {
    return (
      <div className="flex h-[80vh] items-center justify-center">
        <div className="text-center">
          <h2 className="mb-2 text-xl font-semibold">Company not found</h2>
          <p className="text-muted-foreground">
            The company you are looking for does not exist or has been removed.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
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
            <div className="rounded-md bg-vc-blue-light bg-opacity-10 px-3 py-1 text-vc-blue">
              {company.status}
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Investment"
          value={`$${(company.investmentAmount / 1000000).toFixed(1)}M`}
          description={`${company.equity}% Equity`}
          icon={<DollarSign size={18} />}
        />
        <StatsCard
          title="Current Valuation"
          value={`$${(company.valuation / 1000000).toFixed(1)}M`}
          trend={15}
          icon={<TrendingUp size={18} />}
        />
        <StatsCard
          title="Growth (YoY)"
          value={`${company.growth}%`}
          icon={<BarChart2 size={18} />}
        />
        <StatsCard
          title="Churn Rate"
          value={`${company.churn}%`}
          trend={company.churn > 3 ? 2 : -1}
          icon={<Users size={18} />}
        />
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Revenue Trend</CardTitle>
            <CardDescription>Quarterly revenue performance</CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <MiniChart data={company.revenue.trend} height={200} />
            <div className="mt-4 flex items-center justify-between">
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
                <p className="text-sm text-muted-foreground">Previous</p>
                <p className="text-lg font-medium">
                  ${(company.revenue.previous / 1000000).toFixed(1)}M
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Team</CardTitle>
            <CardDescription>Key leadership</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {company.team.map((member, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="h-10 w-10 overflow-hidden rounded-full bg-gray-100">
                    <img
                      src={member.photo}
                      alt={member.name}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div>
                    <p className="font-medium">{member.name}</p>
                    <p className="text-sm text-muted-foreground">{member.position}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="patents">Patents</TabsTrigger>
          <TabsTrigger value="products">Products</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="mt-4">
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
        </TabsContent>
        <TabsContent value="patents" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Patent Activity</CardTitle>
              <CardDescription>
                {company.patents} patents filed or granted
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {Array(3).fill(0).map((_, index) => (
                  <Card key={index}>
                    <CardContent className="p-4">
                      <div className="flex items-start gap-3">
                        <FileText className="mt-1 h-5 w-5 text-vc-blue" />
                        <div>
                          <h4 className="font-medium">
                            Method and System for {index === 0 ? "Predictive Analytics in Healthcare" : 
                                               index === 1 ? "Machine Learning Model Training" :
                                               "Data Processing and Visualization"}
                          </h4>
                          <p className="text-sm text-muted-foreground">
                            Filed: {index === 0 ? "March 15, 2024" : 
                                   index === 1 ? "January 22, 2024" :
                                   "November 5, 2023"}
                          </p>
                          <p className="mt-2 text-sm">
                            {index === 0 ? "Novel approach to utilizing machine learning for healthcare outcome predictions." : 
                             index === 1 ? "System for optimizing neural network training with reduced computational resources." :
                             "Method of processing and visualizing complex datasets for intuitive understanding."}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
                <div className="flex justify-center">
                  <span className="text-sm text-vc-blue cursor-pointer hover:underline">
                    View all {company.patents} patents
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="products" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Product Portfolio</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                {company.products.map((product, index) => (
                  <Card key={index}>
                    <CardContent className="p-4">
                      <div className="flex items-start gap-3">
                        <Award className="mt-1 h-5 w-5 text-vc-blue" />
                        <div>
                          <h4 className="font-medium">{product}</h4>
                          <p className="text-sm text-muted-foreground">
                            {index === 0 ? "Flagship Product" : 
                             index === 1 ? "Growth Product" :
                             "New Release"}
                          </p>
                          <p className="mt-2 text-sm">
                            {index === 0 ? "Primary revenue driver with established market presence." : 
                             index === 1 ? "Rapidly growing solution with strong customer adoption." :
                             "Recently launched product with early positive feedback."}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CompanyDetail;
