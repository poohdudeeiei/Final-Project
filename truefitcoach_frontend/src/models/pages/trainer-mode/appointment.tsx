export type CustomerProps = {
  customerId: string;
  customer_name: string;
  course_name: string;
  trained: number;
};

export interface AssignedCustomerType extends CustomerProps {
  event_id: string;
  title: string;
  start: Date;
  end: Date;
  description: string;
  assign: string | any;
}
