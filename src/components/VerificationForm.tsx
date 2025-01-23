import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Upload, Camera, CheckCircle, ArrowLeft, ArrowRight, Wallet } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

export const VerificationForm = () => {
  const { toast } = useToast();
  const [kycStep, setKycStep] = useState(1);
  const [walletAddress, setWalletAddress] = useState<string>("");
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
    // Format international : +XX XXX XXX XXX
    const phoneRegex = /^\+[1-9]\d{1,2}[ ]\d{3}[ ]\d{3}[ ]\d{3}$/;
    return phoneRegex.test(phone);
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
          title: "Informations manquantes",
          description: "Veuillez remplir tous les champs obligatoires avant de continuer.",
          variant: "destructive",
        });
        return;
      }

      if (!validateAge(kycData.dateOfBirth)) {
        toast({
          title: "Âge minimum requis",
          description: "Vous devez avoir au moins 18 ans pour continuer.",
          variant: "destructive",
        });
        return;
      }

      if (!validatePhoneNumber(kycData.phone)) {
        toast({
          title: "Format de téléphone invalide",
          description: "Veuillez entrer un numéro de téléphone au format international (ex: +33 612 345 678)",
          variant: "destructive",
        });
        return;
      }
    }

    if (kycStep === 2) {
      if (!kycData.documentNumber || !kycData.documentExpiry) {
        toast({
          title: "Informations manquantes",
          description: "Veuillez remplir le numéro du document et sa date d'expiration.",
          variant: "destructive",
        });
        return;
      }

      if (documentType === "id" && (!kycData.idFront || !kycData.idBack)) {
        toast({
          title: "Documents manquants",
          description: "Veuillez télécharger le recto et le verso de votre carte d'identité.",
          variant: "destructive",
        });
        return;
      }
      if (documentType === "passport" && !kycData.passportPage) {
        toast({
          title: "Document manquant",
          description: "Veuillez télécharger la page principale de votre passeport.",
          variant: "destructive",
        });
        return;
      }
    }

    if (kycStep === 3 && !kycData.selfie) {
      toast({
        title: "Selfie manquant",
        description: "Veuillez prendre un selfie avant de continuer.",
        variant: "destructive",
        });
      return;
    }

    if (kycStep === 4) {
      if (!walletAddress) {
        toast({
          title: "Adresse manquante",
          description: "Veuillez entrer votre adresse de wallet.",
          variant: "destructive",
        });
        return;
      }
      
      if (!validateEVMAddress(walletAddress)) {
        toast({
          title: "Adresse invalide",
          description: "Veuillez entrer une adresse EVM valide (format: 0x...)",
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
            <span className="text-xs">Informations</span>
          </div>
          <div className={`flex flex-col items-center ${kycStep >= 2 ? 'text-blue-500' : 'text-gray-400'}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center mb-2 ${kycStep >= 2 ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}>2</div>
            <span className="text-xs">Document</span>
          </div>
          <div className={`flex flex-col items-center ${kycStep >= 3 ? 'text-blue-500' : 'text-gray-400'}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center mb-2 ${kycStep >= 3 ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}>3</div>
            <span className="text-xs">Selfie</span>
          </div>
          <div className={`flex flex-col items-center ${kycStep >= 4 ? 'text-blue-500' : 'text-gray-400'}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center mb-2 ${kycStep >= 4 ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}>4</div>
            <span className="text-xs">Wallet</span>
          </div>
          <div className={`flex flex-col items-center ${kycStep >= 5 ? 'text-blue-500' : 'text-gray-400'}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center mb-2 ${kycStep >= 5 ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}>5</div>
            <span className="text-xs">Confirmation</span>
          </div>
        </div>

        {kycStep === 1 && (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Informations Personnelles</h2>
            <div className="space-y-3">
              <Input
                placeholder="Prénom"
                value={kycData.firstName}
                onChange={(e) =>
                  setKycData({ ...kycData, firstName: e.target.value })
                }
                required
                className="transition-all duration-200 focus:ring-2 focus:ring-secondary"
              />
              <Input
                placeholder="Nom"
                value={kycData.lastName}
                onChange={(e) =>
                  setKycData({ ...kycData, lastName: e.target.value })
                }
                required
                className="transition-all duration-200 focus:ring-2 focus:ring-secondary"
              />
              <div className="space-y-2">
                <Label htmlFor="dateOfBirth">Date de naissance (18 ans minimum requis)</Label>
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
                placeholder="Adresse email"
                value={kycData.email}
                onChange={(e) =>
                  setKycData({ ...kycData, email: e.target.value })
                }
                required
                className="transition-all duration-200 focus:ring-2 focus:ring-secondary"
              />
              <div className="space-y-2">
                <Label htmlFor="phone">Numéro de téléphone (Format: +XX XXX XXX XXX)</Label>
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
              Étape suivante : Document d'identité
              <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        )}

        {kycStep === 2 && (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Document d'identité</h2>
            
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
                  <p className="mt-2">Recto de la carte d'identité</p>
                  <p className="text-sm text-gray-500 mt-1">Cliquez ou glissez-déposez votre fichier ici</p>
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
                  <p className="mt-2">Verso de la carte d'identité</p>
                  <p className="text-sm text-gray-500 mt-1">Cliquez ou glissez-déposez votre fichier ici</p>
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
                  <p className="mt-2">Page principale du passeport</p>
                  <p className="text-sm text-gray-500 mt-1">Cliquez ou glissez-déposez votre fichier ici</p>
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
                Retour
              </Button>
              <Button onClick={handleKycNext} className="flex-1 group">
                Étape suivante : Selfie
                <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          </div>
        )}

        {kycStep === 3 && (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Vérification par Selfie</h2>
            <div 
              className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer hover:border-secondary transition-colors relative group"
              onClick={() => document.getElementById('selfie')?.click()}
            >
              <div className="absolute inset-0 bg-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg"></div>
              <Camera className="mx-auto h-12 w-12 text-gray-400 group-hover:text-secondary transition-colors" />
              <p className="mt-2">Prenez un selfie pour la vérification</p>
              <p className="text-sm text-gray-500 mt-1">Assurez-vous que votre visage est bien visible</p>
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
                Retour
              </Button>
              <Button 
                onClick={handleKycNext} 
                className="flex-1 group"
                disabled={!kycData.selfie}
              >
                Soumettre la vérification
                <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          </div>
        )}

        {kycStep === 4 && (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Adresse de récompense</h2>
            <p className="text-gray-600">
              Veuillez entrer votre adresse de wallet compatible EVM pour recevoir votre récompense d'inscription.
            </p>
            
            <div className="space-y-2">
              <Label htmlFor="walletAddress">Adresse EVM</Label>
              <Input
                id="walletAddress"
                placeholder="0x..."
                value={walletAddress}
                onChange={(e) => setWalletAddress(e.target.value)}
                className="font-mono"
              />
              <p className="text-sm text-gray-500">
                L'adresse doit commencer par "0x" et contenir 42 caractères au total
              </p>
            </div>

            <div className="flex gap-4">
              <Button onClick={handleKycBack} variant="outline" className="flex-1 group">
                <ArrowLeft className="mr-2 group-hover:-translate-x-1 transition-transform" />
                Retour
              </Button>
              <Button onClick={handleKycNext} className="flex-1 group">
                Finaliser
                <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          </div>
        )}

        {kycStep === 5 && (
          <div className="text-center space-y-4">
            <CheckCircle className="mx-auto h-16 w-16 text-green-500" />
            <h2 className="text-2xl font-bold">Vérification Soumise</h2>
            <p className="text-gray-600">
              Nous examinerons vos informations et reviendrons vers vous rapidement.
            </p>
            <div className="p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-600">
                Adresse de récompense : {walletAddress}
              </p>
            </div>
          </div>
        )}
      </div>
    </Card>
  );
};