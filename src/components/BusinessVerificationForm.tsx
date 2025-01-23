import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Building, Briefcase, Factory, Database, Shield, Check, X, Info, User, Users, Globe } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

export const BusinessVerificationForm = () => {
  const { toast } = useToast();
  const [kybStep, setKybStep] = useState(1);
  const [walletAddress, setWalletAddress] = useState<string>("");
  const [kybData, setKybData] = useState({
    // Informations de l'entreprise
    companyName: "",
    registrationNumber: "",
    vatNumber: "",
    incorporationDate: "",
    companyType: "",
    // Adresse de l'entreprise
    streetAddress: "",
    city: "",
    postalCode: "",
    country: "",
    // Représentant légal
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
    const phoneRegex = /^\+[1-9]\d{1,2}[ ]\d{3}[ ]\d{3}[ ]\d{3}$/;
    return phoneRegex.test(phone);
  };

  const handleKybNext = () => {
    if (kybStep === 1) {
      if (!kybData.companyName || !kybData.registrationNumber || !kybData.incorporationDate || !kybData.companyType) {
        toast({
          title: "Informations manquantes",
          description: "Veuillez remplir tous les champs obligatoires concernant l'entreprise.",
          variant: "destructive",
        });
        return;
      }
    }

    if (kybStep === 2) {
      if (!kybData.streetAddress || !kybData.city || !kybData.postalCode || !kybData.country) {
        toast({
          title: "Adresse incomplète",
          description: "Veuillez remplir tous les champs de l'adresse.",
          variant: "destructive",
        });
        return;
      }
    }

    if (kybStep === 3) {
      if (!kybData.legalRepFirstName || !kybData.legalRepLastName || !kybData.legalRepPosition || 
          !kybData.legalRepEmail || !kybData.legalRepPhone) {
        toast({
          title: "Informations du représentant manquantes",
          description: "Veuillez remplir toutes les informations concernant le représentant légal.",
          variant: "destructive",
        });
        return;
      }

      if (!validatePhoneNumber(kybData.legalRepPhone)) {
        toast({
          title: "Format de téléphone invalide",
          description: "Veuillez entrer un numéro de téléphone au format international (ex: +33 612 345 678)",
          variant: "destructive",
        });
        return;
      }
    }

    if (kybStep === 4) {
      if (!kybData.registrationDoc || !kybData.articlesDoc) {
        toast({
          title: "Documents manquants",
          description: "Le certificat d'immatriculation et les statuts sont obligatoires.",
          variant: "destructive",
        });
        return;
      }
    }

    if (kybStep === 5) {
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
        title: "Document téléchargé",
        description: `${file.name} a été téléchargé avec succès.`,
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
            <span className="text-xs">Entreprise</span>
          </div>
          <div className={`flex flex-col items-center ${kybStep >= 2 ? 'text-blue-500' : 'text-gray-400'}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center mb-2 ${kybStep >= 2 ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}>
              <Globe className="w-4 h-4" />
            </div>
            <span className="text-xs">Adresse</span>
          </div>
          <div className={`flex flex-col items-center ${kybStep >= 3 ? 'text-blue-500' : 'text-gray-400'}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center mb-2 ${kybStep >= 3 ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}>
              <User className="w-4 h-4" />
            </div>
            <span className="text-xs">Représentant</span>
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
            <h2 className="text-2xl font-bold">Informations de l'entreprise</h2>
            <div className="space-y-3">
              <Input
                placeholder="Nom de l'entreprise"
                value={kybData.companyName}
                onChange={(e) => setKybData({ ...kybData, companyName: e.target.value })}
                required
              />
              <Input
                placeholder="Numéro d'immatriculation"
                value={kybData.registrationNumber}
                onChange={(e) => setKybData({ ...kybData, registrationNumber: e.target.value })}
                required
              />
              <Input
                placeholder="Numéro de TVA (optionnel)"
                value={kybData.vatNumber}
                onChange={(e) => setKybData({ ...kybData, vatNumber: e.target.value })}
              />
              <div className="space-y-2">
                <Label>Date de création</Label>
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
                    <RadioGroupItem value="sarl" id="sarl" className="peer sr-only" />
                    <Label
                      htmlFor="sarl"
                      className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                    >
                      <span>SARL</span>
                    </Label>
                  </div>
                  <div>
                    <RadioGroupItem value="sas" id="sas" className="peer sr-only" />
                    <Label
                      htmlFor="sas"
                      className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                    >
                      <span>SAS</span>
                    </Label>
                  </div>
                </div>
              </RadioGroup>
            </div>
            <Button onClick={handleKybNext} className="w-full">Suivant</Button>
          </div>
        )}

        {kybStep === 2 && (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Adresse de l'entreprise</h2>
            <div className="space-y-3">
              <Input
                placeholder="Adresse"
                value={kybData.streetAddress}
                onChange={(e) => setKybData({ ...kybData, streetAddress: e.target.value })}
                required
              />
              <Input
                placeholder="Ville"
                value={kybData.city}
                onChange={(e) => setKybData({ ...kybData, city: e.target.value })}
                required
              />
              <Input
                placeholder="Code postal"
                value={kybData.postalCode}
                onChange={(e) => setKybData({ ...kybData, postalCode: e.target.value })}
                required
              />
              <Input
                placeholder="Pays"
                value={kybData.country}
                onChange={(e) => setKybData({ ...kybData, country: e.target.value })}
                required
              />
            </div>
            <div className="flex gap-4">
              <Button onClick={handleKybBack} variant="outline" className="flex-1">Retour</Button>
              <Button onClick={handleKybNext} className="flex-1">Suivant</Button>
            </div>
          </div>
        )}

        {kybStep === 3 && (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Représentant légal</h2>
            <div className="space-y-3">
              <Input
                placeholder="Prénom"
                value={kybData.legalRepFirstName}
                onChange={(e) => setKybData({ ...kybData, legalRepFirstName: e.target.value })}
                required
              />
              <Input
                placeholder="Nom"
                value={kybData.legalRepLastName}
                onChange={(e) => setKybData({ ...kybData, legalRepLastName: e.target.value })}
                required
              />
              <Input
                placeholder="Fonction"
                value={kybData.legalRepPosition}
                onChange={(e) => setKybData({ ...kybData, legalRepPosition: e.target.value })}
                required
              />
              <Input
                type="email"
                placeholder="Email professionnel"
                value={kybData.legalRepEmail}
                onChange={(e) => setKybData({ ...kybData, legalRepEmail: e.target.value })}
                required
              />
              <div className="space-y-2">
                <Label htmlFor="phone">Numéro de téléphone (Format: +XX XXX XXX XXX)</Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="+33 612 345 678"
                  value={kybData.legalRepPhone}
                  onChange={(e) => setKybData({ ...kybData, legalRepPhone: e.target.value })}
                  required
                />
              </div>
            </div>
            <div className="flex gap-4">
              <Button onClick={handleKybBack} variant="outline" className="flex-1">Retour</Button>
              <Button onClick={handleKybNext} className="flex-1">Suivant</Button>
            </div>
          </div>
        )}

        {kybStep === 4 && (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Documents requis</h2>
            
            <div className="bg-blue-50 p-4 rounded-lg mb-6">
              <h3 className="font-semibold mb-2">Instructions pour les documents :</h3>
              <ul className="list-disc list-inside space-y-2 text-sm text-gray-700">
                <li>Les documents doivent être lisibles et complets</li>
                <li>Format accepté : PDF, JPG, PNG (max 10MB)</li>
                <li>Les documents doivent être en cours de validité</li>
                <li>Les documents en langue étrangère doivent être traduits</li>
              </ul>
            </div>

            <div className="space-y-4">
              <div 
                className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer hover:border-blue-500 transition-colors"
                onClick={() => document.getElementById('registrationDoc')?.click()}
              >
                <Database className="mx-auto h-12 w-12 text-gray-400" />
                <p className="mt-2 font-medium">Certificat d'immatriculation</p>
                <p className="text-sm text-gray-500 mt-1">Extrait K-bis de moins de 3 mois</p>
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
                  Document téléchargé : {kybData.registrationDoc.name}
                </p>
              )}

              <div 
                className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer hover:border-blue-500 transition-colors"
                onClick={() => document.getElementById('articlesDoc')?.click()}
              >
                <Database className="mx-auto h-12 w-12 text-gray-400" />
                <p className="mt-2 font-medium">Statuts de l'entreprise</p>
                <p className="text-sm text-gray-500 mt-1">Dernière version à jour des statuts</p>
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
                  Document téléchargé : {kybData.articlesDoc.name}
                </p>
              )}

              <div 
                className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer hover:border-blue-500 transition-colors"
                onClick={() => document.getElementById('financialDoc')?.click()}
              >
                <Database className="mx-auto h-12 w-12 text-gray-400" />
                <p className="mt-2 font-medium">États financiers (optionnel)</p>
                <p className="text-sm text-gray-500 mt-1">Dernier bilan et compte de résultat</p>
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
                  Document téléchargé : {kybData.financialDoc.name}
                </p>
              )}
            </div>

            <div className="flex gap-4">
              <Button onClick={handleKybBack} variant="outline" className="flex-1">Retour</Button>
              <Button onClick={handleKybNext} className="flex-1">Suivant</Button>
            </div>
          </div>
        )}

        {kybStep === 5 && (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Adresse de récompense</h2>
            <p className="text-gray-600">
              Veuillez entrer l'adresse de wallet de l'entreprise pour recevoir la récompense d'inscription.
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
              <Button onClick={handleKybBack} variant="outline" className="flex-1">Retour</Button>
              <Button onClick={handleKybNext} className="flex-1">Finaliser</Button>
            </div>
          </div>
        )}

        {kybStep === 6 && (
          <div className="text-center space-y-4">
            <Check className="mx-auto h-16 w-16 text-green-500" />
            <h2 className="text-2xl font-bold">Vérification Soumise</h2>
            <p className="text-gray-600">
              Nous examinerons les informations de votre entreprise et reviendrons vers vous rapidement.
            </p>
            <div className="p-4 bg-blue-50 rounded-lg space-y-3">
              <div className="flex items-center justify-center text-blue-600 gap-2">
                <Clock className="h-5 w-5" />
                <p className="font-medium">Délai de traitement estimé</p>
              </div>
              <p className="text-sm text-gray-600">
                La vérification de votre dossier prend généralement entre 3 et 5 jours ouvrés.
                Vous recevrez un email dès que votre vérification sera terminée.
              </p>
            </div>
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