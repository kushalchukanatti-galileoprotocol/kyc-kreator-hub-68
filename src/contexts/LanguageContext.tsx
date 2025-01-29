import React, { createContext, useContext, useState } from "react";

type LanguageContextType = {
  language: "en" | "fr";
  setLanguage: (lang: "en" | "fr") => void;
  t: (key: string) => string;
};

const translations = {
  en: {
    // Header
    "individual.verification": "Individual Verification",
    "business.verification": "Business Verification",
    
    // KYC Page
    "kyc.title": "Individual Verification (KYC)",
    "kyc.subtitle": "Complete your personal verification process securely and easily.",
    
    // KYB Page
    "kyb.title": "Business Verification (KYB)",
    "kyb.subtitle": "Complete your business verification process securely and efficiently.",
    
    // Verification Form
    "personal.info": "Personal Information",
    "first.name": "First Name",
    "last.name": "Last Name",
    "date.of.birth": "Date of Birth (minimum 18 years old)",
    "email": "Email Address",
    "phone": "Phone Number",
    "next.step": "Next Step",
    "back": "Back",
    "submit": "Submit",
    "missing.info": "Missing Information",
    "fill.required": "Please fill in all required fields before continuing.",
    "min.age": "Minimum Age Required",
    "age.requirement": "You must be at least 18 years old to continue.",
    "invalid.phone": "Invalid Phone Format",
    "phone.format": "Please enter a valid international phone number (e.g., +33 612 345 678)",
    
    // Document Step
    "id.verification": "ID Verification",
    "document.instructions": "Photo Document Instructions:",
    "doc.instruction.1": "Place the document on a flat, well-lit surface",
    "doc.instruction.2": "Ensure all corners are visible in the frame",
    "doc.instruction.3": "Avoid glare and shadows on the document",
    "doc.instruction.4": "Make sure text is readable and clear",
    "doc.instruction.5": "Document must be valid",
    "doc.format": "Accepted formats: JPG, PNG (max 5MB)",
    "id.card": "ID Card",
    "passport": "Passport",
    "doc.number": "Document Number",
    "doc.expiry": "Document Expiry Date",
    
    // Selfie Step
    "selfie.verification": "Selfie Verification",
    "selfie.instructions": "Selfie Instructions:",
    "selfie.instruction.1": "Ensure you are in a well-lit area",
    "selfie.instruction.2": "Look directly at the camera",
    "selfie.instruction.3": "Your face should be centered and clearly visible",
    "selfie.instruction.4": "Don't wear sunglasses or hats",
    "selfie.instruction.5": "Avoid dark or cluttered backgrounds",
    "take.selfie": "Take a selfie for verification",
    
    // Wallet Step
    "reward.address": "Reward Address",
    "wallet.info": "Important Information About Rewards",
    "wallet.instruction.1": "An EVM compatible wallet is required to receive your RIWA tokens",
    "wallet.instruction.2": "If you don't have a wallet yet, you can easily create one with MetaMask",
    "wallet.instruction.3": "You can also choose not to receive rewards",
    "create.wallet": "Create a wallet with MetaMask",
    "no.rewards": "I don't want to receive RIWA tokens",
    "evm.address": "EVM Address",
    
    // Confirmation Step
    "verification.submitted": "Verification Submitted",
    "review.message": "We will review your information and get back to you shortly.",
    "processing.time": "Estimated Processing Time",
    "processing.details": "Your verification typically takes 24-48 business hours. You will receive an email once your verification is complete.",
    "reward.address.label": "Reward Address:"
  },
  fr: {
    // Header
    "individual.verification": "Vérification Individuelle",
    "business.verification": "Vérification Entreprise",
    
    // KYC Page
    "kyc.title": "Vérification Individuelle (KYC)",
    "kyc.subtitle": "Complétez votre processus de vérification personnelle de manière sécurisée et facile.",
    
    // KYB Page
    "kyb.title": "Vérification Entreprise (KYB)",
    "kyb.subtitle": "Complétez votre processus de vérification d'entreprise de manière sécurisée et efficace.",
    
    // Verification Form
    "personal.info": "Informations Personnelles",
    "first.name": "Prénom",
    "last.name": "Nom",
    "date.of.birth": "Date de naissance (minimum 18 ans)",
    "email": "Adresse email",
    "phone": "Numéro de téléphone",
    "next.step": "Étape suivante",
    "back": "Retour",
    "submit": "Soumettre",
    "missing.info": "Informations manquantes",
    "fill.required": "Veuillez remplir tous les champs obligatoires avant de continuer.",
    "min.age": "Âge minimum requis",
    "age.requirement": "Vous devez avoir au moins 18 ans pour continuer.",
    "invalid.phone": "Format de téléphone invalide",
    "phone.format": "Veuillez entrer un numéro de téléphone au format international (ex: +33 612 345 678)",
    
    // Document Step
    "id.verification": "Vérification d'identité",
    "document.instructions": "Instructions pour la photo du document :",
    "doc.instruction.1": "Placez le document sur une surface plane et bien éclairée",
    "doc.instruction.2": "Assurez-vous que tous les coins sont visibles dans le cadre",
    "doc.instruction.3": "Évitez les reflets et les ombres sur le document",
    "doc.instruction.4": "Vérifiez que le texte est lisible et net",
    "doc.instruction.5": "Le document doit être en cours de validité",
    "doc.format": "Format accepté : JPG, PNG (max 5MB)",
    "id.card": "Carte d'identité",
    "passport": "Passeport",
    "doc.number": "Numéro du document",
    "doc.expiry": "Date d'expiration",
    
    // Selfie Step
    "selfie.verification": "Vérification par Selfie",
    "selfie.instructions": "Instructions pour le selfie :",
    "selfie.instruction.1": "Assurez-vous d'être dans un endroit bien éclairé",
    "selfie.instruction.2": "Regardez directement vers la caméra",
    "selfie.instruction.3": "Votre visage doit être centré et clairement visible",
    "selfie.instruction.4": "Ne portez pas de lunettes de soleil ou de chapeau",
    "selfie.instruction.5": "Évitez les arrière-plans trop sombres ou encombrés",
    "take.selfie": "Prenez un selfie pour la vérification",
    
    // Wallet Step
    "reward.address": "Adresse de récompense",
    "wallet.info": "Informations importantes concernant les récompenses",
    "wallet.instruction.1": "Un wallet compatible EVM est nécessaire pour recevoir vos tokens RIWA",
    "wallet.instruction.2": "Si vous n'avez pas encore de wallet, vous pouvez en créer un facilement avec MetaMask",
    "wallet.instruction.3": "Vous pouvez aussi choisir de ne pas recevoir de récompense",
    "create.wallet": "Créer un wallet avec MetaMask",
    "no.rewards": "Je ne souhaite pas recevoir de tokens RIWA",
    "evm.address": "Adresse EVM",
    
    // Confirmation Step
    "verification.submitted": "Vérification Soumise",
    "review.message": "Nous examinerons vos informations et reviendrons vers vous rapidement.",
    "processing.time": "Délai de traitement estimé",
    "processing.details": "La vérification de votre dossier prend généralement entre 24 et 48 heures ouvrées. Vous recevrez un email dès que votre vérification sera terminée.",
    "reward.address.label": "Adresse de récompense :"
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: React.ReactNode }) => {
  const [language, setLanguage] = useState<"en" | "fr">("en");

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations["en"]] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};