export type courseData = {
  title: string;

  img: string;
  data: data;
  pair?: boolean;
};

type data = {
  for: string;
  description: string;
  summary: string;
};

export default courseData;
