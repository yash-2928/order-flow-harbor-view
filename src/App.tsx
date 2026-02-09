
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import ProtectedRoute from "@/components/ProtectedRoute";
import Index from "./pages/Index";
import IndustrialView from "./pages/IndustrialView";
import IndustrialDashboard from "./pages/IndustrialDashboard";
import IndustrialOrders from "./pages/IndustrialOrders";
import IndustrialOrderDetail from "./pages/IndustrialOrderDetail";
import DeliveryView from "./pages/DeliveryView";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route 
              path="/" 
              element={
                <ProtectedRoute allowedRoles={['fisherman']}>
                  <Index />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/industrial" 
              element={
                <ProtectedRoute allowedRoles={['industrial']}>
                  <IndustrialDashboard />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/industrial/catalog" 
              element={
                <ProtectedRoute allowedRoles={['industrial']}>
                  <IndustrialView />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/industrial/orders" 
              element={
                <ProtectedRoute allowedRoles={['industrial']}>
                  <IndustrialOrders />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/industrial/orders/:orderId" 
              element={
                <ProtectedRoute allowedRoles={['industrial']}>
                  <IndustrialOrderDetail />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/delivery" 
              element={
                <ProtectedRoute>
                  <DeliveryView />
                </ProtectedRoute>
              } 
            />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
