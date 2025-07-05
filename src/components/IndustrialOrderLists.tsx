
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Package, Truck, Clock, Eye, Phone, MapPin } from "lucide-react";
import { useState } from "react";

const myOrders = [
  {
    id: "ORD-101",
    supplier: "Ocean Fresh Market",
    status: "confirmed",
    items: "Salmon (20kg), Tuna (15kg)",
    totalValue: "$410",
    orderDate: "2024-01-06",
    expectedDelivery: "2024-01-08",
    phone: "+1 (555) 123-4567"
  },
  {
    id: "ORD-102",
    supplier: "Pacific Fisheries",
    status: "pending",
    items: "Sea Bass (25kg)",
    totalValue: "$394",
    orderDate: "2024-01-06",
    expectedDelivery: "2024-01-09",
    phone: "+1 (555) 234-5678"
  },
  {
    id: "ORD-103",
    supplier: "Coastal Catch Co",
    status: "processing",
    items: "Prawns (10kg), Cod (18kg)",
    totalValue: "$506",
    orderDate: "2024-01-05",
    expectedDelivery: "2024-01-07",
    phone: "+1 (555) 345-6789"
  }
];

const assignedDeliveries = [
  {
    id: "DEL-201",
    supplier: "Marine Harvest",
    driver: "Alex T.",
    items: "Tiger Prawns (8kg)",
    value: "$176",
    scheduledTime: "10:30 AM",
    status: "on-route",
    phone: "+1 (555) 456-7890",
    address: "Industrial Complex A, Bay 15"
  },
  {
    id: "DEL-202",
    supplier: "Ocean Fresh Market",
    driver: "Maria L.",
    items: "Salmon (15kg), Mackerel (12kg)",
    value: "$268",
    scheduledTime: "2:00 PM",
    status: "scheduled",
    phone: "+1 (555) 567-8901",
    address: "Industrial Complex A, Bay 15"
  }
];

const getStatusColor = (status: string) => {
  switch (status) {
    case "confirmed": return "bg-green-100 text-green-800";
    case "processing": return "bg-yellow-100 text-yellow-800";
    case "pending": return "bg-orange-100 text-orange-800";
    case "on-route": return "bg-blue-100 text-blue-800";
    case "scheduled": return "bg-gray-100 text-gray-800";
    default: return "bg-gray-100 text-gray-800";
  }
};

export const IndustrialOrderLists = () => {
  const [expandedItem, setExpandedItem] = useState<string | null>(null);

  const toggleDetails = (itemId: string) => {
    setExpandedItem(expandedItem === itemId ? null : itemId);
  };

  const handleCancelOrder = (orderId: string) => {
    console.log(`Cancelling order: ${orderId}`);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* My Orders */}
      <Card className="hover:shadow-lg transition-shadow duration-300">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Package className="h-5 w-5 text-slate-600" />
            <span>My Orders</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 max-h-96 overflow-y-auto">
          {myOrders.map((order) => (
            <div key={order.id} className="border rounded-lg p-4 bg-gray-50 hover:bg-gray-100 transition-colors">
              <div className="flex items-center justify-between mb-2">
                <div className="flex-1">
                  <div className="font-medium text-lg">{order.id}</div>
                  <div className="text-sm text-muted-foreground">{order.supplier}</div>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge className={getStatusColor(order.status)}>
                    {order.status}
                  </Badge>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => toggleDetails(order.id)}
                  >
                    <Eye className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              
              <div className="flex justify-between text-sm text-muted-foreground mb-2">
                <span>{order.items}</span>
                <span className="font-medium text-green-600">{order.totalValue}</span>
              </div>
              
              {expandedItem === order.id && (
                <div className="mt-3 pt-3 border-t border-gray-200 space-y-2 text-sm">
                  <div className="flex items-center space-x-2">
                    <Phone className="h-4 w-4 text-gray-500" />
                    <span>{order.phone}</span>
                  </div>
                  <div><strong>Order Date:</strong> {order.orderDate}</div>
                  <div><strong>Expected Delivery:</strong> {order.expectedDelivery}</div>
                  
                  {order.status === "pending" && (
                    <div className="pt-2">
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => handleCancelOrder(order.id)}
                      >
                        Cancel Order
                      </Button>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Assigned Deliveries */}
      <Card className="hover:shadow-lg transition-shadow duration-300">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Truck className="h-5 w-5 text-green-600" />
            <span>Assigned Deliveries</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 max-h-96 overflow-y-auto">
          {assignedDeliveries.map((delivery) => (
            <div key={delivery.id} className="border rounded-lg p-4 bg-gray-50 hover:bg-gray-100 transition-colors">
              <div className="flex items-center justify-between mb-2">
                <div className="flex-1">
                  <div className="font-medium text-lg">{delivery.id}</div>
                  <div className="text-sm text-muted-foreground">{delivery.supplier}</div>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge className={getStatusColor(delivery.status)}>
                    {delivery.status}
                  </Badge>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => toggleDetails(delivery.id)}
                  >
                    <Eye className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              
              <div className="flex justify-between text-sm text-muted-foreground mb-2">
                <span>{delivery.items}</span>
                <span className="font-medium text-green-600">{delivery.value}</span>
              </div>
              
              <div className="flex justify-between text-sm text-muted-foreground mb-2">
                <span>Driver: {delivery.driver}</span>
                <span className="font-medium text-blue-600">{delivery.scheduledTime}</span>
              </div>

              {expandedItem === delivery.id && (
                <div className="mt-3 pt-3 border-t border-gray-200 space-y-2 text-sm">
                  <div className="flex items-center space-x-2">
                    <Phone className="h-4 w-4 text-gray-500" />
                    <span>{delivery.phone}</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <MapPin className="h-4 w-4 text-gray-500 mt-0.5" />
                    <span>{delivery.address}</span>
                  </div>
                  <div><strong>Driver:</strong> {delivery.driver}</div>
                  <div><strong>Status:</strong> {delivery.status}</div>
                </div>
              )}
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};
