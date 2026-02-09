
import { IndustrialHeader } from "@/components/IndustrialHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  ArrowLeft,
  Package,
  User,
  DollarSign,
  Truck,
  MapPin,
  Phone,
  CheckCircle2,
  Circle,
  Clock,
} from "lucide-react";
import { useParams, useNavigate } from "react-router-dom";

// Mock order data — in production, fetch by ID
const orderData: Record<string, {
  id: string;
  date: string;
  paymentStatus: string;
  deliveryStatus: string;
  fishLot: { type: string; grade: string; weight: string; catchDate: string; catchLocation: string };
  fisherman: { name: string; phone: string; location: string; rating: number };
  pricing: { fishPrice: number; deliveryCharge: number; platformFee: number };
  payment: { advance: number; remaining: number };
  delivery: { driver: string; phone: string; currentLocation: string; eta: string };
}> = {
  "ORD-1047": {
    id: "ORD-1047",
    date: "2024-01-08",
    paymentStatus: "Paid",
    deliveryStatus: "Delivered",
    fishLot: { type: "Atlantic Salmon", grade: "A+", weight: "25 kg", catchDate: "2024-01-07", catchLocation: "North Atlantic" },
    fisherman: { name: "Carlos Mendes", phone: "+1 (555) 111-2233", location: "Bay Harbor, Dock 12", rating: 4.9 },
    pricing: { fishPrice: 200.00, deliveryCharge: 8.50, platformFee: 4.00 },
    payment: { advance: 212.50, remaining: 0 },
    delivery: { driver: "Alex T.", phone: "+1 (555) 456-7890", currentLocation: "Delivered", eta: "—" },
  },
  "ORD-1046": {
    id: "ORD-1046",
    date: "2024-01-07",
    paymentStatus: "Partial",
    deliveryStatus: "In Transit",
    fishLot: { type: "Yellowfin Tuna", grade: "A", weight: "10 kg", catchDate: "2024-01-06", catchLocation: "Pacific Ocean" },
    fisherman: { name: "Maria Santos", phone: "+1 (555) 222-3344", location: "Coastal Port, Dock 5", rating: 4.7 },
    pricing: { fishPrice: 108.00, deliveryCharge: 8.00, platformFee: 4.00 },
    payment: { advance: 60.00, remaining: 60.00 },
    delivery: { driver: "Maria L.", phone: "+1 (555) 567-8901", currentLocation: "Highway 101, 15 km away", eta: "25 mins" },
  },
  "ORD-1045": {
    id: "ORD-1045",
    date: "2024-01-07",
    paymentStatus: "Pending",
    deliveryStatus: "Assigned",
    fishLot: { type: "Tiger Prawns", grade: "A+", weight: "8 kg", catchDate: "2024-01-06", catchLocation: "Indian Ocean" },
    fisherman: { name: "Ravi Kumar", phone: "+1 (555) 333-4455", location: "Marine Dock, Bay 3", rating: 4.8 },
    pricing: { fishPrice: 162.00, deliveryCharge: 10.00, platformFee: 4.00 },
    payment: { advance: 0, remaining: 176.00 },
    delivery: { driver: "Pending Assignment", phone: "—", currentLocation: "Not started", eta: "Tomorrow, 10 AM" },
  },
};

const deliverySteps = [
  { key: "Assigned", label: "Assigned", icon: Package },
  { key: "In Transit", label: "In Transit", icon: Truck },
  { key: "Delivered", label: "Delivered", icon: CheckCircle2 },
];

const getStepState = (currentStatus: string, stepKey: string) => {
  const order = ["Assigned", "In Transit", "Delivered"];
  const ci = order.indexOf(currentStatus);
  const si = order.indexOf(stepKey);
  if (si < ci) return "done";
  if (si === ci) return "current";
  return "upcoming";
};

const IndustrialOrderDetail = () => {
  const { orderId } = useParams<{ orderId: string }>();
  const navigate = useNavigate();

  const order = orderId ? orderData[orderId] : null;

  if (!order) {
    return (
      <div className="min-h-screen bg-background">
        <IndustrialHeader />
        <main className="container mx-auto px-4 py-16 text-center space-y-4">
          <p className="text-muted-foreground">Order not found.</p>
          <Button variant="outline" onClick={() => navigate("/industrial/orders")}>
            <ArrowLeft className="h-4 w-4 mr-2" /> Back to Orders
          </Button>
        </main>
      </div>
    );
  }

  const total = order.pricing.fishPrice + order.pricing.deliveryCharge + order.pricing.platformFee;

  return (
    <div className="min-h-screen bg-background">
      <IndustrialHeader />

      <main className="container mx-auto px-4 py-8 space-y-6">
        {/* Header */}
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" onClick={() => navigate("/industrial/orders")}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div className="flex-1">
            <h2 className="text-2xl font-bold tracking-tight">{order.id}</h2>
            <p className="text-sm text-muted-foreground">Placed on {order.date}</p>
          </div>
          <Badge className={order.paymentStatus === "Paid" ? "bg-emerald-100 text-emerald-700" : order.paymentStatus === "Partial" ? "bg-amber-100 text-amber-700" : "bg-red-100 text-red-700"}>
            {order.paymentStatus}
          </Badge>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Fish Lot Details */}
            <Card className="border-none shadow-md">
              <CardHeader className="pb-3">
                <CardTitle className="text-base flex items-center gap-2">
                  <Package className="h-4 w-4 text-muted-foreground" />
                  Fish Lot Details
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
                  <div>
                    <p className="text-muted-foreground">Fish Type</p>
                    <p className="font-medium">{order.fishLot.type}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Quality Grade</p>
                    <p className="font-medium">{order.fishLot.grade}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Weight</p>
                    <p className="font-medium">{order.fishLot.weight}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Catch Date</p>
                    <p className="font-medium">{order.fishLot.catchDate}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Catch Location</p>
                    <p className="font-medium">{order.fishLot.catchLocation}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Fisherman Details */}
            <Card className="border-none shadow-md">
              <CardHeader className="pb-3">
                <CardTitle className="text-base flex items-center gap-2">
                  <User className="h-4 w-4 text-muted-foreground" />
                  Fisherman Details
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-start gap-4">
                  <div className="h-12 w-12 rounded-full bg-secondary flex items-center justify-center">
                    <User className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <div className="space-y-1 text-sm">
                    <p className="font-semibold text-base">{order.fisherman.name}</p>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Phone className="h-3 w-3" />
                      {order.fisherman.phone}
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <MapPin className="h-3 w-3" />
                      {order.fisherman.location}
                    </div>
                    <p className="text-muted-foreground">Rating: ⭐ {order.fisherman.rating}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Delivery Tracking */}
            <Card className="border-none shadow-md">
              <CardHeader className="pb-3">
                <CardTitle className="text-base flex items-center gap-2">
                  <Truck className="h-4 w-4 text-muted-foreground" />
                  Delivery Tracking
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Status Steps */}
                <div className="flex items-center justify-between">
                  {deliverySteps.map((step, i) => {
                    const state = getStepState(order.deliveryStatus, step.key);
                    return (
                      <div key={step.key} className="flex flex-col items-center flex-1 relative">
                        {i > 0 && (
                          <div
                            className={`absolute top-4 -left-1/2 w-full h-0.5 ${
                              state === "upcoming" ? "bg-border" : "bg-emerald-500"
                            }`}
                            style={{ zIndex: 0 }}
                          />
                        )}
                        <div
                          className={`relative z-10 h-8 w-8 rounded-full flex items-center justify-center ${
                            state === "done"
                              ? "bg-emerald-500 text-white"
                              : state === "current"
                              ? "bg-blue-500 text-white ring-4 ring-blue-100"
                              : "bg-muted text-muted-foreground"
                          }`}
                        >
                          {state === "done" ? (
                            <CheckCircle2 className="h-4 w-4" />
                          ) : state === "current" ? (
                            <step.icon className="h-4 w-4" />
                          ) : (
                            <Circle className="h-4 w-4" />
                          )}
                        </div>
                        <span className={`text-xs mt-2 font-medium ${state === "current" ? "text-blue-600" : state === "done" ? "text-emerald-600" : "text-muted-foreground"}`}>
                          {step.label}
                        </span>
                      </div>
                    );
                  })}
                </div>

                <Separator />

                {/* Map placeholder */}
                <div className="rounded-lg bg-muted h-48 flex items-center justify-center">
                  <div className="text-center text-muted-foreground space-y-1">
                    <MapPin className="h-8 w-8 mx-auto" />
                    <p className="text-sm font-medium">Live Map</p>
                    <p className="text-xs">{order.delivery.currentLocation}</p>
                    {order.delivery.eta !== "—" && (
                      <p className="text-xs flex items-center justify-center gap-1">
                        <Clock className="h-3 w-3" /> ETA: {order.delivery.eta}
                      </p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-muted-foreground">Driver</p>
                    <p className="font-medium">{order.delivery.driver}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Driver Phone</p>
                    <p className="font-medium">{order.delivery.phone}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column — Price & Payment */}
          <div className="space-y-6">
            {/* Price Breakdown */}
            <Card className="border-none shadow-md">
              <CardHeader className="pb-3">
                <CardTitle className="text-base flex items-center gap-2">
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                  Price Breakdown
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Fish Price</span>
                  <span className="font-medium">${order.pricing.fishPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Delivery Charge</span>
                  <span className="font-medium">${order.pricing.deliveryCharge.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Platform Fee</span>
                  <span className="font-medium">${order.pricing.platformFee.toFixed(2)}</span>
                </div>
                <Separator />
                <div className="flex justify-between text-base font-bold">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </CardContent>
            </Card>

            {/* Payment Actions */}
            <Card className="border-none shadow-md">
              <CardHeader className="pb-3">
                <CardTitle className="text-base">Payment</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Advance Paid</span>
                  <span className="font-medium text-emerald-600">${order.payment.advance.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Remaining</span>
                  <span className="font-medium text-red-600">${order.payment.remaining.toFixed(2)}</span>
                </div>
                <Separator />

                {order.payment.remaining > 0 ? (
                  <div className="space-y-2">
                    {order.payment.advance === 0 && (
                      <Button className="w-full" variant="outline">
                        Pay Advance (50%)
                      </Button>
                    )}
                    <Button className="w-full">
                      Pay Remaining ${order.payment.remaining.toFixed(2)}
                    </Button>
                  </div>
                ) : (
                  <div className="flex items-center gap-2 text-emerald-600 justify-center py-2">
                    <CheckCircle2 className="h-4 w-4" />
                    <span className="font-medium">Fully Paid</span>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default IndustrialOrderDetail;
