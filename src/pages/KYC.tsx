import { Header } from "@/components/Header";

const KYC = () => {
  return (
    <div className="min-h-screen bg-accent">
      <Header />
      <main className="container py-12">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Individual Verification (KYC)</h1>
          <p className="text-gray-600">
            Complete your personal verification process securely and easily.
          </p>
        </div>
      </main>
    </div>
  );
};

export default KYC;