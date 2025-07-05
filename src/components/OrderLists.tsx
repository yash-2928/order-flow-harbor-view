
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, Package, Truck, Check, X, Eye, Phone, MapPin } from "lucide-react";
import { useState } from "react";

const allOrders = [
  { 
    id: "ORD-001", 
    customer: "Ocean Fresh Market", 
    status: "completed", 
    weight: "45 kg", 
    value: "$340",
    phone: "+1 (555) 123-4567",
    address: "123 Harbor St, Coastal City",
    fishType: "Salmon, Tuna",
    orderDate: "2024-01-05",
    deliveryDate: "2024-01-06"
  },
  { 
    id: "ORD-002", 
    customer: "Seaside Restaurant", 
    status: "pending", 
    weight: "28 kg", 
    value: "$210",
    phone: "+1 (555) 234-5678",
    address: "456 Ocean Ave, Marina Bay",
    fishType: "Sea Bass, Shrimp",
    orderDate: "2024-01-06",
    deliveryDate: "2024-01-07"
  },
  { 
    id: "ORD-003", 
    customer: "Fish & Co", 
    status: "processing", 
    weight: "62 kg", 
    value: "$465",
    phone: "+1 (555) 345-6789",
    address: "789 Pier Rd, Fisherman's Wharf",
    fishType: "Cod, Mackerel, Prawns",
    orderDate: "2024-01-04",
    deliveryDate: "2024-01-06"
  },
  { 
    id: "ORD-004", 
    customer: "Harbor Deli", 
    status: "delivered", 
    weight: "33 kg", 
    value: "$248",
    phone: "+1 (555) 456-7890",
    address: "321 Dock St, Harbor View",
    fishType: "Halibut, Crab",
    orderDate: "2024-01-03",
    deliveryDate: "2024-01-05"
  },
  { 
    id: "ORD-005", 
    customer: "Coastal Bistro", 
    status: "cancelled", 
    weight: "19 kg", 
    value: "$142",
    phone: "+1 (555) 567-8901",
    address: "654 Beach Blvd, Sunset Coast",
    fishType: "Scallops, Lobster",
    orderDate: "2024-01-05",
    deliveryDate: "2024-01-07"
  }
];

const orderQueue = [
  { 
    id: "ORD-006", 
    customer: "Marina Grill", 
    time: "2 hours ago", 
    weight: "38 kg", 
    priority: "high",
    value: "$285",
    phone: "+1 (555) 678-9012",
    address: "987 Marina Dr, Port City",
    fishType: "Red Snapper, Mussels",
    requestedDelivery: "Today 6:00 PM"
  },
  { 
    id: "ORD-007", 
    customer: "Pier Market", 
    time: "4 hours ago", 
    weight: "52 kg", 
    priority: "medium",
    value: "$390",
    phone: "+1 (555) 789-0123",
    address: "147 Wharf St, Old Port",
    fishType: "Grouper, Oysters, Clams",
    requestedDelivery: "Tomorrow 10:00 AM"
  },
  { 
    id: "ORD-008", 
    customer: "Anchor Point", 
    time: "6 hours ago", 
    weight: "41 kg", 
    priority: "low",
    value: "$308",
    phone: "+1 (555) 890-1234",
    address: "258 Lighthouse Rd, Cape Point",
    fishType: "Flounder, Sea Urchin",
    requestedDelivery: "Tomorrow 2:00 PM"
  }
];

const deliverySchedule = [
  { 
    id: "DEL-001", 
    customer: "Bay View Restaurant", 
    time: "10:00 AM", 
    weight: "35 kg", 
    driver: "John M.",
    phone: "+1 (555) 901-2345",
    address: "369 Bay View Dr, Coastal Heights",
    fishType: "Salmon, Crab Cakes",
    status: "on-route"
  },
  { 
    id: "DEL-002", 
    customer: "Sunset Café", 
    time: "11:30 AM", 
    weight: "47 kg", 
    driver: "Sarah L.",
    phone: "+1 (555) 012-3456",
    address: "741 Sunset Blvd, Golden Coast",
    fishType: "Tuna, Shrimp Cocktail",
    status: "preparing"
  },
  { 
    id: "DEL-003", 
    customer: "Ocean Breeze", 
    time: "2:00 PM", 
    weight: "29 kg", 
    driver: "Mike R.",
    phone: "+1 (555) 123-4567",
    address: "852 Ocean View Rd, Sea Cliff",
    fishType: "Sea Bass, Calamari",
    status: "scheduled"
  }
];

const getStatusColor = (status: string) => {
  switch (status) {
    case "completed": return "bg-green-100 text-green-800";
    case "delivered": return "bg-blue-100 text-blue-800";
    case "processing": return "bg-yellow-100 text-yellow-800";
    case "pending": return "bg-orange-100 text-orange-800";
    case "cancelled": return "bg-red-100 text-red-800";
    case "on-route": return "bg-blue-100 text-blue-800";
    case "preparing": return "bg-yellow-100 text-yellow-800";
    case "scheduled": return "bg-gray-100 text-gray-800";
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
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null);

  const handleAcceptOrder = (orderId: string) => {
    console.log(`Accepting order: ${orderId}`);
    // Here you would typically make an API call to accept the order
  };

  const handleRejectOrder = (orderId: string) => {
    console.log(`Rejecting order: ${orderId}`);
    // Here you would typically make an API call to reject the order
  };

  const toggleOrderDetails = (orderId: string) => {
    setExpandedOrder(expandedOrder === orderId ? null : orderId);
  };

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
        <CardContent className="space-y-4 max-h-96 overflow-y-auto">
          {allOrders.map((order) => (
            <div key={order.id} className="border rounded-lg p-4 bg-gray-50 hover:bg-gray-100 transition-colors">
              <div className="flex items-center justify-between mb-2">
                <div className="flex-1">
                  <div className="font-medium text-lg">{order.id}</div>
                  <div className="text-sm text-muted-foreground">{order.customer}</div>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge className={getStatusColor(order.status)}>
                    {order.status}
                  </Badge>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => toggleOrderDetails(order.id)}
                  >
                    <Eye className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              
              <div className="flex justify-between text-sm text-muted-foreground mb-2">
                <span>{order.weight}</span>
                <span className="font-medium text-green-600">{order.value}</span>
              </div>
              
              {expandedOrder === order.id && (
                <div className="mt-3 pt-3 border-t border-gray-200 space-y-2 text-sm">
                  <div className="flex items-center space-x-2">
                    <Phone className="h-4 w-4 text-gray-500" />
                    <span>{order.phone}</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <MapPin className="h-4 w-4 text-gray-500 mt-0.5" />
                    <span>{order.address}</span>
                  </div>
                  <div><strong>Fish Type:</strong> {order.fishType}</div>
                  <div><strong>Order Date:</strong> {order.orderDate}</div>
                  <div><strong>Delivery Date:</strong> {order.deliveryDate}</div>
                </div>
              )}
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Order Queue - Pending Orders */}
      <Card className="hover:shadow-lg transition-shadow duration-300">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Clock className="h-5 w-5 text-orange-600" />
            <span>Pending Orders</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 max-h-96 overflow-y-auto">
          {orderQueue.map((order) => (
            <div key={order.id} className="border rounded-lg p-4 bg-gray-50 hover:bg-gray-100 transition-colors">
              <div className="flex items-center justify-between mb-2">
                <div className="flex-1">
                  <div className="font-medium text-lg">{order.id}</div>
                  <div className="text-sm text-muted-foreground">{order.customer}</div>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge className={getPriorityColor(order.priority)}>
                    {order.priority}
                  </Badge>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => toggleOrderDetails(order.id)}
                  >
                    <Eye className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              
              <div className="flex justify-between text-sm text-muted-foreground mb-3">
                <span>{order.weight} • {order.time}</span>
                <span className="font-medium text-green-600">{order.value}</span>
              </div>

              {expandedOrder === order.id && (
                <div className="mb-3 pb-3 border-b border-gray-200 space-y-2 text-sm">
                  <div className="flex items-center space-x-2">
                    <Phone className="h-4 w-4 text-gray-500" />
                    <span>{order.phone}</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <MapPin className="h-4 w-4 text-gray-500 mt-0.5" />
                    <span>{order.address}</span>
                  </div>
                  <div><strong>Fish Type:</strong> {order.fishType}</div>
                  <div><strong>Requested Delivery:</strong> {order.requestedDelivery}</div>
                </div>
              )}
              
              <div className="flex space-x-2">
                <Button
                  size="sm"
                  className="flex-1 bg-green-600 hover:bg-green-700"
                  onClick={() => handleAcceptOrder(order.id)}
                >
                  <Check className="h-4 w-4 mr-1" />
                  Accept
                </Button>
                <Button
                  size="sm"
                  variant="destructive"
                  className="flex-1"
                  onClick={() => handleRejectOrder(order.id)}
                >
                  <X className="h-4 w-4 mr-1" />
                  Reject
                </Button>
              </div>
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
        <CardContent className="space-y-4 max-h-96 overflow-y-auto">
          {deliverySchedule.map((delivery) => (
            <div key={delivery.id} className="border rounded-lg p-4 bg-gray-50 hover:bg-gray-100 transition-colors">
              <div className="flex items-center justify-between mb-2">
                <div className="flex-1">
                  <div className="font-medium text-lg">{delivery.id}</div>
                  <div className="text-sm text-muted-foreground">{delivery.customer}</div>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge className={getStatusColor(delivery.status)}>
                    {delivery.status}
                  </Badge>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => toggleOrderDetails(delivery.id)}
                  >
                    <Eye className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              
              <div className="flex justify-between text-sm text-muted-foreground mb-2">
                <span>{delivery.weight} • Driver: {delivery.driver}</span>
                <div className="text-right">
                  <div className="text-sm font-medium text-blue-600">{delivery.time}</div>
                </div>
              </div>

              {expandedOrder === delivery.id && (
                <div className="mt-3 pt-3 border-t border-gray-200 space-y-2 text-sm">
                  <div className="flex items-center space-x-2">
                    <Phone className="h-4 w-4 text-gray-500" />
                    <span>{delivery.phone}</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <MapPin className="h-4 w-4 text-gray-500 mt-0.5" />
                    <span>{delivery.address}</span>
                  </div>
                  <div><strong>Fish Type:</strong> {delivery.fishType}</div>
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
