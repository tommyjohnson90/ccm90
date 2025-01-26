import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Eye, Package, Plus } from "lucide-react";
import { Tables } from "@/integrations/supabase/types";

type EquipmentLibrary = Tables<"equipment_library">;

interface EquipmentLibraryTableProps {
  equipmentLibrary: EquipmentLibrary[];
}

export function EquipmentLibraryTable({ equipmentLibrary }: EquipmentLibraryTableProps) {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold">Equipment Library</h2>
        <Button variant="outline" size="sm" className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Add Equipment to Library
        </Button>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead></TableHead>
              <TableHead>Manufacturer</TableHead>
              <TableHead>Model</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Features</TableHead>
              <TableHead className="w-[100px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {equipmentLibrary.map((item) => (
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
                <TableCell>
                  <Button
                    variant="ghost"
                    size="icon"
                  >
                    <Eye className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}