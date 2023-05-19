import { Department } from "./department";
import { Vehicle } from "./vehicle";

export interface Employee {
  id?: number;
  name: string;
  cccd: string;
  email?: string | null;
  chuc_vu?: string | null;
  username?: string | null;
  nameDepartment?: string;
  department?: number;
  listVehicle: Vehicle[];
}
