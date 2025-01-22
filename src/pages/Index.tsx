import { Header } from "@/components/Header";
import { VerificationForm } from "@/components/VerificationForm";

const Index = () => {
  return (
    <div className="min-h-screen bg-accent">
      <Header />
      <main className="container py-12">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Secure Identity Verification</h1>
          <p className="text-gray-600">
            Complete your verification in just a few minutes with our secure and
            easy-to-use platform.
          </p>
        </div>
        <div className="flex justify-center">
          <VerificationForm />
        </div>
      </main>
    </div>
  );
};

export default Index;