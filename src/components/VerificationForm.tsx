import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Upload, Camera, CheckCircle } from "lucide-react";

export const VerificationForm = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    idDocument: null,
    selfie: null,
  });

  const handleNext = () => {
    setStep(step + 1);
    console.log("Moving to step:", step + 1);
  };

  return (
    <Card className="w-full max-w-lg p-6 animate-fadeIn">
      <div className="space-y-6">
        {step === 1 && (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Personal Information</h2>
            <div className="space-y-2">
              <Input
                placeholder="First Name"
                value={formData.firstName}
                onChange={(e) =>
                  setFormData({ ...formData, firstName: e.target.value })
                }
              />
              <Input
                placeholder="Last Name"
                value={formData.lastName}
                onChange={(e) =>
                  setFormData({ ...formData, lastName: e.target.value })
                }
              />
              <Input
                type="date"
                placeholder="Date of Birth"
                value={formData.dateOfBirth}
                onChange={(e) =>
                  setFormData({ ...formData, dateOfBirth: e.target.value })
                }
              />
            </div>
            <Button onClick={handleNext} className="w-full">
              Next
            </Button>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Identity Document</h2>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
              <Upload className="mx-auto h-12 w-12 text-gray-400" />
              <p className="mt-2">Upload your ID document</p>
              <input
                type="file"
                className="hidden"
                onChange={(e) =>
                  setFormData({ ...formData, idDocument: e.target.files?.[0] })
                }
              />
            </div>
            <Button onClick={handleNext} className="w-full">
              Next
            </Button>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Selfie Verification</h2>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
              <Camera className="mx-auto h-12 w-12 text-gray-400" />
              <p className="mt-2">Take a selfie</p>
            </div>
            <Button onClick={handleNext} className="w-full">
              Submit Verification
            </Button>
          </div>
        )}

        {step === 4 && (
          <div className="text-center space-y-4">
            <CheckCircle className="mx-auto h-16 w-16 text-green-500" />
            <h2 className="text-2xl font-bold">Verification Submitted</h2>
            <p className="text-gray-600">
              We'll review your information and get back to you shortly.
            </p>
          </div>
        )}
      </div>
    </Card>
  );
};