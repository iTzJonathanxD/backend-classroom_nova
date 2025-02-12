import { Live } from "./live.interface";
import { User } from "./user.interface";

export interface Community {
    id: string;
    videoId: Live;
    alumnoId: User;
    comentario: string;
    fecha_creacion: Date;
  }