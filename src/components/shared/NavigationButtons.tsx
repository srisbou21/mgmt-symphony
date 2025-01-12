import { Button } from "@/components/ui/button";
import { ArrowLeft, Home } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useCallback } from "react";

export const NavigationButtons = () => {
  const navigate = useNavigate();

  const handleGoBack = useCallback(() => {
    navigate(-1);
  }, [navigate]);

  const handleGoHome = useCallback(() => {
    navigate('/');
  }, [navigate]);

  return (
    <div className="flex items-center space-x-4 p-4 border-b bg-white">
      <Button
        variant="ghost"
        size="icon"
        onClick={handleGoBack}
        className="hover:bg-gray-100"
      >
        <ArrowLeft className="h-5 w-5" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        onClick={handleGoHome}
        className="hover:bg-gray-100"
      >
        <Home className="h-5 w-5" />
      </Button>
    </div>
  );
};