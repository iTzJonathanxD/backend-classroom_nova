import { User } from "./user.interface";

export interface Payments {
    id: string;
    alumnoId: User;
    monto: number;
    razon: string;
    fecha_pago: Date;
    fecha_expiracion: Date;
    estado: "Pendiente" | "Aprobado" | "Rechazado";
  }