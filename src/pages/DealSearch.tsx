
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { DealCard } from "@/components/deal-card";
import { dealPipeline } from "@/services/mock-data";
import { Search, Filter } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const DealSearch = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDealId, setSelectedDealId] = useState<string | null>(null);
  
  // Filter deals based on search query
  const filteredDeals = dealPipeline.filter(deal => {
    const query = searchQuery.toLowerCase().trim();
    if (!query) return true;
    
    return (
      deal.companyName.toLowerCase().includes(query) ||
      deal.industry.toLowerCase().includes(query) ||
      deal.description.toLowerCase().includes(query) ||
      deal.tags.some(tag => tag.toLowerCase().includes(query))
    );
  });
  
  // Different deal views
  const activeDeals = filteredDeals.filter(deal => 
    deal.status === "Prospect" || 
    deal.status === "In Progress" || 
    deal.status === "Term Sheet"
  );
  
  const closedDeals = filteredDeals.filter(deal => 
    deal.status === "Closed"
  );
  
  const rejectedDeals = filteredDeals.filter(deal => 
    deal.status === "Rejected"
  );

  const selectedDeal = filteredDeals.find(deal => deal.id === selectedDealId);

  return (
    <div className="space-y-6">
      <Card className="bg-vc-gray-light">
        <CardContent className="p-6">
          <div className="flex flex-col gap-4 sm:flex-row">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <Input
                placeholder="Search deals by company, industry, description or tags..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button variant="outline" className="gap-2">
              <Filter className="h-4 w-4" />
              Filter
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <Tabs defaultValue="active">
            <div className="flex items-center justify-between">
              <TabsList>
                <TabsTrigger value="active">
                  Active Deals
                  <Badge className="ml-2 bg-vc-blue text-white" variant="secondary">
                    {activeDeals.length}
                  </Badge>
                </TabsTrigger>
                <TabsTrigger value="closed">
                  Closed
                  <Badge className="ml-2" variant="outline">
                    {closedDeals.length}
                  </Badge>
                </TabsTrigger>
                <TabsTrigger value="rejected">
                  Rejected
                  <Badge className="ml-2" variant="outline">
                    {rejectedDeals.length}
                  </Badge>
                </TabsTrigger>
              </TabsList>
              <span className="text-sm text-muted-foreground">
                {filteredDeals.length} deals found
              </span>
            </div>

            <TabsContent value="active" className="mt-4">
              <div className="grid gap-4">
                {activeDeals.length > 0 ? (
                  activeDeals.map((deal) => (
                    <DealCard 
                      key={deal.id}
                      deal={deal}
                      onClick={() => setSelectedDealId(deal.id)}
                    />
                  ))
                ) : (
                  <Card>
                    <CardContent className="p-6 text-center">
                      <p className="text-muted-foreground">No active deals match your search.</p>
                    </CardContent>
                  </Card>
                )}
              </div>
            </TabsContent>
            
            <TabsContent value="closed" className="mt-4">
              <div className="grid gap-4">
                {closedDeals.length > 0 ? (
                  closedDeals.map((deal) => (
                    <DealCard 
                      key={deal.id}
                      deal={deal}
                      onClick={() => setSelectedDealId(deal.id)}
                    />
                  ))
                ) : (
                  <Card>
                    <CardContent className="p-6 text-center">
                      <p className="text-muted-foreground">No closed deals match your search.</p>
                    </CardContent>
                  </Card>
                )}
              </div>
            </TabsContent>
            
            <TabsContent value="rejected" className="mt-4">
              <div className="grid gap-4">
                {rejectedDeals.length > 0 ? (
                  rejectedDeals.map((deal) => (
                    <DealCard 
                      key={deal.id}
                      deal={deal}
                      onClick={() => setSelectedDealId(deal.id)}
                    />
                  ))
                ) : (
                  <Card>
                    <CardContent className="p-6 text-center">
                      <p className="text-muted-foreground">No rejected deals match your search.</p>
                    </CardContent>
                  </Card>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </div>
        
        <div>
          <h2 className="mb-4 font-semibold">Deal Details</h2>
          <Card className="sticky top-20">
            {selectedDeal ? (
              <CardContent className="p-6">
                <h3 className="mb-1 text-lg font-medium">{selectedDeal.companyName}</h3>
                <p className="mb-4 text-sm text-muted-foreground">
                  {selectedDeal.industry} • {selectedDeal.stage}
                </p>
                
                <div className="mb-4">
                  <h4 className="mb-1 font-medium">Description</h4>
                  <p className="text-sm">{selectedDeal.description}</p>
                </div>
                
                <div className="mb-4">
                  <h4 className="mb-1 font-medium">Ask Amount</h4>
                  <p className="text-sm">${(selectedDeal.askAmount / 1000000).toFixed(1)}M</p>
                </div>
                
                <div className="mb-4">
                  <h4 className="mb-1 font-medium">Status</h4>
                  <Badge 
                    variant={
                      selectedDeal.status === "Rejected" ? "destructive" : 
                      selectedDeal.status === "Closed" ? "outline" : 
                      "secondary"
                    }
                  >
                    {selectedDeal.status}
                  </Badge>
                </div>
                
                <div className="mb-4">
                  <h4 className="mb-1 font-medium">Contact Person</h4>
                  <p className="text-sm">{selectedDeal.contactPerson}</p>
                </div>
                
                <div className="mb-4">
                  <h4 className="mb-1 font-medium">Last Contact</h4>
                  <p className="text-sm">{new Date(selectedDeal.lastContact).toLocaleDateString()}</p>
                </div>
                
                <div>
                  <h4 className="mb-1 font-medium">Tags</h4>
                  <div className="flex flex-wrap gap-1">
                    {selectedDeal.tags.map((tag) => (
                      <Badge key={tag} variant="outline" className="text-xs bg-vc-gray-light">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            ) : (
              <CardContent className="p-6 text-center">
                <p className="text-muted-foreground">Select a deal to view details</p>
              </CardContent>
            )}
          </Card>
          
          <Card className="mt-4">
            <CardHeader>
              <CardTitle>AI Deal Summary</CardTitle>
              <CardDescription>Ask questions about deals</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-4">
                <Input placeholder="Ask about deals, e.g., 'Why was NeuralSecurity rejected?'" />
              </div>
              <div className="rounded-md bg-gray-50 p-4 text-sm">
                <p className="italic text-muted-foreground">Ask a question to see AI-generated insights about deals.</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default DealSearch;
