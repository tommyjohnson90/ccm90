import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Tables } from "@/integrations/supabase/types";
import { EquipmentTable } from "@/components/inventory/EquipmentTable";
import { MaterialsGrid } from "@/components/inventory/MaterialsGrid";
import { EquipmentLibraryTable } from "@/components/inventory/EquipmentLibraryTable";
import { InventoryLayout } from "@/components/inventory/InventoryLayout";
import { ErrorMessage } from "@/components/ui/error-message";
import { useInventoryData } from "@/hooks/use-inventory-data";

type Equipment = Tables<"equipment">;

export default function Inventory() {
  const { equipment, equipmentLibrary, materials, units, isLoading, error } = useInventoryData();
  const [selectedEquipment, setSelectedEquipment] = useState<Equipment | null>(null);

  if (error) {
    return (
      <InventoryLayout>
        <ErrorMessage message={error} />
      </InventoryLayout>
    );
  }

  return (
    <InventoryLayout>
      <h1 className="text-3xl font-bold mb-6">Inventory Management</h1>
      
      <Tabs defaultValue="equipment" className="w-full">
        <TabsList>
          <TabsTrigger value="equipment">Equipment</TabsTrigger>
          <TabsTrigger value="equipment-library">Equipment Library</TabsTrigger>
          <TabsTrigger value="materials">Materials</TabsTrigger>
        </TabsList>

        <TabsContent value="equipment">
          <EquipmentTable 
            equipment={equipment}
            onViewEquipment={setSelectedEquipment}
          />
        </TabsContent>

        <TabsContent value="equipment-library">
          <EquipmentLibraryTable 
            equipmentLibrary={equipmentLibrary}
          />
        </TabsContent>

        <TabsContent value="materials">
          <MaterialsGrid 
            materials={materials}
            units={units}
          />
        </TabsContent>
      </Tabs>
    </InventoryLayout>
  );
}