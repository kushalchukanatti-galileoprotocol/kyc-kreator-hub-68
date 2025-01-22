import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Upload, Camera, CheckCircle, User, ArrowLeft, ArrowRight } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

export const VerificationForm = () => {
  const { toast } = useToast();
  const [kycStep, setKycStep] = useState(1);
  const [kycData, setKycData] = useState({
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    email: "",
    phone: "",
    idDocument: null,
    selfie: null,
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

  const handleKycBack = () => {
    setKycStep(kycStep - 1);
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

  return (
    <Card className="w-full max-w-2xl p-6 animate-fadeIn">
      <div className="space-y-6">
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
      </div>
    </Card>
  );
};