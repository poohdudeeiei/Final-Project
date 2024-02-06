export default interface CourseType {
  courseId?: string | null;
  courseImage: File | string | null;
  courseName: string | null;
  trainingPeriod: string | null;
  numDaysPerWeek: string | null;
  trainingTime: string | null;
  purpose: string[] | null;
  description: string;
  receiving: number | null;
  isAvailable?: boolean | null;
  numberOfEnroll?: number | null;
}
