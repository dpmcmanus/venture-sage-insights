
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FileText, DollarSign } from "lucide-react";
import { Deal } from "@/services/mock-data";

interface DealCardProps {
  deal: Deal;
  onClick?: (id: string) => void;
  isDraggable?: boolean;
}

export function DealCard({ deal, onClick, isDraggable = false }: DealCardProps) {
  const handleClick = () => {
    if (onClick) {
      onClick(deal.id);
    }
  };

  const getInterestColor = (level: Deal['interestLevel']) => {
    switch (level) {
      case 'High':
        return 'bg-green-100 text-green-800 hover:bg-green-200';
      case 'Medium':
        return 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200';
      case 'Low':
        return 'bg-red-100 text-red-800 hover:bg-red-200';
      default:
        return '';
    }
  };

  return (
    <Card
      className="cursor-pointer transition-all hover:shadow-md"
      onClick={handleClick}
      draggable={isDraggable}
    >
      <CardContent className="p-4">
        <div className="mb-2 flex items-center justify-between">
          <h3 className="font-medium text-vc-blue-dark">{deal.companyName}</h3>
          <div className="flex gap-2">
            <Badge 
              className={getInterestColor(deal.interestLevel)}
            >
              {deal.interestLevel}
            </Badge>
            <Badge 
              variant={
                deal.status === "Rejected" ? "destructive" : 
                deal.status === "Closed" ? "outline" : 
                "secondary"
              }
              className="text-xs"
            >
              {deal.stage}
            </Badge>
          </div>
        </div>
        <p className="mb-3 text-sm text-muted-foreground line-clamp-2">{deal.description}</p>
        <div className="flex flex-wrap gap-1 mb-2">
          {deal.tags.map((tag) => (
            <Badge key={tag} variant="outline" className="text-xs bg-vc-gray-light">
              {tag}
            </Badge>
          ))}
        </div>
        <div className="flex items-center justify-between border-t pt-2 text-xs text-muted-foreground">
          <span>
            Ask: ${(deal.askAmount / 1000000).toFixed(1)}M
          </span>
          <span>
            Contact: {new Date(deal.lastContact).toLocaleDateString()}
          </span>
        </div>
        <div className="flex gap-2 mt-3 border-t pt-3">
          <Button variant="outline" size="sm" className="flex-1">
            <FileText className="h-4 w-4 mr-2" />
            Pitch Deck
          </Button>
          <Button variant="outline" size="sm" className="flex-1">
            <DollarSign className="h-4 w-4 mr-2" />
            Financials
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
