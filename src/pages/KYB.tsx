import { BusinessVerificationForm } from "@/components/BusinessVerificationForm";
import { Header } from "@/components/Header";

const KYB = () => {
  return (
    <div className="min-h-screen bg-accent">
      <Header />
      <main className="container py-12">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Business Verification (KYB)</h1>
          <p className="text-gray-600">
            Complete your business verification process securely and efficiently.
          </p>
        </div>
        <div className="flex justify-center">
          <BusinessVerificationForm />
        </div>
      </main>
    </div>
  );
};

export default KYB;