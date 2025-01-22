import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Upload, Camera, CheckCircle, Building2, User, ArrowLeft, ArrowRight } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

export const VerificationForm = () => {
  const { toast } = useToast();
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
    if (kycStep === 1) {
      if (!kycData.firstName || !kycData.lastName || !kycData.dateOfBirth || !kycData.email || !kycData.phone) {
        toast({
          title: "Informations manquantes",
          description: "Veuillez remplir tous les champs obligatoires avant de continuer.",
          variant: "destructive",
        });
        return;
      }
    }

    setKycStep(kycStep + 1);
    console.log("Moving to KYC step:", kycStep + 1);
  };

  const handleKybNext = () => {
    if (kybStep === 1) {
      if (!kybData.companyName || !kybData.registrationNumber || !kybData.taxId) {
        toast({
          title: "Informations manquantes",
          description: "Veuillez remplir tous les champs obligatoires avant de continuer.",
          variant: "destructive",
        });
        return;
      }
    }

    setKybStep(kybStep + 1);
    console.log("Moving to KYB step:", kybStep + 1);
  };

  const handleKycBack = () => {
    setKycStep(kycStep - 1);
  };

  const handleKybBack = () => {
    setKybStep(kybStep - 1);
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>, type: 'idDocument' | 'selfie') => {
    const file = event.target.files?.[0];
    if (file) {
      setKycData({ ...kycData, [type]: file });
      toast({
        title: "Fichier téléchargé",
        description: `Votre ${type === 'idDocument' ? 'document d\'identité' : 'selfie'} a été téléchargé avec succès.`,
      });
    }
  };

  // ... keep existing code (rest of the component JSX)

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
          {/* Progress bar */}
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div 
              className="bg-secondary h-2.5 rounded-full transition-all duration-500"
              style={{ width: `${(kycStep / 3) * 100}%` }}
            ></div>
          </div>

          {/* Step indicators */}
          <div className="flex justify-between mb-8">
            <div className={`flex flex-col items-center ${kycStep >= 1 ? 'text-secondary' : 'text-gray-400'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center mb-2 ${kycStep >= 1 ? 'bg-secondary text-white' : 'bg-gray-200'}`}>1</div>
              <span className="text-xs">Informations</span>
            </div>
            <div className={`flex flex-col items-center ${kycStep >= 2 ? 'text-secondary' : 'text-gray-400'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center mb-2 ${kycStep >= 2 ? 'bg-secondary text-white' : 'bg-gray-200'}`}>2</div>
              <span className="text-xs">Document</span>
            </div>
            <div className={`flex flex-col items-center ${kycStep >= 3 ? 'text-secondary' : 'text-gray-400'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center mb-2 ${kycStep >= 3 ? 'bg-secondary text-white' : 'bg-gray-200'}`}>3</div>
              <span className="text-xs">Selfie</span>
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
                <Input
                  type="date"
                  placeholder="Date de naissance"
                  value={kycData.dateOfBirth}
                  onChange={(e) =>
                    setKycData({ ...kycData, dateOfBirth: e.target.value })
                  }
                  required
                  className="transition-all duration-200 focus:ring-2 focus:ring-secondary"
                />
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
                <Input
                  type="tel"
                  placeholder="Numéro de téléphone"
                  value={kycData.phone}
                  onChange={(e) =>
                    setKycData({ ...kycData, phone: e.target.value })
                  }
                  required
                  className="transition-all duration-200 focus:ring-2 focus:ring-secondary"
                />
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
              <div 
                className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer hover:border-secondary transition-colors relative group"
                onClick={() => document.getElementById('idDocument')?.click()}
              >
                <div className="absolute inset-0 bg-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg"></div>
                <Upload className="mx-auto h-12 w-12 text-gray-400 group-hover:text-secondary transition-colors" />
                <p className="mt-2">Téléchargez votre document d'identité (Passeport ou Carte d'identité)</p>
                <p className="text-sm text-gray-500 mt-1">Cliquez ou glissez-déposez votre fichier ici</p>
                <input
                  id="idDocument"
                  type="file"
                  className="hidden"
                  accept="image/*"
                  onChange={(e) => handleFileUpload(e, 'idDocument')}
                />
              </div>
              {kycData.idDocument && (
                <p className="text-sm text-green-600 flex items-center">
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Document téléchargé : {(kycData.idDocument as File).name}
                </p>
              )}
              <div className="flex gap-4">
                <Button onClick={handleKycBack} variant="outline" className="flex-1 group">
                  <ArrowLeft className="mr-2 group-hover:-translate-x-1 transition-transform" />
                  Retour
                </Button>
                <Button onClick={handleKycNext} className="flex-1 group" disabled={!kycData.idDocument}>
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
            <div className="text-center space-y-4">
              <CheckCircle className="mx-auto h-16 w-16 text-green-500" />
              <h2 className="text-2xl font-bold">Vérification Soumise</h2>
              <p className="text-gray-600">
                Nous examinerons vos informations et reviendrons vers vous rapidement.
              </p>
            </div>
          )}
        </TabsContent>

        <TabsContent value="business">
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
              <div className="flex gap-4">
                <Button onClick={handleKybBack} variant="outline" className="flex-1">
                  Back
                </Button>
                <Button onClick={handleKybNext} className="flex-1">
                  Next
                </Button>
              </div>
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
              <div className="flex gap-4">
                <Button onClick={handleKybBack} variant="outline" className="flex-1">
                  Back
                </Button>
                <Button onClick={handleKybNext} className="flex-1">
                  Submit Verification
                </Button>
              </div>
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
