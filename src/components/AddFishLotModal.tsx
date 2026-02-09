
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Fish, Plus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface AddFishLotModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const fishTypes = [
  "Salmon", "Tuna", "Sea Bass", "Cod", "Mackerel", "Prawns",
  "Halibut", "Crab", "Lobster", "Shrimp", "Scallops", "Red Snapper",
  "Grouper", "Flounder", "Mussels", "Oysters", "Clams", "Calamari"
];

export const AddFishLotModal = ({ open, onOpenChange }: AddFishLotModalProps) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    fishType: "",
    weight: "",
    pricePerKg: "",
    quality: "",
    catchDate: "",
    location: "",
    notes: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.fishType || !formData.weight || !formData.pricePerKg || !formData.quality) {
      toast({
        title: "Missing fields",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    // TODO: Replace with actual API call
    console.log("Adding new fish lot:", formData);

    toast({
      title: "Lot Added",
      description: `${formData.weight} kg of ${formData.fishType} added successfully.`,
    });

    setFormData({
      fishType: "",
      weight: "",
      pricePerKg: "",
      quality: "",
      catchDate: "",
      location: "",
      notes: "",
    });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Fish className="h-5 w-5 text-blue-600" />
            Add New Fish Lot
          </DialogTitle>
          <DialogDescription>
            Enter the details for the new fish lot below.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="fishType">Fish Type *</Label>
              <Select
                value={formData.fishType}
                onValueChange={(value) => setFormData({ ...formData, fishType: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select fish type" />
                </SelectTrigger>
                <SelectContent>
                  {fishTypes.map((fish) => (
                    <SelectItem key={fish} value={fish}>{fish}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="quality">Quality Grade *</Label>
              <Select
                value={formData.quality}
                onValueChange={(value) => setFormData({ ...formData, quality: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select grade" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="A+">A+ (Premium)</SelectItem>
                  <SelectItem value="A">A (Standard)</SelectItem>
                  <SelectItem value="B">B (Economy)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="weight">Weight (kg) *</Label>
              <Input
                id="weight"
                type="number"
                min="0.1"
                step="0.1"
                placeholder="e.g. 50"
                value={formData.weight}
                onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="pricePerKg">Price per kg ($) *</Label>
              <Input
                id="pricePerKg"
                type="number"
                min="0.01"
                step="0.01"
                placeholder="e.g. 12.50"
                value={formData.pricePerKg}
                onChange={(e) => setFormData({ ...formData, pricePerKg: e.target.value })}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="catchDate">Catch Date</Label>
              <Input
                id="catchDate"
                type="date"
                value={formData.catchDate}
                onChange={(e) => setFormData({ ...formData, catchDate: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="location">Catch Location</Label>
              <Input
                id="location"
                placeholder="e.g. North Atlantic"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">Additional Notes</Label>
            <Textarea
              id="notes"
              placeholder="Any special notes about this lot..."
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              rows={3}
            />
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
              <Plus className="h-4 w-4 mr-2" />
              Add Lot
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
