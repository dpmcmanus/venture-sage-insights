
import { useParams } from "react-router-dom";
import { getCompanyById } from "@/services/mock-data";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Award } from "lucide-react";
import { useState } from "react";
import { CompanyHeader } from "@/components/company/company-header";
import { CompanyOverview } from "@/components/company/company-overview";
import { CompanyMetrics } from "@/components/company/company-metrics";
import { RevenueAnalysis } from "@/components/company/revenue-analysis";
import { CapTable } from "@/components/company/cap-table";
import { CompanyNotes } from "@/components/company/company-notes";

const CompanyDetail = () => {
  const { id } = useParams<{ id: string }>();
  const company = getCompanyById(id || "");
  const [notes, setNotes] = useState("");

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
      <CompanyHeader company={company} />
      <CompanyOverview company={company} />
      <CompanyMetrics company={company} />
      
      <div className="grid gap-6 md:grid-cols-3">
        <RevenueAnalysis company={company} />
        <CompanyNotes notes={notes} setNotes={setNotes} />
      </div>

      <CapTable company={company} />

      <Tabs defaultValue="overview">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="patents">Patents</TabsTrigger>
          <TabsTrigger value="products">Products</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Additional Details</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <h3 className="mb-2 font-medium">Market Position</h3>
                  <p className="text-sm text-muted-foreground">
                    {company.name} currently holds approximately {15 + Math.floor(Math.random() * 10)}% 
                    market share in the {company.industry} sector, with strong growth potential in 
                    emerging markets.
                  </p>
                </div>
                <div>
                  <h3 className="mb-2 font-medium">Competitive Landscape</h3>
                  <p className="text-sm text-muted-foreground">
                    Main competitors include industry leaders and several promising startups. 
                    {company.name}'s key differentiators are its technology stack and user acquisition strategy.
                  </p>
                </div>
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
                        <Award className="mt-1 h-5 w-5 text-vc-blue" />
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
