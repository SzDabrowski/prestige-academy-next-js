export type CourseClientType = {
  courseName: string;
  name: string;
  pairName?: string | null;
  email: string;
  phone: string;
};

export type PreschoolClientType = {
  preschoolName: string;
  groupName?: string | null;
  studentName: string;
  parentName: string;
  email: string;
  phone: string;
};

export type ContactClientType = {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
};

export type EventClientType = {
  id?: number;
  schoolName: string;
  groupName?: string | null;
  childName: string;
  phone: string;
  consentParticipation: boolean;
  consentDataProcessing: boolean;
  subject?: string | null;
  createdAt?: string | Date;
};
