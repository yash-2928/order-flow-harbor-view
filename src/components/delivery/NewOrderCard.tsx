import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ShoppingBag, Clock, MapPin } from "lucide-react";

export interface NewOrder {
  id: string;
  customer: string;
  fishType: string;
  weight: string;
  value: string;
  address: string;
  placedAt: string;
}

interface NewOrderCardProps {
  order: NewOrder;
}

const NewOrderCard = ({ order }: NewOrderCardProps) => {
  return (
    <Card className="border-l-4 border-l-violet-500 hover:shadow-lg transition-shadow">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base">{order.id}</CardTitle>
          <Badge className="bg-violet-100 text-violet-800 border-transparent">
            <ShoppingBag className="h-3 w-3 mr-1" />
            Order Placed
          </Badge>
        </div>
        <p className="text-sm text-muted-foreground">{order.customer}</p>
      </CardHeader>
      <CardContent className="space-y-2 text-sm">
        <div className="flex justify-between">
          <span className="text-muted-foreground">Fish:</span>
          <span className="font-medium">{order.fishType}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">Weight:</span>
          <span className="font-medium">{order.weight}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">Value:</span>
          <span className="font-medium text-green-600">{order.value}</span>
        </div>
        <div className="flex items-center gap-1.5 text-muted-foreground pt-1">
          <Clock className="h-3.5 w-3.5" />
          <span>{order.placedAt}</span>
        </div>
        <div className="flex items-start gap-1.5 text-muted-foreground">
          <MapPin className="h-3.5 w-3.5 mt-0.5" />
          <span>{order.address}</span>
        </div>
      </CardContent>
    </Card>
  );
};

export default NewOrderCard;
