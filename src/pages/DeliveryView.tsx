
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Truck, MapPin, Phone, Clock, ArrowLeft, CheckCircle, Package, AlertCircle, ShoppingBag } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useState } from "react";
import DeliveryMap from "@/components/delivery/DeliveryMap";
import NewOrderCard from "@/components/delivery/NewOrderCard";

const deliveries = [
  {
    id: "DEL-001", customer: "Bay View Restaurant", scheduledTime: "10:00 AM",
    weight: "35 kg", driver: "John M.", phone: "+1 (555) 901-2345",
    address: "369 Bay View Dr, Coastal Heights", fishType: "Salmon, Crab Cakes",
    status: "delivered", value: "$280", lat: 37.8044, lng: -122.2712,
  },
  {
    id: "DEL-002", customer: "Sunset Café", scheduledTime: "11:30 AM",
    weight: "47 kg", driver: "Sarah L.", phone: "+1 (555) 012-3456",
    address: "741 Sunset Blvd, Golden Coast", fishType: "Tuna, Shrimp Cocktail",
    status: "on-route", value: "$390", lat: 37.7599, lng: -122.4148,
  },
  {
    id: "DEL-003", customer: "Ocean Breeze", scheduledTime: "2:00 PM",
    weight: "29 kg", driver: "Mike R.", phone: "+1 (555) 123-4567",
    address: "852 Ocean View Rd, Sea Cliff", fishType: "Sea Bass, Calamari",
    status: "preparing", value: "$215", lat: 37.7849, lng: -122.4994,
  },
  {
    id: "DEL-004", customer: "Harbor Grill", scheduledTime: "3:30 PM",
    weight: "52 kg", driver: "Alex T.", phone: "+1 (555) 234-5678",
    address: "123 Harbor Walk, Marina Bay", fishType: "Lobster, Prawns",
    status: "scheduled", value: "$620", lat: 37.8083, lng: -122.4156,
  },
  {
    id: "DEL-005", customer: "Pier Side Diner", scheduledTime: "5:00 PM",
    weight: "18 kg", driver: "John M.", phone: "+1 (555) 345-6789",
    address: "456 Pier St, Old Town", fishType: "Cod, Halibut",
    status: "scheduled", value: "$145", lat: 37.8100, lng: -122.4100,
  },
];

const newOrders = [
  {
    id: "ORD-101", customer: "Coastal Kitchen", fishType: "Mahi-Mahi, Snapper",
    weight: "40 kg", value: "$520", address: "99 Coastal Hwy, Pacific Beach",
    placedAt: "Today, 8:15 AM",
  },
  {
    id: "ORD-102", customer: "The Fish House", fishType: "Swordfish, Oysters",
    weight: "25 kg", value: "$380", address: "210 Marina Blvd, Harborside",
    placedAt: "Today, 9:42 AM",
  },
  {
    id: "ORD-103", customer: "Reef Bistro", fishType: "Tuna, Clams",
    weight: "33 kg", value: "$445", address: "77 Reef Lane, Bayshore",
    placedAt: "Today, 10:05 AM",
  },
];

const getStatusConfig = (status: string) => {
  switch (status) {
    case "delivered":
      return { color: "bg-green-100 text-green-800", icon: CheckCircle, label: "Delivered" };
    case "on-route":
      return { color: "bg-blue-100 text-blue-800", icon: Truck, label: "On Route" };
    case "preparing":
      return { color: "bg-yellow-100 text-yellow-800", icon: Package, label: "Preparing" };
    case "scheduled":
      return { color: "bg-muted text-muted-foreground", icon: Clock, label: "Scheduled" };
    case "failed":
      return { color: "bg-destructive/10 text-destructive", icon: AlertCircle, label: "Failed" };
    default:
      return { color: "bg-muted text-muted-foreground", icon: Clock, label: status };
  }
};

const DeliveryView = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [filter, setFilter] = useState<string>("all");

  const filteredDeliveries = filter === "all"
    ? deliveries
    : deliveries.filter((d) => d.status === filter);

  const stats = {
    total: deliveries.length,
    delivered: deliveries.filter((d) => d.status === "delivered").length,
    onRoute: deliveries.filter((d) => d.status === "on-route").length,
    scheduled: deliveries.filter((d) => d.status === "scheduled" || d.status === "preparing").length,
  };

  const backPath = user?.userType === "industrial" ? "/industrial" : "/";

  const mapLocations = deliveries.map((d) => ({
    id: d.id, customer: d.customer, address: d.address,
    lat: d.lat, lng: d.lng, status: d.status,
  }));

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-slate-100">
      <header className="bg-gradient-to-r from-green-600 to-green-700 text-white shadow-lg">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Truck className="h-8 w-8" />
              <div>
                <h1 className="text-2xl font-bold">Delivery Tracker</h1>
                <p className="text-green-100">Monitor all deliveries in real-time</p>
              </div>
            </div>
            <Button
              onClick={() => navigate(backPath)}
              variant="outline"
              className="bg-transparent border-white text-white hover:bg-white hover:text-green-700"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Dashboard
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 space-y-8">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: "Total Deliveries", value: stats.total, color: "text-foreground" },
            { label: "Delivered", value: stats.delivered, color: "text-green-600" },
            { label: "On Route", value: stats.onRoute, color: "text-blue-600" },
            { label: "Pending", value: stats.scheduled, color: "text-orange-600" },
          ].map((s, i) => (
            <Card key={i}>
              <CardContent className="pt-6 text-center">
                <div className={`text-3xl font-bold ${s.color}`}>{s.value}</div>
                <p className="text-sm text-muted-foreground mt-1">{s.label}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Map View */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="h-5 w-5" />
              Live Delivery Map
            </CardTitle>
          </CardHeader>
          <CardContent>
            <DeliveryMap locations={mapLocations} />
            <div className="flex flex-wrap gap-4 mt-3 text-xs">
              {[
                { label: "Delivered", color: "bg-green-500" },
                { label: "On Route", color: "bg-blue-500" },
                { label: "Preparing", color: "bg-yellow-500" },
                { label: "Scheduled", color: "bg-slate-400" },
              ].map((l) => (
                <div key={l.label} className="flex items-center gap-1.5">
                  <span className={`w-3 h-3 rounded-full ${l.color}`} />
                  <span className="text-muted-foreground">{l.label}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* New Orders (Order Placed) */}
        <div>
          <h2 className="text-xl font-semibold flex items-center gap-2 mb-4">
            <ShoppingBag className="h-5 w-5 text-violet-600" />
            New Orders — Awaiting Dispatch
            <Badge className="bg-violet-100 text-violet-800 border-transparent ml-2">{newOrders.length}</Badge>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {newOrders.map((order) => (
              <NewOrderCard key={order.id} order={order} />
            ))}
          </div>
        </div>

        {/* Filters */}
        <div className="flex gap-2 flex-wrap">
          {["all", "delivered", "on-route", "preparing", "scheduled"].map((f) => (
            <Button
              key={f}
              variant={filter === f ? "default" : "outline"}
              size="sm"
              onClick={() => setFilter(f)}
              className={filter === f ? "bg-green-600 hover:bg-green-700" : ""}
            >
              {f === "all" ? "All" : f.replace("-", " ").replace(/\b\w/g, (c) => c.toUpperCase())}
            </Button>
          ))}
        </div>

        {/* Delivery List */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredDeliveries.map((delivery) => {
            const statusConfig = getStatusConfig(delivery.status);
            const StatusIcon = statusConfig.icon;
            return (
              <Card key={delivery.id} className="hover:shadow-lg transition-shadow duration-300">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{delivery.id}</CardTitle>
                    <Badge className={statusConfig.color}>
                      <StatusIcon className="h-3 w-3 mr-1" />
                      {statusConfig.label}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{delivery.customer}</p>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div>
                      <span className="text-muted-foreground">Weight:</span>
                      <span className="ml-1 font-medium">{delivery.weight}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Value:</span>
                      <span className="ml-1 font-medium text-green-600">{delivery.value}</span>
                    </div>
                  </div>
                  <div className="text-sm space-y-1.5">
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span>{delivery.scheduledTime}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Truck className="h-4 w-4 text-muted-foreground" />
                      <span>Driver: {delivery.driver}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-muted-foreground" />
                      <span>{delivery.phone}</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <MapPin className="h-4 w-4 text-muted-foreground mt-0.5" />
                      <span>{delivery.address}</span>
                    </div>
                  </div>
                  <div className="pt-2 border-t text-sm">
                    <span className="text-muted-foreground">Fish:</span>
                    <span className="ml-1">{delivery.fishType}</span>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </main>
    </div>
  );
};

export default DeliveryView;
