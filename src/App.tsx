import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Equipment from "./pages/Equipment";
import MaintenanceEquipment from "./pages/MaintenanceEquipment";
import Suppliers from "./pages/Suppliers";
import Staff from "./pages/Staff";
import Discharge from "./pages/Discharge";
import Locations from "./pages/Locations";
import Inventory from "./pages/Inventory";
import Services from "./pages/Services";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/equipment" element={<Equipment />} />
          <Route path="/maintenance" element={<MaintenanceEquipment />} />
          <Route path="/suppliers" element={<Suppliers />} />
          <Route path="/staff" element={<Staff />} />
          <Route path="/discharge" element={<Discharge />} />
          <Route path="/locations" element={<Locations />} />
          <Route path="/inventory" element={<Inventory />} />
          <Route path="/services" element={<Services />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;