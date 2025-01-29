<lov-code>
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Upload, Camera, CheckCircle, ArrowLeft, ArrowRight, Wallet, Clock3 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useLanguage } from "@/contexts/LanguageContext";

export const VerificationForm = () => {
  const { toast } = useToast();
  const { t } = useLanguage();
  const [kycStep, setKycStep] = useState(1);
  const [walletAddress, setWalletAddress] = useState<string>("");
  const [wantsRewards, setWantsRewards] = useState<boolean>(true);
  const [kycData, setKycData] = useState({
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    email: "",
    phone: "",
    documentNumber: "",
    documentExpiry: "",
    idFront: null as File | null,
    idBack: null as File | null,
    passportPage: null as File | null,
    selfie: null as File | null,
  });

  const validatePhoneNumber = (phone: string) => {
    // Remove all non-numeric characters except +
    const cleanedNumber = phone.replace(/[^\d+]/g, '');
    // Check if the number starts with + and has 10-12 digits
    // Or doesn't start with + and has 10-12 digits
    const numberWithoutPlus = cleanedNumber.replace(/^\+/, '');
    return numberWithoutPlus.length >= 10 && numberWithoutPlus.length <= 12;
  };

  const validateEVMAddress = (address: string) => {
    const evmAddressRegex = /^0x[a-fA-F0-9]{40}$/;
    return evmAddressRegex.test(address);
  };

  const validateAge = (birthDate: string) => {
    const today = new Date();
    const birth = new Date(birthDate);
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      age--;
    }
    
    return age >= 18;
  };

  const handleKycNext = () => {
    if (kycStep === 1) {
      if (!kycData.firstName || !kycData.lastName || !kycData.dateOfBirth || !kycData.email || !kycData.phone) {
        toast({
          title: t("missing.info"),
          description: t("fill.required"),
          variant: "destructive",
        });
        return;
      }

      if (!validateAge(kycData.dateOfBirth)) {
        toast({
          title: t("min.age"),
          description: t("age.requirement"),
          variant: "destructive",
        });
        return;
      }

      if (!validatePhoneNumber(kycData.phone)) {
        toast({
          title: t("invalid.phone"),
          description: t("phone.format"),
          variant: "destructive",
        });
        return;
      }
    }

    if (kycStep === 2) {
      if (!kycData.documentNumber || !kycData.documentExpiry) {
        toast({
          title: t("missing.info"),
          description: t("fill.required"),
          variant: "destructive",
        });
        return;
      }

      if (documentType === "id" && (!kycData.idFront || !kycData.idBack)) {
        toast({
          title: t("missing.info"),
          description: t("doc.instruction.1"),
          variant: "destructive",
        });
        return;
      }
      if (documentType === "passport" && !kycData.passportPage) {
        toast({
          title: t("missing.info"),
          description: t("doc.instruction.1"),
          variant: "destructive",
        });
        return;
      }
    }

    if (kycStep === 3 && !kycData.selfie) {
      toast({
        title: t("missing.info"),
        description: t("selfie.instruction.1"),
        variant: "destructive",
      });
      return;
    }

    if (kycStep === 4) {
      if (!walletAddress) {
        toast({
          title: t("missing.info"),
          description: t("wallet.instruction.1"),
          variant: "destructive",
        });
        return;
      }
      
      if (!validateEVMAddress(walletAddress)) {
        toast({
          title: t("invalid.phone"),
          description: t("wallet.instruction.2"),
          variant: "destructive",
        });
        return;
      }
    }

    setKycStep(kycStep + 1);
    console.log("Moving to KYC step:", kycStep + 1);
  };

  const handleKycBack = () => {
    setKycStep(kycStep - 1);
  };

  const [documentType, setDocumentType] = useState<"id" | "passport">("id");

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>, type: 'idFront' | 'idBack' | 'passportPage' | 'selfie') => {
    const file = event.target.files?.[0];
    if (file) {
      setKycData({ ...kycData, [type]: file });
      toast({
        title: "Fichier téléchargé",
        description: `Votre document a été téléchargé avec succès.`,
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
            style={{ width: `${(kycStep / 5) * 100}%` }}
          ></div>
        </div>

        {/* Step indicators */}
        <div className="flex justify-between mb-8">
          <div className={`flex flex-col items-center ${kycStep >= 1 ? 'text-blue-500' : 'text-gray-400'}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center mb-2 ${kycStep >= 1 ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}>1</div>
            <span className="text-xs">{t("personal.info")}</span>
          </div>
          <div className={`flex flex-col items-center ${kycStep >= 2 ? 'text-blue-500' : 'text-gray-400'}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center mb-2 ${kycStep >= 2 ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}>2</div>
            <span className="text-xs">{t("id.verification")}</span>
          </div>
          <div className={`flex flex-col items-center ${kycStep >= 3 ? 'text-blue-500' : 'text-gray-400'}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center mb-2 ${kycStep >= 3 ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}>3</div>
            <span className="text-xs">{t("selfie.verification")}</span>
          </div>
          <div className={`flex flex-col items-center ${kycStep >= 4 ? 'text-blue-500' : 'text-gray-400'}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center mb-2 ${kycStep >= 4 ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}>4</div>
            <span className="text-xs">{t("reward.address")}</span>
          </div>
          <div className={`flex flex-col items-center ${kycStep >= 5 ? 'text-blue-500' : 'text-gray-400'}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center mb-2 ${kycStep >= 5 ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}>5</div>
            <span className="text-xs">{t("verification.submitted")}</span>
          </div>
        </div>

        {kycStep === 1 && (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">{t("personal.info")}</h2>
            <div className="space-y-3">
              <Input
                placeholder={t("first.name")}
                value={kycData.firstName}
                onChange={(e) =>
                  setKycData({ ...kycData, firstName: e.target.value })
                }
                required
                className="transition-all duration-200 focus:ring-2 focus:ring-secondary"
              />
              <Input
                placeholder={t("last.name")}
                value={kycData.lastName}
                onChange={(e) =>
                  setKycData({ ...kycData, lastName: e.target.value })
                }
                required
                className="transition-all duration-200 focus:ring-2 focus:ring-secondary"
              />
              <div className="space-y-2">
                <Label htmlFor="dateOfBirth">{t("date.of.birth")}</Label>
                <Input
                  id="dateOfBirth"
                  type="date"
                  value={kycData.dateOfBirth}
                  onChange={(e) =>
                    setKycData({ ...kycData, dateOfBirth: e.target.value })
                  }
                  required
                  max={new Date(new Date().setFullYear(new Date().getFullYear() - 18)).toISOString().split('T')[0]}
                  className="transition-all duration-200 focus:ring-2 focus:ring-secondary"
                />
              </div>
              <Input
                type="email"
                placeholder={t("email")}
                value={kycData.email}
                onChange={(e) =>
                  setKycData({ ...kycData, email: e.target.value })
                }
                required
                className="transition-all duration-200 focus:ring-2 focus:ring-secondary"
              />
              <div className="space-y-2">
                <Label htmlFor="phone">{t("phone")}</Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="+33 612 345 678"
                  value={kycData.phone}
                  onChange={(e) =>
                    setKycData({ ...kycData, phone: e.target.value })
                  }
                  required
                  className="transition-all duration-200 focus:ring-2 focus:ring-secondary"
                />
              </div>
            </div>
            <Button onClick={handleKycNext} className="w-full group">
              {t("next.step")}
              <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        )}

        {kycStep === 2 && (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">{t("id.verification")}</h2>
            
            <div className="bg-blue-50 p-4 rounded-lg mb-6">
              <h3 className="font-semibold mb-2">{t("document.instructions")}</h3>
              <ul className="list-disc list-inside space-y-2 text-sm text-gray-700">
                <li>{t("doc.instruction.1")}</li>
                <li>{t("doc.instruction.2")}</li>
                <li>{t("doc.instruction.3")}</li>
                <li>{t("doc.instruction.4")}</li>
                <li>{t("doc.instruction.5")}</li>
                <li>{t("doc.format")}</li>
              </ul>
            </div>
            
            <RadioGroup
              defaultValue="id"
              value={documentType}
              onValueChange={(value: "id" | "passport") => setDocumentType(value)}
              className="grid grid-cols-2 gap-4 mb-6"
            >
              <div>
                <RadioGroupItem value="id" id="id" className="peer sr-only" />
                <Label
                  htmlFor="id"
                  className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-secondary [&:has([data-state=checked])]:border-secondary"
                >
                  <span>Carte d'identité</span>
                </Label>
              </div>
              <div>
                <RadioGroupItem value="passport" id="passport" className="peer sr-only" />
                <Label
                  htmlFor="passport"
                  className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-secondary [&:has([data-state=checked])]:border-secondary"
                >
                  <span>Passeport</span>
                </Label>
              </div>
            </RadioGroup>

            <div className="space-y-4">
              <Input
                placeholder="Numéro du document"
                value={kycData.documentNumber}
                onChange={(e) =>
                  setKycData({ ...kycData, documentNumber: e.target.value })
                }
                required
                className="transition-all duration-200 focus:ring-2 focus:ring-secondary"
              />
              <div className="space-y-2">
                <Label htmlFor="documentExpiry" className="text-sm text-gray-600">
                  Date d'expiration du document
                </Label>
                <Input
                  id="documentExpiry"
                  type="date"
                  value={kycData.documentExpiry}
                  onChange={(e) =>
                    setKycData({ ...kycData, documentExpiry: e.target.value })
                  }
                  required
                  className="transition-all duration-200 focus:ring-2 focus:ring-secondary"
                />
              </div>
            </div>

            {documentType === "id" ? (
              <div className="space-y-4">
                <div 
                  className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer hover:border-secondary transition-colors relative group"
                  onClick={() => document.getElementById('idFront')?.click()}
                >
                  <div className="absolute inset-0 bg-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg"></div>
                  <Upload className="mx-auto h-12 w-12 text-gray-400 group-hover:text-secondary transition-colors" />
                  <p className="mt-2 font-medium">Recto de la carte d'identité</p>
                  <p className="text-sm text-gray-500 mt-1">Assurez-vous que la photo et les informations sont clairement visibles</p>
                  <input
                    id="idFront"
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={(e) => handleFileUpload(e, 'idFront')}
                  />
                </div>
                {kycData.idFront && (
                  <p className="text-sm text-green-600 flex items-center">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Recto téléchargé : {kycData.idFront.name}
                  </p>
                )}

                <div 
                  className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer hover:border-secondary transition-colors relative group"
                  onClick={() => document.getElementById('idBack')?.click()}
                >
                  <div className="absolute inset-0 bg-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg"></div>
                  <Upload className="mx-auto h-12 w-12 text-gray-400 group-hover:text-secondary transition-colors" />
                  <p className="mt-2 font-medium">Verso de la carte d'identité</p>
                  <p className="text-sm text-gray-500 mt-1">La signature et le code MRZ doivent être clairement visibles</p>
                  <input
                    id="idBack"
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={(e) => handleFileUpload(e, 'idBack')}
                  />
                </div>
                {kycData.idBack && (
                  <p className="text-sm text-green-600 flex items-center">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Verso téléchargé : {kycData.idBack.name}
                  </p>
                )}
              </div>
            ) : (
              <div className="space-y-4">
                <div 
                  className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer hover:border-secondary transition-colors relative group"
                  onClick={() => document.getElementById('passportPage')?.click()}
                >
                  <div className="absolute inset-0 bg-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg"></div>
                  <Upload className="mx-auto h-12 w-12 text-gray-400 group-hover:text-secondary transition-colors" />
                  <p className="mt-2 font-medium">Page principale du passeport</p>
                  <p className="text-sm text-gray-500 mt-1">La photo et la zone MRZ doivent être parfaitement lisibles</p>
                  <input
                    id="passportPage"
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={(e) => handleFileUpload(e, 'passportPage')}
                  />
                </div>
                {kycData.passportPage && (
                  <p className="text-sm text-green-600 flex items-center">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Page du passeport téléchargée : {kycData.passportPage.name}
                  </p>
                )}
              </div>
            )}

            <div className="flex gap-4">
              <Button onClick={handleKycBack} variant="outline" className="flex-1 group">
                <ArrowLeft className="mr-2 group-hover:-translate-x-1 transition-transform" />
                {t("back")}
              </Button>
              <Button onClick={handleKycNext} className="flex-1 group">
                {t("next.step")}
                <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          </div>
        )}

        {kycStep === 3 && (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">{t("selfie.verification")}</h2>
            
            <div className="bg-blue-50 p-4 rounded-lg mb-6">
              <h3 className="font-semibold mb-2">{t("selfie.instructions")}</h3>
              <ul className="list-disc list-inside space-y-2 text-sm text-gray-700">
                <li>{t("selfie.instruction.1")}</li>
                <li>{t("selfie.instruction.2")}</li>
                <li>{t("selfie.instruction.3")}</li>
                <li>{t("selfie.instruction.4")}</li>
                <li>{t("selfie.instruction.5")}</li>
              </ul>
            </div>

            <div 
              className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer hover:border-secondary transition-colors relative group"
              onClick={() => document.getElementById('selfie')?.click()}
            >
              <div className="absolute inset-0 bg-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg"></div>
              <Camera className="mx-auto h-12 w-12 text-gray-400 group-hover:text-secondary transition-colors" />
              <p className="mt-2 font-medium">Prenez un selfie pour la vérification</p>
              <p className="text-sm text-gray-500 mt-1">La photo doit être récente et vous ressembler</p>
              <input
                id="selfie"
                type="file"
                className="hidden"
                accept="image/*"
                capture="user"
                onChange={(e) => handleFileUpload(e, 'selfie')}
              />
            </div>
            {kycData.selfie && (
              <p className="text-sm text-green-600 flex items-center">
                <CheckCircle className="w-4 h-4 mr-2" />
                Selfie téléchargé : {(kycData.selfie as File).name}
              </p>
            )}

            <div className="flex gap-4">
              <Button onClick={handleKycBack} variant="outline" className="flex-1 group">
                <ArrowLeft className="mr-2 group-hover:-translate-x-1 transition-transform" />
                {t("back")}
              </Button>
              <Button onClick={handleKycNext} className="flex-1 group">
                {t("next.step")}
                <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          </div>
        )}

        {kycStep === 4 && (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">{t("reward.address")}</h2>
            
            <div className="bg-blue-50 p-4 rounded-lg mb-6">
             