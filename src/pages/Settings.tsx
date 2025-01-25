import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";

// In a real app, this would come from your auth system
let currentUserType = localStorage.getItem('userType') || 'customer';

const Settings = () => {
  const { toast } = useToast();

  const handleUserTypeChange = (value: string) => {
    localStorage.setItem('userType', value);
    toast({
      title: "User type updated",
      description: `You are now viewing the app as a ${value}`,
    });
    // Refresh the page to update the UI
    window.location.reload();
  };

  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-8">Settings</h1>
      
      <Card className="max-w-md">
        <CardHeader>
          <CardTitle>User Type</CardTitle>
          <CardDescription>Select your user type to customize your experience</CardDescription>
        </CardHeader>
        <CardContent>
          <Select defaultValue={currentUserType} onValueChange={handleUserTypeChange}>
            <SelectTrigger>
              <SelectValue placeholder="Select user type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="customer">Customer</SelectItem>
              <SelectItem value="designer">Designer</SelectItem>
              <SelectItem value="maker">Maker</SelectItem>
              {process.env.NODE_ENV === 'development' && (
                <SelectItem value="admin">Admin (Dev Only)</SelectItem>
              )}
            </SelectContent>
          </Select>
        </CardContent>
      </Card>
    </div>
  );
};

export default Settings;