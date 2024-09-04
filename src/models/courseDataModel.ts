import mongoose, { Schema, Document } from "mongoose";

// Description Interface
interface IDescription {
  p1?: string;
  p2?: string;
  p3?: string;
  p4?: string;
}

// Data Interface
interface IData {
  for: string;
  description: string | IDescription; // can be string or object
  summary: string;
  timeInfo?: string | IDescription; // can be string or object
  recruitment: boolean;
  price?: string;
  location?: string;
  firstEvent?: string;
}

// Course Interface
interface ICourse extends Document {
  title: string;
  img: string;
  data: IData;
  pair?: boolean;
}

// Description Schema
const DescriptionSchema = new Schema<IDescription>({
  p1: { type: String },
  p2: { type: String },
  p3: { type: String },
  p4: { type: String },
});

// Data Schema
const DataSchema = new Schema<IData>({
  for: { type: String, required: true },
  description: {
    type: Schema.Types.Mixed, // Can either be a string or an object (referring to DescriptionSchema)
    required: true,
  },
  summary: { type: String, required: true },
  timeInfo: {
    type: Schema.Types.Mixed, // Can either be a string or an object (referring to DescriptionSchema)
  },
  recruitment: { type: Boolean, required: true },
  price: { type: String },
  location: { type: String },
  firstEvent: { type: String },
});

// Course Schema
const CourseSchema = new Schema<ICourse>({
  title: { type: String, required: true },
  img: { type: String, required: true },
  data: {
    type: DataSchema,
    required: true,
  },
  pair: { type: Boolean },
});

// Exporting the Models
const DescriptionModel =
  mongoose.models.Description ||
  mongoose.model<IDescription>("Description", DescriptionSchema);
const DataModel =
  mongoose.models.Data || mongoose.model<IData>("Data", DataSchema);
const CourseModel =
  mongoose.models.Course || mongoose.model<ICourse>("Course", CourseSchema);

export { DescriptionModel, DataModel, CourseModel };
export type { ICourse, IData, IDescription };
