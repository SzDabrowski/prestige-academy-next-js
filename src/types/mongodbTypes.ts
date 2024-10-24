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
