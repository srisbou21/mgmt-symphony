import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/components/theme-provider";
import Index from "@/pages/Index";
import Equipment from "@/pages/Equipment";
import Suppliers from "@/pages/Suppliers";

function App() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <Router>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/equipment" element={<Equipment />} />
          <Route path="/suppliers" element={<Suppliers />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
