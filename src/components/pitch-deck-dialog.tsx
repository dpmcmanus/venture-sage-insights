
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { FileText, Link } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface PitchDeckDialogProps {
  isOpen: boolean;
  onClose: () => void;
  companyName: string;
}

export function PitchDeckDialog({ isOpen, onClose, companyName }: PitchDeckDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            {companyName} Pitch Deck Summary
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          <div>
            <h4 className="mb-2 font-medium">Problem Statement</h4>
            <p className="text-sm text-muted-foreground">
              {companyName} addresses the critical challenge of cybersecurity in enterprise networks, 
              focusing on real-time threat detection and automated response mechanisms.
            </p>
          </div>
          
          <div>
            <h4 className="mb-2 font-medium">Solution & Technology</h4>
            <div className="mb-2 text-sm text-muted-foreground">
              Their proprietary platform leverages cutting-edge technology to deliver:
            </div>
            <div className="flex flex-wrap gap-2">
              <Badge variant="outline">AI/ML Security</Badge>
              <Badge variant="outline">Real-time Detection</Badge>
              <Badge variant="outline">Enterprise-Grade</Badge>
              <Badge variant="outline">Zero Trust</Badge>
            </div>
          </div>
          
          <div>
            <h4 className="mb-2 font-medium">Market Opportunity</h4>
            <p className="text-sm text-muted-foreground">
              The cybersecurity market is projected to reach $500B by 2025, with enterprise security 
              solutions commanding a 40% share. {companyName}'s innovative approach positions them to 
              capture 5% of this rapidly growing market.
            </p>
          </div>
          
          <div>
            <Button variant="outline" className="w-full" asChild>
              <a href="#" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2">
                <Link className="h-4 w-4" />
                View Full Pitch Deck
              </a>
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
