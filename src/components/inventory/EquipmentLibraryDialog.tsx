import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Package } from "lucide-react";
import { Tables } from "@/integrations/supabase/types";

type EquipmentLibrary = Tables<"equipment_library">;

interface EquipmentLibraryDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  equipmentLibrary: EquipmentLibrary[];
}

export function EquipmentLibraryDialog({ 
  open, 
  onOpenChange, 
  equipmentLibrary 
}: EquipmentLibraryDialogProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredEquipment = equipmentLibrary.filter((item) => {
    const searchLower = searchQuery.toLowerCase();
    return (
      item.type?.toLowerCase().includes(searchLower) ||
      item.manufacturer?.toLowerCase().includes(searchLower) ||
      item.model?.toLowerCase().includes(searchLower)
    );
  });

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Equipment Library</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <Input
            placeholder="Search by type, manufacturer, or model..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="max-w-sm"
          />
          
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead></TableHead>
                  <TableHead>Manufacturer</TableHead>
                  <TableHead>Model</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Features</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredEquipment.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>
                      <div className="h-10 w-10 rounded-full bg-secondary flex items-center justify-center">
                        <Package className="h-5 w-5 text-muted-foreground" />
                      </div>
                    </TableCell>
                    <TableCell className="font-medium">{item.manufacturer}</TableCell>
                    <TableCell>{item.model}</TableCell>
                    <TableCell>{item.type}</TableCell>
                    <TableCell>
                      {item.features ? JSON.stringify(item.features).slice(0, 50) + '...' : 'N/A'}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}