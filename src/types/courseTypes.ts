export type courseData = {
  title: string;
  img: string;
  data: data;
  pair?: boolean;
};

type data = {
  for: string;
  description: string | descriptionObject;
  summary: string;
  timeInfo?: string | descriptionObject;
  recruitment: boolean;
  price?: string;
  location?: string;
  firstEvent?: string;
};

type descriptionObject = {
  p1?: string;
  p2?: string;
  p3?: string;
  p4?: string;
};

export default courseData;
