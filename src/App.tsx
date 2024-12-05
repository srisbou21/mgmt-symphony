import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Equipment from "./pages/Equipment";
import Discharge from "./pages/Discharge";
import EquipmentTypes from "./pages/EquipmentTypes";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import Staff from "./pages/Staff";
import Maintenance from "./pages/Maintenance";
import Inventory from "./pages/Inventory";
import Settings from "./pages/Settings";
import { ThemeProvider } from "./components/theme-provider";
import { Toaster } from "./components/ui/toaster";

function App() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <Router>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/equipment" element={<Equipment />} />
          <Route path="/discharge" element={<Discharge />} />
          <Route path="/equipment-types" element={<EquipmentTypes />} />
          <Route path="/staff" element={<Staff />} />
          <Route path="/maintenance" element={<Maintenance />} />
          <Route path="/inventory" element={<Inventory />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
        <Toaster />
      </Router>
    </ThemeProvider>
  );
}

export default App;