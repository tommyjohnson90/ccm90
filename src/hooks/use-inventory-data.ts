import { useQuery } from "@tanstack/react-query";
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

const fetchInventoryData = async () => {
  console.log("Fetching inventory data...");
  
  const [
    { data: equipmentData, error: equipmentError },
    { data: equipmentLibraryData, error: equipmentLibraryError },
    { data: materialsData, error: materialsError },
    { data: unitsData, error: unitsError }
  ] = await Promise.all([
    supabase.from("equipment").select("*"),
    supabase.from("equipment_library").select("*"),
    supabase.from("materials").select("*"),
    supabase.from("units").select("*")
  ]);

  console.log("Equipment Library Data:", equipmentLibraryData);
  console.log("Equipment Data:", equipmentData);

  if (equipmentError) throw equipmentError;
  if (equipmentLibraryError) throw equipmentLibraryError;
  if (materialsError) throw materialsError;
  if (unitsError) throw unitsError;

  const unitsMap = (unitsData || []).reduce((acc, unit) => {
    acc[unit.id] = unit;
    return acc;
  }, {} as Record<number, Unit>);

  return {
    equipment: equipmentData || [],
    equipmentLibrary: equipmentLibraryData || [],
    materials: materialsData || [],
    units: unitsMap
  };
};

export function useInventoryData(): UseInventoryDataReturn {
  const { data, isLoading, error } = useQuery({
    queryKey: ["inventory"],
    queryFn: fetchInventoryData,
  });

  return {
    equipment: data?.equipment || [],
    equipmentLibrary: data?.equipmentLibrary || [],
    materials: data?.materials || [],
    units: data?.units || {},
    isLoading,
    error: error ? (error as Error).message : null
  };
}