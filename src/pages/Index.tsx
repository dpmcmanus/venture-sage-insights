
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to the Dashboard
    navigate("/");
  }, [navigate]);

  return (
    <div className="flex h-screen items-center justify-center">
      <div className="text-center">
        <h1 className="mb-2 text-2xl font-bold">Venture Sage Insights</h1>
        <p>Loading dashboard...</p>
      </div>
    </div>
  );
};

export default Index;
