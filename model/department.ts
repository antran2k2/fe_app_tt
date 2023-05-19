import { Employee } from "./employee";

export interface Department {
  id?: number;
  name: string;
  vi_tri: string;
  listEmployee?: Employee[] | null;
}
