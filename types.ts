
export enum NeedCategory {
  S117 = 'S117 After-care',
  CARE_ACT = 'Care Act (Non-s117)',
  PHYSICAL_HEALTH = 'Physical Health (NHS)',
}

export enum NeedDomain {
  ACCOMMODATION = 'Appropriate accommodation; Environmental adjustments; Domestic cleaning',
  OCCUPATION = 'Meaningful occupation; Education; Daytime activities; Employment; Accessing the community; Using public transport',
  PHYSICAL_HEALTH = 'Physical healthcare including breathing, skin, mobility, physical health medication',
  NUTRITION = 'Food and nutrition',
  PERSONAL_CARE = 'Personal care; Continence/toileting; Dressing and laundry',
  FINANCE = 'Assistance in welfare rights and managing finances',
  SOCIAL_CULTURAL = 'Social, cultural or spiritual needs',
  RELATIONSHIPS = 'Relationships; Loneliness; Isolation',
  PARENTING = 'Parenting and caring needs',
  COUNSELLING = 'Counselling and personal support',
  MENTAL_HEALTH = 'Continuing mental health care; Psychotropic medication',
  PSYCHOLOGICAL = 'Psychological and emotional needs; Cognition; Behaviour',
  CO_EXISTING = 'Co-existing needs (physical disability, sensory impairment, learning disability or autism)',
  RISK_SAFETY = 'Identified risks/safety issues',
  SUBSTANCE_MISUSE = 'Drug, alcohol & substance misuse',
  AGE_SPECIFIC = 'Age specific needs (children and young people / older adults)',
  CRISIS = 'Additional needs arising when in mental health crisis'
}

export type Severity = 'Low' | 'Medium' | 'High';

export interface PatientDetails {
  // Demographic
  name: string;
  address: string;
  dob: string;
  nhsNumber: string;
  socialCareId: string;
  lacStatus: string;
  firstLanguage: string;
  
  // Legal / MHA
  mhaSection: string; 
  isRestricted: boolean; 
  mojCaseWorker: string; 
  detentionStartDate: string; 
  conditionsOfDischarge: string; 
  diagnoses: string;
  s117Rights: string;
  legalFrameworks: string;
  isInitialPlan: boolean;
  isReviewPlan: boolean;
  
  // s.117 Evidence (Professional update)
  s117Limb2Evidence: string; 

  // DoL / Capacity / MCA
  dolSupervision: boolean; 
  dolFreeToLeave: boolean; 
  dolCapacity: boolean; 
  mcaAssessmentRationale: string; 
  bestInterestsRationale: string; 

  // Advocacy (Professional update)
  imhaReferralDone: boolean;
  imcaReferralDone: boolean;

  // Responsibility - Core
  responsibleLA: string;
  responsibleICB: string;
  responsibilityRationale: string;
  disputeStatus: 'None' | 'Active';

  // Professionals & Contacts
  nearestRelative: string; 
  familyMembers: string; 
  victimLiaisonOfficer: string; 
  advocateContact: string;
  consultantName: string;
  careCoordinator: string;
  socialWorkerName: string;
  gpContact: string;
  otherPros: string;

  // Plan Meta
  setting: string;
  currentArrangements: string;
  confidenceLevel: string;
  decisionConfidence: number;
  decisionConfidenceNotes: string;
  statutoryFunding: string;
  completedBy: string;
  designation: string;
  completionDate: string;
  version: string;
  isEnding: boolean;
  nextReviewDate: string;
  caseStatus: 'Draft' | 'In Review' | 'Finalised';
  
  // Legacy / Helper fields
  clinicianName: string; 
  
  // Comments
  personComments: string;
  familyComments: string;
  advocateComments: string;
  nextSteps: string;
}

export interface NeedItem {
  id: string;
  description: string;
  category: NeedCategory;
  domain: NeedDomain; 
  intervention: string;
  provider: string;
  severity: Severity;
  statutoryTestArises?: boolean; 
  statutoryTestReducesRisk?: boolean; 
}

export interface FundingSplit {
  totalScore: number;
  icbScore: number;
  laScore: number;
  icbPercentage: number;
  laPercentage: number;
  s117Score: number;
  careActScore: number;
  physicalHealthScore: number;
}
