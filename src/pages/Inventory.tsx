import { useEffect, useState } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Package, Eye, AlertCircle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Tables } from "@/integrations/supabase/types";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";

type Material = Tables<"materials">;
type Equipment = Tables<"equipment">;
type Unit = Tables<"units">;

export default function Inventory() {
  const [equipment, setEquipment] = useState<Equipment[]>([]);
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

        const { data: materialsData, error: materialsError } = await supabase
          .from("materials")
          .select("*");

        const { data: unitsData, error: unitsError } = await supabase
          .from("units")
          .select("*");

        if (equipmentError) throw equipmentError;
        if (materialsError) throw materialsError;
        if (unitsError) throw unitsError;

        // Create a map of unit_id to unit for easy lookup
        const unitsMap = (unitsData || []).reduce((acc, unit) => {
          acc[unit.id] = unit;
          return acc;
        }, {} as Record<number, Unit>);

        setEquipment(equipmentData || []);
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
                <TabsTrigger value="materials">Materials</TabsTrigger>
              </TabsList>

              <TabsContent value="equipment">
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
                              onClick={() => setSelectedEquipment(item)}
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </TabsContent>

              <TabsContent value="materials">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {materials.map((material) => (
                    <Card key={material.id}>
                      <CardContent className="pt-6">
                        <div className="flex items-center gap-2">
                          {material.image_url ? (
                            <img
                              src={material.image_url}
                              alt={material.type || "Material"}
                              className="h-10 w-10 rounded-full object-cover"
                            />
                          ) : (
                            <Package className="h-5 w-5" />
                          )}
                          <h3 className="font-semibold">{material.type}</h3>
                        </div>
                        <div className="mt-2 space-y-1">
                          <p className="text-sm text-gray-500">
                            Quantity: {material.quantity} {units[material.unit_id]?.unit_symbol || ''}
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
                        </div>
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