
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

interface CompanyNotesProps {
  notes: string;
  setNotes: (notes: string) => void;
}

export const CompanyNotes = ({ notes, setNotes }: CompanyNotesProps) => {
  return (
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
  );
};
