import { useEffect, useState } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Package, Box, Database } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Tables } from "@/integrations/supabase/types";

type Equipment = Tables<"equipment">;
type Material = Tables<"materials">;
type EquipmentTemplate = Tables<"equipment_specifications_templates">;

export default function Inventory() {
  const [equipment, setEquipment] = useState<Equipment[]>([]);
  const [materials, setMaterials] = useState<Material[]>([]);
  const [templates, setTemplates] = useState<EquipmentTemplate[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchInventory = async () => {
      try {
        // Fetch equipment with their templates
        const { data: equipmentData, error: equipmentError } = await supabase
          .from("equipment")
          .select(`
            *,
            equipment_specifications_templates (
              machine_type,
              sub_type,
              fields
            )
          `);

        const { data: materialsData, error: materialsError } = await supabase
          .from("materials")
          .select("*");

        const { data: templatesData, error: templatesError } = await supabase
          .from("equipment_specifications_templates")
          .select("*");

        if (equipmentError) throw equipmentError;
        if (materialsError) throw materialsError;
        if (templatesError) throw templatesError;

        setEquipment(equipmentData || []);
        setMaterials(materialsData || []);
        setTemplates(templatesData || []);
      } catch (error) {
        console.error("Error fetching inventory:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchInventory();
  }, []);

  const renderSpecifications = (specs: any, template?: EquipmentTemplate) => {
    if (!specs || !template?.fields) return null;

    const templateFields = template.fields.fields || [];
    return (
      <div className="grid grid-cols-2 gap-2 mt-2">
        {templateFields.map((field: any) => (
          <div key={field.name} className="text-sm">
            <span className="font-medium">{field.name}: </span>
            <span className="text-gray-600">
              {specs[field.name] || 'N/A'} {field.unit_of_measure}
            </span>
          </div>
        ))}
      </div>
    );
  };

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
                            templates.find(t => t.id === item.specs_template_id)
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