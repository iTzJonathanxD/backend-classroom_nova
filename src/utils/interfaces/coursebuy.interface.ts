import { User } from "./user.interface";

export interface CourseBuy {
    id: string;
    fecha_adquisicion: string;
    renovacion: string;
    referidosId: User[];
  }