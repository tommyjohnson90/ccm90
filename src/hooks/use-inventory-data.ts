import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Tables } from "@/integrations/supabase/types";

type Material = Tables<"materials">;
type Equipment = Tables<"equipment">;
type EquipmentLibrary = Tables<"equipment_library">;
type Unit = Tables<"units">;

interface UseInventoryDataReturn {
  equipment: Equipment[];
  equipmentLibrary: EquipmentLibrary[];
  materials: Material[];
  units: Record<number, Unit>;
  isLoading: boolean;
  error: string | null;
}

export function useInventoryData(): UseInventoryDataReturn {
  const [equipment, setEquipment] = useState<Equipment[]>([]);
  const [equipmentLibrary, setEquipmentLibrary] = useState<EquipmentLibrary[]>([]);
  const [materials, setMaterials] = useState<Material[]>([]);
  const [units, setUnits] = useState<Record<number, Unit>>({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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

  return {
    equipment,
    equipmentLibrary,
    materials,
    units,
    isLoading,
    error,
  };
}