// types.ts

export type Experience = {
  title: string;
  company: string;
  start: string;
  end: string;
  description: string;
};

export type Education = {
  degree: string;
  institution: string;
  end: string;
};

export type PersonalInfo = {
  name: string;
  email?: string;
  phone?: string;
  // ajoute d'autres champs si besoin
};

export type CvData = {
  personal: PersonalInfo;
  style: string;
  objective?: string; // optionnel
  experiences: Experience[];
  education: Education[];
  skills: string;
  languages: string;
};
