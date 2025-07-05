
import { Fish, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

export const DashboardHeader = () => {
  const handleAddNewLot = () => {
    console.log("Redirecting to add new lot...");
    // This would typically navigate to a new route
  };

  return (
    <header className="bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Fish className="h-8 w-8" />
            <div>
              <h1 className="text-2xl font-bold">Fisherman Dashboard</h1>
              <p className="text-blue-100">Manage your fishing operations</p>
            </div>
          </div>
          
          <Button 
            onClick={handleAddNewLot}
            className="bg-white text-blue-600 hover:bg-blue-50 font-semibold"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add New Lot
          </Button>
        </div>
      </div>
    </header>
  );
};
