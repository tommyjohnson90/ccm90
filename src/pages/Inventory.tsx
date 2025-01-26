import { useEffect, useState } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AlertCircle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Tables } from "@/integrations/supabase/types";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { EquipmentTable } from "@/components/inventory/EquipmentTable";
import { MaterialsGrid } from "@/components/inventory/MaterialsGrid";
import { EquipmentLibraryTable } from "@/components/inventory/EquipmentLibraryTable";

type Material = Tables<"materials">;
type Equipment = Tables<"equipment">;
type EquipmentLibrary = Tables<"equipment_library">;
type Unit = Tables<"units">;

export default function Inventory() {
  const [equipment, setEquipment] = useState<Equipment[]>([]);
  const [equipmentLibrary, setEquipmentLibrary] = useState<EquipmentLibrary[]>([]);
  const [materials, setMaterials] = useState<Material[]>([]);
  const [units, setUnits] = useState<Record<number, Unit>>({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedEquipment, setSelectedEquipment] = useState<Equipment | null>(null);

  useEffect(() => {
    const fetchInventory = async () => {
      try {
        const { data: equipmentData, error: equipmentError } = await supabase
          .from("equipment")
          .select("*");

        const { data: equipmentLibraryData, error: equipmentLibraryError } = await supabase
          .from("equipment_library")
          .select("*");

        const { data: materialsData, error: materialsError } = await supabase
          .from("materials")
          .select("*");

        const { data: unitsData, error: unitsError } = await supabase
          .from("units")
          .select("*");

        if (equipmentError) throw equipmentError;
        if (equipmentLibraryError) throw equipmentLibraryError;
        if (materialsError) throw materialsError;
        if (unitsError) throw unitsError;

        const unitsMap = (unitsData || []).reduce((acc, unit) => {
          acc[unit.id] = unit;
          return acc;
        }, {} as Record<number, Unit>);

        setEquipment(equipmentData || []);
        setEquipmentLibrary(equipmentLibraryData || []);
        setMaterials(materialsData || []);
        setUnits(unitsMap);
        setError(null);
      } catch (error) {
        console.error("Error fetching inventory:", error);
        setError("Failed to load inventory data");
      } finally {
        setIsLoading(false);
      }
    };

    fetchInventory();
  }, []);

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    );
  }

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        <main className="flex-1 p-6 bg-secondary/20">
          <div className="container mx-auto">
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
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}