import { useEffect, useState } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Package, Box, AlertCircle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Tables } from "@/integrations/supabase/types";
import { Alert, AlertDescription } from "@/components/ui/alert";

type Material = Tables<"materials">;
type EquipmentTemplate = Tables<"equipment_specifications_templates">;
type Equipment = Tables<"equipment"> & {
  equipment_specifications_template: EquipmentTemplate | null;
};

export default function Inventory() {
  const [equipment, setEquipment] = useState<Equipment[]>([]);
  const [materials, setMaterials] = useState<Material[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchInventory = async () => {
      try {
        const { data: equipmentData, error: equipmentError } = await supabase
          .from("equipment")
          .select(`
            *,
            equipment_specifications_template:specs_template_id(*)
          `);

        const { data: materialsData, error: materialsError } = await supabase
          .from("materials")
          .select("*");

        if (equipmentError) throw equipmentError;
        if (materialsError) throw materialsError;

        setEquipment(equipmentData as Equipment[] || []);
        setMaterials(materialsData || []);
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

  const renderSpecifications = (specs: Equipment["specs"], template?: EquipmentTemplate | null) => {
    if (!specs || !template?.fields) return null;

    const templateFields = (template.fields as any)?.fields || [];
    
    return (
      <div className="grid grid-cols-2 gap-2 mt-2">
        {templateFields.map((field: { name: string; unit_of_measure: string }) => (
          <div key={field.name} className="text-sm">
            <span className="font-medium">{field.name}: </span>
            <span className="text-gray-600">
              {(specs as any)[field.name] || 'N/A'} {field.unit_of_measure}
            </span>
          </div>
        ))}
      </div>
    );
  };

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
                <TabsTrigger value="materials">Materials</TabsTrigger>
              </TabsList>

              <TabsContent value="equipment">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {equipment.map((item) => (
                    <Card key={item.id}>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <Box className="h-5 w-5" />
                          {item.model || "Unknown Equipment"}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          <p className="text-sm text-gray-500">Type: {item.type}</p>
                          <p className="text-sm text-gray-500">Status: {item.status}</p>
                          <p className="text-sm text-gray-500">
                            Manufacturer: {item.manufacturer}
                          </p>
                          {renderSpecifications(
                            item.specs,
                            item.equipment_specifications_template
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="materials">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {materials.map((material) => (
                    <Card key={material.id}>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <Package className="h-5 w-5" />
                          {material.type || "Unknown Material"}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-gray-500">
                          Quantity: {material.quantity} {material.unit}
                        </p>
                        <p className="text-sm text-gray-500">
                          Color: {material.color}
                        </p>
                        <p className="text-sm text-gray-500">
                          Manufacturer: {material.manufacturer}
                        </p>
                        <p className="text-sm text-gray-500">
                          Price: ${material.price}
                        </p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}