import { Live } from "./live.interface";
import { User } from "./user.interface";

export interface Community {
    videoId: Live;
    alumnoId: User;
    comentario: string;
    fecha_creacion: Date;
  }