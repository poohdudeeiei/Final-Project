import DayType from "./DayType";

export default interface AppointmentType {
  TrainerName: string;
  AppointmentName: string;
  Description: string;
  Days: DayType[];
}
