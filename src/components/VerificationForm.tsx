import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Upload, Camera, CheckCircle, Building2, User } from "lucide-react";

export const VerificationForm = () => {
  const [kycStep, setKycStep] = useState(1);
  const [kybStep, setKybStep] = useState(1);
  const [kycData, setKycData] = useState({
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    email: "",
    phone: "",
    idDocument: null,
    selfie: null,
  });

  const [kybData, setKybData] = useState({
    companyName: "",
    registrationNumber: "",
    taxId: "",
    businessType: "",
    incorporationDate: "",
    address: "",
    representativeName: "",
    representativeTitle: "",
    businessDocument: null,
    proofOfAddress: null,
  });

  const handleKycNext = () => {
    setKycStep(kycStep + 1);
    console.log("Moving to KYC step:", kycStep + 1);
  };

  const handleKybNext = () => {
    setKybStep(kybStep + 1);
    console.log("Moving to KYB step:", kybStep + 1);
  };

  return (
    <Card className="w-full max-w-2xl p-6 animate-fadeIn">
      <Tabs defaultValue="individual" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="individual" className="space-x-2">
            <User className="w-4 h-4" />
            <span>Individual (KYC)</span>
          </TabsTrigger>
          <TabsTrigger value="business" className="space-x-2">
            <Building2 className="w-4 h-4" />
            <span>Business (KYB)</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="individual" className="space-y-6">
          {kycStep === 1 && (
            <div className="space-y-4">
              <h2 className="text-2xl font-bold">Personal Information</h2>
              <div className="space-y-3">
                <Input
                  placeholder="First Name"
                  value={kycData.firstName}
                  onChange={(e) =>
                    setKycData({ ...kycData, firstName: e.target.value })
                  }
                />
                <Input
                  placeholder="Last Name"
                  value={kycData.lastName}
                  onChange={(e) =>
                    setKycData({ ...kycData, lastName: e.target.value })
                  }
                />
                <Input
                  type="date"
                  placeholder="Date of Birth"
                  value={kycData.dateOfBirth}
                  onChange={(e) =>
                    setKycData({ ...kycData, dateOfBirth: e.target.value })
                  }
                />
                <Input
                  type="email"
                  placeholder="Email Address"
                  value={kycData.email}
                  onChange={(e) =>
                    setKycData({ ...kycData, email: e.target.value })
                  }
                />
                <Input
                  type="tel"
                  placeholder="Phone Number"
                  value={kycData.phone}
                  onChange={(e) =>
                    setKycData({ ...kycData, phone: e.target.value })
                  }
                />
              </div>
              <Button onClick={handleKycNext} className="w-full">
                Next
              </Button>
            </div>
          )}

          {kycStep === 2 && (
            <div className="space-y-4">
              <h2 className="text-2xl font-bold">Identity Document</h2>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                <Upload className="mx-auto h-12 w-12 text-gray-400" />
                <p className="mt-2">Upload your ID document (Passport or ID card)</p>
                <input
                  type="file"
                  className="hidden"
                  onChange={(e) =>
                    setKycData({ ...kycData, idDocument: e.target.files?.[0] })
                  }
                />
              </div>
              <Button onClick={handleKycNext} className="w-full">
                Next
              </Button>
            </div>
          )}

          {kycStep === 3 && (
            <div className="space-y-4">
              <h2 className="text-2xl font-bold">Selfie Verification</h2>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                <Camera className="mx-auto h-12 w-12 text-gray-400" />
                <p className="mt-2">Take a selfie for verification</p>
              </div>
              <Button onClick={handleKycNext} className="w-full">
                Submit Verification
              </Button>
            </div>
          )}

          {kycStep === 4 && (
            <div className="text-center space-y-4">
              <CheckCircle className="mx-auto h-16 w-16 text-green-500" />
              <h2 className="text-2xl font-bold">Verification Submitted</h2>
              <p className="text-gray-600">
                We'll review your information and get back to you shortly.
              </p>
            </div>
          )}
        </TabsContent>

        <TabsContent value="business" className="space-y-6">
          {kybStep === 1 && (
            <div className="space-y-4">
              <h2 className="text-2xl font-bold">Business Information</h2>
              <div className="space-y-3">
                <Input
                  placeholder="Company Name"
                  value={kybData.companyName}
                  onChange={(e) =>
                    setKybData({ ...kybData, companyName: e.target.value })
                  }
                />
                <Input
                  placeholder="Registration Number"
                  value={kybData.registrationNumber}
                  onChange={(e) =>
                    setKybData({ ...kybData, registrationNumber: e.target.value })
                  }
                />
                <Input
                  placeholder="Tax ID / VAT Number"
                  value={kybData.taxId}
                  onChange={(e) =>
                    setKybData({ ...kybData, taxId: e.target.value })
                  }
                />
                <Input
                  placeholder="Business Type"
                  value={kybData.businessType}
                  onChange={(e) =>
                    setKybData({ ...kybData, businessType: e.target.value })
                  }
                />
                <Input
                  type="date"
                  placeholder="Incorporation Date"
                  value={kybData.incorporationDate}
                  onChange={(e) =>
                    setKybData({ ...kybData, incorporationDate: e.target.value })
                  }
                />
                <Input
                  placeholder="Business Address"
                  value={kybData.address}
                  onChange={(e) =>
                    setKybData({ ...kybData, address: e.target.value })
                  }
                />
              </div>
              <Button onClick={handleKybNext} className="w-full">
                Next
              </Button>
            </div>
          )}

          {kybStep === 2 && (
            <div className="space-y-4">
              <h2 className="text-2xl font-bold">Representative Information</h2>
              <div className="space-y-3">
                <Input
                  placeholder="Representative Name"
                  value={kybData.representativeName}
                  onChange={(e) =>
                    setKybData({ ...kybData, representativeName: e.target.value })
                  }
                />
                <Input
                  placeholder="Representative Title"
                  value={kybData.representativeTitle}
                  onChange={(e) =>
                    setKybData({ ...kybData, representativeTitle: e.target.value })
                  }
                />
              </div>
              <Button onClick={handleKybNext} className="w-full">
                Next
              </Button>
            </div>
          )}

          {kybStep === 3 && (
            <div className="space-y-4">
              <h2 className="text-2xl font-bold">Business Documents</h2>
              <div className="space-y-4">
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                  <Upload className="mx-auto h-12 w-12 text-gray-400" />
                  <p className="mt-2">Upload Business Registration Document</p>
                  <input
                    type="file"
                    className="hidden"
                    onChange={(e) =>
                      setKybData({
                        ...kybData,
                        businessDocument: e.target.files?.[0],
                      })
                    }
                  />
                </div>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                  <Upload className="mx-auto h-12 w-12 text-gray-400" />
                  <p className="mt-2">Upload Proof of Business Address</p>
                  <input
                    type="file"
                    className="hidden"
                    onChange={(e) =>
                      setKybData({
                        ...kybData,
                        proofOfAddress: e.target.files?.[0],
                      })
                    }
                  />
                </div>
              </div>
              <Button onClick={handleKybNext} className="w-full">
                Submit Verification
              </Button>
            </div>
          )}

          {kybStep === 4 && (
            <div className="text-center space-y-4">
              <CheckCircle className="mx-auto h-16 w-16 text-green-500" />
              <h2 className="text-2xl font-bold">Business Verification Submitted</h2>
              <p className="text-gray-600">
                We'll review your business information and get back to you shortly.
              </p>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </Card>
  );
};