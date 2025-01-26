import { useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Eye, Package, Plus } from "lucide-react";
import { Tables } from "@/integrations/supabase/types";
import { EquipmentLibraryDialog } from "./EquipmentLibraryDialog";
import { useInventoryData } from "@/hooks/use-inventory-data";

type Equipment = Tables<"equipment">;

interface EquipmentTableProps {
  equipment: Equipment[];
  onViewEquipment: (equipment: Equipment) => void;
}

export function EquipmentTable({ equipment, onViewEquipment }: EquipmentTableProps) {
  const [showLibrary, setShowLibrary] = useState(false);
  const { equipmentLibrary } = useInventoryData();

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold">Your Equipment</h2>
        <Button 
          variant="outline" 
          size="sm" 
          className="flex items-center gap-2"
          onClick={() => setShowLibrary(true)}
        >
          <Plus className="h-4 w-4" />
          Equipment Library
        </Button>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[60px]"></TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="w-[100px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {equipment.map((item) => (
              <TableRow key={item.id}>
                <TableCell>
                  {item.photo_url ? (
                    <img
                      src={item.photo_url}
                      alt={item.model || "Equipment"}
                      className="h-10 w-10 rounded-full object-cover"
                    />
                  ) : (
                    <div className="h-10 w-10 rounded-full bg-secondary flex items-center justify-center">
                      <Package className="h-5 w-5 text-muted-foreground" />
                    </div>
                  )}
                </TableCell>
                <TableCell className="font-medium">{item.model}</TableCell>
                <TableCell>{item.type}</TableCell>
                <TableCell>{item.status}</TableCell>
                <TableCell>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onViewEquipment(item)}
                  >
                    <Eye className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <EquipmentLibraryDialog
        open={showLibrary}
        onOpenChange={setShowLibrary}
        equipmentLibrary={equipmentLibrary || []}
      />
    </div>
  );
}