import { Card, CardContent } from "@/components/ui/card";
import { Package } from "lucide-react";
import { Tables } from "@/integrations/supabase/types";

type Material = Tables<"materials">;
type Unit = Tables<"units">;

interface MaterialsGridProps {
  materials: Material[];
  units: Record<number, Unit>;
}

export function MaterialsGrid({ materials, units }: MaterialsGridProps) {
  return (
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
  );
}