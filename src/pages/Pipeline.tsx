
import { useState } from "react";
import { DealCard } from "@/components/deal-card";
import { getDealsGroupedByStatus, Deal } from "@/services/mock-data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

const Pipeline = () => {
  const groupedDeals = getDealsGroupedByStatus();
  
  // Pipeline stages in order
  const stages = ["Prospect", "In Progress", "Term Sheet", "Closed"];
  
  // Function for handling drag and drop
  const [draggingDeal, setDraggingDeal] = useState<Deal | null>(null);
  
  const handleDragStart = (deal: Deal) => {
    setDraggingDeal(deal);
  };
  
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };
  
  const handleDrop = (targetStatus: string) => {
    if (draggingDeal && draggingDeal.status !== targetStatus) {
      // In a real app, this is where we would update the database
      console.log(`Moving ${draggingDeal.companyName} from ${draggingDeal.status} to ${targetStatus}`);
      // For now, we'll just clear the dragging state
      setDraggingDeal(null);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">Diligence Pipeline</h1>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          Add Deal
        </Button>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {stages.map((stage) => {
          const dealsInStage = groupedDeals[stage] || [];
          
          return (
            <div 
              key={stage}
              className="flex flex-col"
              onDragOver={handleDragOver}
              onDrop={() => handleDrop(stage)}
            >
              <Card className="flex-1">
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-sm font-medium">
                      {stage}
                      <span className="ml-2 rounded-full bg-gray-100 px-2 py-0.5 text-xs">
                        {dealsInStage.length}
                      </span>
                    </CardTitle>
                    {stage !== "Closed" && (
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <Plus className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </CardHeader>
                <CardContent className="space-y-3 overflow-auto p-3">
                  {dealsInStage.map((deal) => (
                    <div 
                      key={deal.id}
                      draggable
                      onDragStart={() => handleDragStart(deal)}
                    >
                      <DealCard deal={deal} isDraggable />
                    </div>
                  ))}
                  {dealsInStage.length === 0 && (
                    <div className="flex h-20 items-center justify-center rounded-md border border-dashed">
                      <p className="text-sm text-muted-foreground">
                        No deals in this stage
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          );
        })}
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Next Steps</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-md bg-gray-50 p-4">
            <h3 className="mb-2 font-medium">AI-Suggested Due Diligence Tasks:</h3>
            <ul className="space-y-2 pl-5 text-sm">
              <li className="list-disc">Schedule technical team interview with RoboLogistics CTO</li>
              <li className="list-disc">Request updated financial projections from FinanceAI</li>
              <li className="list-disc">Review GreenEnergy patent portfolio</li>
              <li className="list-disc">Complete market analysis for DataMesh competitors</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Pipeline;
