
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, Package, Truck } from "lucide-react";

const allOrders = [
  { id: "ORD-001", customer: "Ocean Fresh Market", status: "completed", weight: "45 kg", value: "$340" },
  { id: "ORD-002", customer: "Seaside Restaurant", status: "pending", weight: "28 kg", value: "$210" },
  { id: "ORD-003", customer: "Fish & Co", status: "processing", weight: "62 kg", value: "$465" },
  { id: "ORD-004", customer: "Harbor Deli", status: "delivered", weight: "33 kg", value: "$248" },
  { id: "ORD-005", customer: "Coastal Bistro", status: "cancelled", weight: "19 kg", value: "$142" }
];

const orderQueue = [
  { id: "ORD-006", customer: "Marina Grill", time: "2 hours ago", weight: "38 kg", priority: "high" },
  { id: "ORD-007", customer: "Pier Market", time: "4 hours ago", weight: "52 kg", priority: "medium" },
  { id: "ORD-008", customer: "Anchor Point", time: "6 hours ago", weight: "41 kg", priority: "low" }
];

const deliverySchedule = [
  { id: "DEL-001", customer: "Bay View Restaurant", time: "10:00 AM", weight: "35 kg", driver: "John M." },
  { id: "DEL-002", customer: "Sunset Café", time: "11:30 AM", weight: "47 kg", driver: "Sarah L." },
  { id: "DEL-003", customer: "Ocean Breeze", time: "2:00 PM", weight: "29 kg", driver: "Mike R." }
];

const getStatusColor = (status: string) => {
  switch (status) {
    case "completed": return "bg-green-100 text-green-800";
    case "delivered": return "bg-blue-100 text-blue-800";
    case "processing": return "bg-yellow-100 text-yellow-800";
    case "pending": return "bg-orange-100 text-orange-800";
    case "cancelled": return "bg-red-100 text-red-800";
    default: return "bg-gray-100 text-gray-800";
  }
};

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case "high": return "bg-red-100 text-red-800";
    case "medium": return "bg-yellow-100 text-yellow-800";
    case "low": return "bg-green-100 text-green-800";
    default: return "bg-gray-100 text-gray-800";
  }
};

export const OrderLists = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* All Orders */}
      <Card className="hover:shadow-lg transition-shadow duration-300">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Package className="h-5 w-5 text-blue-600" />
            <span>All Orders</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {allOrders.map((order) => (
            <div key={order.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
              <div className="flex-1">
                <div className="font-medium">{order.id}</div>
                <div className="text-sm text-muted-foreground">{order.customer}</div>
                <div className="text-xs text-muted-foreground">{order.weight} • {order.value}</div>
              </div>
              <Badge className={getStatusColor(order.status)}>
                {order.status}
              </Badge>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Order Queue */}
      <Card className="hover:shadow-lg transition-shadow duration-300">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Clock className="h-5 w-5 text-orange-600" />
            <span>Order Queue</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {orderQueue.map((order) => (
            <div key={order.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
              <div className="flex-1">
                <div className="font-medium">{order.id}</div>
                <div className="text-sm text-muted-foreground">{order.customer}</div>
                <div className="text-xs text-muted-foreground">{order.weight} • {order.time}</div>
              </div>
              <Badge className={getPriorityColor(order.priority)}>
                {order.priority}
              </Badge>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Delivery Schedule */}
      <Card className="hover:shadow-lg transition-shadow duration-300">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Truck className="h-5 w-5 text-green-600" />
            <span>Delivery Schedule</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {deliverySchedule.map((delivery) => (
            <div key={delivery.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
              <div className="flex-1">
                <div className="font-medium">{delivery.id}</div>
                <div className="text-sm text-muted-foreground">{delivery.customer}</div>
                <div className="text-xs text-muted-foreground">{delivery.weight} • Driver: {delivery.driver}</div>
              </div>
              <div className="text-right">
                <div className="text-sm font-medium text-blue-600">{delivery.time}</div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};
