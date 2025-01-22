import { Shield } from "lucide-react";

export const Header = () => {
  return (
    <header className="w-full bg-primary py-4">
      <div className="container flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Shield className="h-8 w-8 text-white" />
          <span className="text-xl font-bold text-white">SecureKYC</span>
        </div>
      </div>
    </header>
  );
};