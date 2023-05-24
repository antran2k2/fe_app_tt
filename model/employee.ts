import { Department } from "./department";
import { Vehicle } from "./vehicle";

export interface Employee {
  id?: number;
  name: string;
  cccd: string;
  dob?: string;
  email?: string | null;
  chucVu?: string | null;
  username?: string | null;
  nameDepartment?: string;
  department?: any;
  listVehicle: Vehicle[];
}
