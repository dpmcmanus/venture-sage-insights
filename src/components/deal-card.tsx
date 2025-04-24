
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
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

  return (
    <Card
      className="cursor-pointer transition-all hover:shadow-md"
      onClick={handleClick}
      draggable={isDraggable}
    >
      <CardContent className="p-4">
        <div className="mb-2 flex items-center justify-between">
          <h3 className="font-medium text-vc-blue-dark">{deal.companyName}</h3>
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
      </CardContent>
    </Card>
  );
}
