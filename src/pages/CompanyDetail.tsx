import { useParams } from "react-router-dom";
import { getCompanyById } from "@/services/mock-data";
import { StatsCard } from "@/components/stats-card";
import { MiniChart } from "@/components/mini-chart";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { BarChart2, Users, DollarSign, FileText, Award, TrendingUp, FileChartLine, Download, Table } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { toast } from "sonner";
import html2pdf from "html2pdf.js";
import { saveAs } from 'file-saver';

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

  const generateFullReport = () => {
    console.log("Generate full AI report");
    
    const pdfContent = document.createElement("div");
    pdfContent.innerHTML = `
      <div style="padding: 20px; font-family: Arial, sans-serif;">
        <div style="display: flex; align-items: center; margin-bottom: 20px;">
          <div style="width: 60px; height: 60px; overflow: hidden; margin-right: 15px;">
            <img src="${company.logo}" style="width: 100%; height: 100%; object-fit: cover;">
          </div>
          <div>
            <h1 style="margin: 0; font-size: 24px;">${company.name}</h1>
            <p style="margin: 5px 0; color: #666;">${company.industry} • ${company.location}</p>
          </div>
        </div>
        
        <h2 style="border-bottom: 1px solid #eee; padding-bottom: 10px;">Financial Overview</h2>
        <div style="margin-bottom: 20px;">
          <p><strong>Investment Amount:</strong> $${(company.investmentAmount / 1000000).toFixed(1)}M</p>
          <p><strong>Equity:</strong> ${company.equity}%</p>
          <p><strong>Current Valuation:</strong> $${(company.valuation / 1000000).toFixed(1)}M</p>
          <p><strong>Annual Growth:</strong> ${company.growth}%</p>
          <p><strong>Current Revenue:</strong> $${(company.revenue.current / 1000000).toFixed(1)}M</p>
        </div>
        
        <h2 style="border-bottom: 1px solid #eee; padding-bottom: 10px;">Team Structure</h2>
        <div style="margin-bottom: 20px;">
          ${company.team.map(member => `
            <div style="margin-bottom: 10px;">
              <p style="margin: 0; font-weight: bold;">${member.name}</p>
              <p style="margin: 0; color: #666;">${member.position}</p>
            </div>
          `).join('')}
        </div>
        
        <div style="page-break-before: always;">
          <h2 style="border-bottom: 1px solid #eee; padding-bottom: 10px;">Company Insights</h2>
          <p style="margin-bottom: 20px;">${company.description}</p>
          
          <h3>AI Analysis</h3>
          <div style="background-color: #f9f9f9; padding: 15px; border-radius: 5px;">
            ${company.insights}
          </div>
          
          <h2 style="border-bottom: 1px solid #eee; padding-bottom: 10px; margin-top: 30px;">Products</h2>
          <div>
            ${company.products.map((product, index) => `
              <div style="margin-bottom: 15px;">
                <p style="margin: 0; font-weight: bold;">${product}</p>
                <p style="margin: 0; color: #666;">
                  ${index === 0 ? "Flagship Product - Primary revenue driver with established market presence." : 
                   index === 1 ? "Growth Product - Rapidly growing solution with strong customer adoption." :
                   "New Release - Recently launched product with early positive feedback."}
                </p>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    `;

    const opt = {
      margin: 10,
      filename: `${company.name}_Company_Report.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };

    html2pdf().set(opt).from(pdfContent).save().then(() => {
      toast.success("Company report generated successfully");
    });
  };

  const generateFinancialModel = () => {
    const headers = ['Month', 'Revenue', 'Growth', 'Burn Rate', 'Cash Balance'];
    const csvData = [headers];
    
    const monthlyRevenue = company.revenue.current / 12;
    const monthlyGrowth = company.growth / 12;
    let currentRevenue = monthlyRevenue;
    let cashBalance = company.investmentAmount;
    const monthlyBurn = company.investmentAmount * 0.05;

    for (let i = 1; i <= 12; i++) {
      currentRevenue = currentRevenue * (1 + monthlyGrowth / 100);
      cashBalance = cashBalance - monthlyBurn + currentRevenue;
      
      csvData.push([
        `Month ${i}`,
        currentRevenue.toFixed(2),
        `${monthlyGrowth.toFixed(2)}%`,
        monthlyBurn.toFixed(2),
        cashBalance.toFixed(2)
      ]);
    }

    const csvContent = csvData.map(row => row.join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8' });
    saveAs(blob, `${company.name}_Financial_Model.csv`);
    toast.success("Financial model exported successfully");
  };

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
            <div className="flex items-center gap-2">
              <Button variant="outline" className="ml-auto" onClick={generateFullReport}>
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
        <Card className="col-span-full md:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Revenue Analysis</CardTitle>
              <CardDescription>Historical performance and projections</CardDescription>
            </div>
            <Button variant="outline" className="ml-auto" onClick={generateFinancialModel}>
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

        <Card className="md:col-span-1">
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

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Cap Table</CardTitle>
            <CardDescription>Equity distribution</CardDescription>
          </div>
          <Button variant="outline" size="sm">
            <Table className="mr-2 h-4 w-4" />
            Export
          </Button>
        </CardHeader>
        <CardContent>
          <div className="relative overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-gray-50 text-xs uppercase">
                <tr>
                  <th className="px-6 py-3">Investor</th>
                  <th className="px-6 py-3">Shares</th>
                  <th className="px-6 py-3">Percentage</th>
                  <th className="px-6 py-3">Investment</th>
                  <th className="px-6 py-3">Date</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="px-6 py-4">Founders</td>
                  <td className="px-6 py-4">650,000</td>
                  <td className="px-6 py-4">{65 - company.equity}%</td>
                  <td className="px-6 py-4">Initial</td>
                  <td className="px-6 py-4">Jan 2021</td>
                </tr>
                <tr className="border-b bg-gray-50">
                  <td className="px-6 py-4">Seed Round</td>
                  <td className="px-6 py-4">200,000</td>
                  <td className="px-6 py-4">20%</td>
                  <td className="px-6 py-4">$2.5M</td>
                  <td className="px-6 py-4">Mar 2022</td>
                </tr>
                <tr className="border-b">
                  <td className="px-6 py-4">Series A (Your Firm)</td>
                  <td className="px-6 py-4">{company.equity * 10000}</td>
                  <td className="px-6 py-4">{company.equity}%</td>
                  <td className="px-6 py-4">${(company.investmentAmount / 1000000).toFixed(1)}M</td>
                  <td className="px-6 py-4">Jun 2024</td>
                </tr>
                <tr className="border-b bg-gray-50">
                  <td className="px-6 py-4">ESOP Pool</td>
                  <td className="px-6 py-4">100,000</td>
                  <td className="px-6 py-4">10%</td>
                  <td className="px-6 py-4">-</td>
                  <td className="px-6 py-4">-</td>
                </tr>
                <tr className="font-medium">
                  <td className="px-6 py-4">Total</td>
                  <td className="px-6 py-4">1,000,000</td>
                  <td className="px-6 py-4">100%</td>
                  <td className="px-6 py-4">${((company.investmentAmount + 2500000) / 1000000).toFixed(1)}M</td>
                  <td className="px-6 py-4">-</td>
                </tr>
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Notes</CardTitle>
          <CardDescription>Private investment notes</CardDescription>
        </CardHeader>
        <CardContent>
          <Textarea
            placeholder="Add your notes about this company here..."
            className="min-h-[120px]"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />
        </CardContent>
        <CardFooter className="flex justify-end">
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => toast.success("Notes saved successfully")}
          >
            Save Notes
          </Button>
        </CardFooter>
      </Card>

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
