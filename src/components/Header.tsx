import { Shield } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";

export const Header = () => {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="w-full bg-primary py-4">
      <div className="container flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <Shield className="h-8 w-8 text-white" />
          <span className="text-xl font-bold text-white">SecureKYC</span>
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          <Link
            to="/kyc"
            className={cn(
              "text-white/80 hover:text-white transition-colors",
              isActive("/kyc") && "text-white font-semibold"
            )}
          >
            Individual Verification
          </Link>
          <Link
            to="/kyb"
            className={cn(
              "text-white/80 hover:text-white transition-colors",
              isActive("/kyb") && "text-white font-semibold"
            )}
          >
            Business Verification
          </Link>
        </nav>
      </div>
    </header>
  );
};