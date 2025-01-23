import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Building, Briefcase, Factory, Database, Shield, Check, X, Info, User, Users, Globe, Clock3 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// List of countries with their codes
const countryCodes = [
  { country: "United States", code: "+1", id: "US" },
  { country: "United Kingdom", code: "+44", id: "GB" },
  { country: "France", code: "+33", id: "FR" },
  { country: "Germany", code: "+49", id: "DE" },
  { country: "Canada", code: "+1", id: "CA" },
  { country: "Australia", code: "+61", id: "AU" },
  { country: "Singapore", code: "+65", id: "SG" },
  { country: "Japan", code: "+81", id: "JP" },
  { country: "Switzerland", code: "+41", id: "CH" },
  { country: "Netherlands", code: "+31", id: "NL" },
];

export const BusinessVerificationForm = () => {
  const { toast } = useToast();
  const [kybStep, setKybStep] = useState(1);
  const [walletAddress, setWalletAddress] = useState<string>("");
  const [selectedCountryCode, setSelectedCountryCode] = useState("+1");
  const [kybData, setKybData] = useState({
    // Company Information
    companyName: "",
    registrationNumber: "",
    vatNumber: "",
    incorporationDate: "",
    companyType: "",
    // Company Address
    streetAddress: "",
    city: "",
    postalCode: "",
    country: "",
    // Legal Representative
    legalRepFirstName: "",
    legalRepLastName: "",
    legalRepPosition: "",
    legalRepEmail: "",
    legalRepPhone: "",
    // Documents
    registrationDoc: null as File | null,
    articlesDoc: null as File | null,
    financialDoc: null as File | null,
    ownershipDoc: null as File | null,
  });

  const validateEVMAddress = (address: string) => {
    const evmAddressRegex = /^0x[a-fA-F0-9]{40}$/;
    return evmAddressRegex.test(address);
  };

  const validatePhoneNumber = (phone: string) => {
    // Simplified validation: checks if the number contains between 6 and 15 digits
    const phoneRegex = /^\d{6,15}$/;
    return phoneRegex.test(phone.replace(/\s/g, ''));
  };

  const handleKybNext = () => {
    if (kybStep === 1) {
      if (!kybData.companyName || !kybData.registrationNumber || !kybData.incorporationDate || !kybData.companyType) {
        toast({
          title: "Missing Information",
          description: "Please fill in all required company information fields.",
          variant: "destructive",
        });
        return;
      }
    }

    if (kybStep === 2) {
      if (!kybData.streetAddress || !kybData.city || !kybData.postalCode || !kybData.country) {
        toast({
          title: "Incomplete Address",
          description: "Please fill in all address fields.",
          variant: "destructive",
        });
        return;
      }
    }

    if (kybStep === 3) {
      if (!kybData.legalRepFirstName || !kybData.legalRepLastName || !kybData.legalRepPosition || 
          !kybData.legalRepEmail || !kybData.legalRepPhone) {
        toast({
          title: "Missing Representative Information",
          description: "Please fill in all information about the legal representative.",
          variant: "destructive",
        });
        return;
      }

      if (!validatePhoneNumber(kybData.legalRepPhone)) {
        toast({
          title: "Invalid Phone Format",
          description: "Please enter a valid phone number (6-15 digits)",
          variant: "destructive",
        });
        return;
      }
    }

    if (kybStep === 4) {
      if (!kybData.registrationDoc || !kybData.articlesDoc) {
        toast({
          title: "Missing Documents",
          description: "Certificate of Incorporation and Articles of Association are required.",
          variant: "destructive",
        });
        return;
      }
    }

    if (kybStep === 5) {
      if (!walletAddress) {
        toast({
          title: "Missing Address",
          description: "Please enter your wallet address.",
          variant: "destructive",
        });
        return;
      }
      
      if (!validateEVMAddress(walletAddress)) {
        toast({
          title: "Invalid Address",
          description: "Please enter a valid EVM address (format: 0x...)",
          variant: "destructive",
        });
        return;
      }
    }

    setKybStep(kybStep + 1);
    console.log("Moving to KYB step:", kybStep + 1);
  };

  const handleKybBack = () => {
    setKybStep(kybStep - 1);
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>, type: keyof typeof kybData) => {
    const file = event.target.files?.[0];
    if (file) {
      setKybData({ ...kybData, [type]: file });
      toast({
        title: "Document Uploaded",
        description: `${file.name} has been uploaded successfully.`,
      });
    }
  };

  return (
    <Card className="w-full max-w-2xl p-6 animate-fadeIn">
      <div className="space-y-6">
        {/* Progress bar */}
        <div className="relative w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
          <div 
            className="absolute top-0 left-0 h-full bg-blue-500 transition-all duration-500 ease-in-out"
            style={{ width: `${(kybStep / 6) * 100}%` }}
          ></div>
        </div>

        {/* Step indicators */}
        <div className="flex justify-between mb-8">
          <div className={`flex flex-col items-center ${kybStep >= 1 ? 'text-blue-500' : 'text-gray-400'}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center mb-2 ${kybStep >= 1 ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}>
              <Building className="w-4 h-4" />
            </div>
            <span className="text-xs">Company</span>
          </div>
          <div className={`flex flex-col items-center ${kybStep >= 2 ? 'text-blue-500' : 'text-gray-400'}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center mb-2 ${kybStep >= 2 ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}>
              <Globe className="w-4 h-4" />
            </div>
            <span className="text-xs">Address</span>
          </div>
          <div className={`flex flex-col items-center ${kybStep >= 3 ? 'text-blue-500' : 'text-gray-400'}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center mb-2 ${kybStep >= 3 ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}>
              <User className="w-4 h-4" />
            </div>
            <span className="text-xs">Representative</span>
          </div>
          <div className={`flex flex-col items-center ${kybStep >= 4 ? 'text-blue-500' : 'text-gray-400'}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center mb-2 ${kybStep >= 4 ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}>
              <Database className="w-4 h-4" />
            </div>
            <span className="text-xs">Documents</span>
          </div>
          <div className={`flex flex-col items-center ${kybStep >= 5 ? 'text-blue-500' : 'text-gray-400'}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center mb-2 ${kybStep >= 5 ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}>
              <Shield className="w-4 h-4" />
            </div>
            <span className="text-xs">Wallet</span>
          </div>
          <div className={`flex flex-col items-center ${kybStep >= 6 ? 'text-blue-500' : 'text-gray-400'}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center mb-2 ${kybStep >= 6 ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}>
              <Check className="w-4 h-4" />
            </div>
            <span className="text-xs">Confirmation</span>
          </div>
        </div>

        {kybStep === 1 && (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Company Information</h2>
            <div className="space-y-3">
              <Input
                placeholder="Company Name"
                value={kybData.companyName}
                onChange={(e) => setKybData({ ...kybData, companyName: e.target.value })}
                required
              />
              <Input
                placeholder="Registration Number"
                value={kybData.registrationNumber}
                onChange={(e) => setKybData({ ...kybData, registrationNumber: e.target.value })}
                required
              />
              <Input
                placeholder="VAT Number (optional)"
                value={kybData.vatNumber}
                onChange={(e) => setKybData({ ...kybData, vatNumber: e.target.value })}
              />
              <div className="space-y-2">
                <Label>Date of Incorporation</Label>
                <Input
                  type="date"
                  value={kybData.incorporationDate}
                  onChange={(e) => setKybData({ ...kybData, incorporationDate: e.target.value })}
                  required
                />
              </div>
              <RadioGroup
                value={kybData.companyType}
                onValueChange={(value) => setKybData({ ...kybData, companyType: value })}
              >
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <RadioGroupItem value="llc" id="llc" className="peer sr-only" />
                    <Label
                      htmlFor="llc"
                      className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                    >
                      <span>LLC</span>
                    </Label>
                  </div>
                  <div>
                    <RadioGroupItem value="corporation" id="corporation" className="peer sr-only" />
                    <Label
                      htmlFor="corporation"
                      className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                    >
                      <span>Corporation</span>
                    </Label>
                  </div>
                </div>
              </RadioGroup>
            </div>
            <Button onClick={handleKybNext} className="w-full">Next</Button>
          </div>
        )}

        {kybStep === 2 && (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Company Address</h2>
            <div className="space-y-3">
              <Input
                placeholder="Street Address"
                value={kybData.streetAddress}
                onChange={(e) => setKybData({ ...kybData, streetAddress: e.target.value })}
                required
              />
              <Input
                placeholder="City"
                value={kybData.city}
                onChange={(e) => setKybData({ ...kybData, city: e.target.value })}
                required
              />
              <Input
                placeholder="Postal Code"
                value={kybData.postalCode}
                onChange={(e) => setKybData({ ...kybData, postalCode: e.target.value })}
                required
              />
              <Select
                value={kybData.country}
                onValueChange={(value) => setKybData({ ...kybData, country: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select Country" />
                </SelectTrigger>
                <SelectContent>
                  {countryCodes.map((country) => (
                    <SelectItem key={country.id} value={country.id}>
                      {country.country}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex gap-4">
              <Button onClick={handleKybBack} variant="outline" className="flex-1">Back</Button>
              <Button onClick={handleKybNext} className="flex-1">Next</Button>
            </div>
          </div>
        )}

        {kybStep === 3 && (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Legal Representative</h2>
            <div className="space-y-3">
              <Input
                placeholder="First Name"
                value={kybData.legalRepFirstName}
                onChange={(e) => setKybData({ ...kybData, legalRepFirstName: e.target.value })}
                required
              />
              <Input
                placeholder="Last Name"
                value={kybData.legalRepLastName}
                onChange={(e) => setKybData({ ...kybData, legalRepLastName: e.target.value })}
                required
              />
              <Input
                placeholder="Position"
                value={kybData.legalRepPosition}
                onChange={(e) => setKybData({ ...kybData, legalRepPosition: e.target.value })}
                required
              />
              <Input
                type="email"
                placeholder="Business Email"
                value={kybData.legalRepEmail}
                onChange={(e) => setKybData({ ...kybData, legalRepEmail: e.target.value })}
                required
              />
              <div className="space-y-2">
                <Label>Phone Number</Label>
                <div className="flex gap-2">
                  <Select
                    value={selectedCountryCode}
                    onValueChange={setSelectedCountryCode}
                  >
                    <SelectTrigger className="w-[140px]">
                      <SelectValue placeholder="Country Code" />
                    </SelectTrigger>
                    <SelectContent>
                      {countryCodes.map((country) => (
                        <SelectItem key={country.id} value={country.code}>
                          {country.country} ({country.code})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Input
                    type="tel"
                    placeholder="2025550123"
                    value={kybData.legalRepPhone}
                    onChange={(e) => setKybData({ ...kybData, legalRepPhone: e.target.value })}
                    required
                    className="flex-1"
                  />
                </div>
                <p className="text-sm text-gray-500">
                  Format: numbers only, no spaces (e.g., 2025550123)
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <Button onClick={handleKybBack} variant="outline" className="flex-1">Back</Button>
              <Button onClick={handleKybNext} className="flex-1">Next</Button>
            </div>
          </div>
        )}

        {kybStep === 4 && (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Required Documents</h2>
            
            <div className="bg-blue-50 p-4 rounded-lg mb-6">
              <h3 className="font-semibold mb-2">Document Guidelines:</h3>
              <ul className="list-disc list-inside space-y-2 text-sm text-gray-700">
                <li>Documents must be clear and complete</li>
                <li>Accepted formats: PDF, JPG, PNG (max 10MB)</li>
                <li>Documents must be current and valid</li>
                <li>Non-English documents require certified translation</li>
              </ul>
            </div>

            <div className="space-y-4">
              <div 
                className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer hover:border-blue-500 transition-colors"
                onClick={() => document.getElementById('registrationDoc')?.click()}
              >
                <Database className="mx-auto h-12 w-12 text-gray-400" />
                <p className="mt-2 font-medium">Certificate of Incorporation</p>
                <p className="text-sm text-gray-500 mt-1">Recent business registration document</p>
                <input
                  id="registrationDoc"
                  type="file"
                  className="hidden"
                  onChange={(e) => handleFileUpload(e, 'registrationDoc')}
                  accept=".pdf,.jpg,.jpeg,.png"
                />
              </div>
              {kybData.registrationDoc && (
                <p className="text-sm text-green-600 flex items-center">
                  <Check className="w-4 h-4 mr-2" />
                  Document uploaded: {kybData.registrationDoc.name}
                </p>
              )}

              <div 
                className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer hover:border-blue-500 transition-colors"
                onClick={() => document.getElementById('articlesDoc')?.click()}
              >
                <Database className="mx-auto h-12 w-12 text-gray-400" />
                <p className="mt-2 font-medium">Articles of Association</p>
                <p className="text-sm text-gray-500 mt-1">Current version of company bylaws</p>
                <input
                  id="articlesDoc"
                  type="file"
                  className="hidden"
                  onChange={(e) => handleFileUpload(e, 'articlesDoc')}
                  accept=".pdf,.jpg,.jpeg,.png"
                />
              </div>
              {kybData.articlesDoc && (
                <p className="text-sm text-green-600 flex items-center">
                  <Check className="w-4 h-4 mr-2" />
                  Document uploaded: {kybData.articlesDoc.name}
                </p>
              )}

              <div 
                className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer hover:border-blue-500 transition-colors"
                onClick={() => document.getElementById('financialDoc')?.click()}
              >
                <Database className="mx-auto h-12 w-12 text-gray-400" />
                <p className="mt-2 font-medium">Financial Statements (optional)</p>
                <p className="text-sm text-gray-500 mt-1">Latest balance sheet and income statement</p>
                <input
                  id="financialDoc"
                  type="file"
                  className="hidden"
                  onChange={(e) => handleFileUpload(e, 'financialDoc')}
                  accept=".pdf,.jpg,.jpeg,.png"
                />
              </div>
              {kybData.financialDoc && (
                <p className="text-sm text-green-600 flex items-center">
                  <Check className="w-4 h-4 mr-2" />
                  Document uploaded: {kybData.financialDoc.name}
                </p>
              )}
            </div>

            <div className="flex gap-4">
              <Button onClick={handleKybBack} variant="outline" className="flex-1">Back</Button>
              <Button onClick={handleKybNext} className="flex-1">Next</Button>
            </div>
          </div>
        )}

        {kybStep === 5 && (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Reward Address</h2>
            <p className="text-gray-600">
              Please enter your company's wallet address to receive the registration reward.
            </p>
            
            <div className="space-y-2">
              <Label htmlFor="walletAddress">EVM Address</Label>
              <Input
                id="walletAddress"
                placeholder="0x..."
                value={walletAddress}
                onChange={(e) => setWalletAddress(e.target.value)}
                className="font-mono"
              />
              <p className="text-sm text-gray-500">
                Address must start with "0x" and contain 42 characters in total
              </p>
            </div>

            <div className="flex gap-4">
              <Button onClick={handleKybBack} variant="outline" className="flex-1">Back</Button>
              <Button onClick={handleKybNext} className="flex-1">Finalize</Button>
            </div>
          </div>
        )}

        {kybStep === 6 && (
          <div className="text-center space-y-4">
            <Check className="mx-auto h-16 w-16 text-green-500" />
            <h2 className="text-2xl font-bold">Verification Submitted</h2>
            <p className="text-gray-600">
              We will review your company information and get back to you shortly.
            </p>
            <div className="p-4 bg-blue-50 rounded-lg space-y-3">
              <div className="flex items-center justify-center text-blue-600 gap-2">
                <Clock3 className="h-5 w-5" />
                <p className="font-medium">Estimated Processing Time</p>
              </div>
              <p className="text-sm text-gray-600">
                Your application typically takes 3-5 business days to process.
                You will receive an email once your verification is complete.
              </p>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-600">
                Reward Address: {walletAddress}
              </p>
            </div>
          </div>
        )}
      </div>
    </Card>
  );
};