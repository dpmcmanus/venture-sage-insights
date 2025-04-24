
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="flex min-h-[80vh] flex-col items-center justify-center">
      <div className="mb-8 rounded-full bg-vc-gray-light p-6">
        <div className="text-6xl font-bold text-vc-blue">404</div>
      </div>
      <h1 className="mb-2 text-2xl font-bold">Page Not Found</h1>
      <p className="mb-8 text-center text-muted-foreground">
        We couldn't find the page you were looking for.<br />
        It might have been moved or doesn't exist.
      </p>
      <Button asChild>
        <Link to="/">Return to Dashboard</Link>
      </Button>
    </div>
  );
};

export default NotFound;
