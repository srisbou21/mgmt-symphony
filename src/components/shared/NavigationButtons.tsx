import { Button } from "@/components/ui/button";
import { ArrowLeft, Home } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const NavigationButtons = () => {
  const navigate = useNavigate();

  return (
    <div className="flex items-center space-x-4 p-4 border-b bg-white">
      <Button
        variant="ghost"
        size="icon"
        onClick={() => navigate(-1)}
      >
        <ArrowLeft className="h-5 w-5" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        onClick={() => navigate('/')}
      >
        <Home className="h-5 w-5" />
      </Button>
    </div>
  );
};