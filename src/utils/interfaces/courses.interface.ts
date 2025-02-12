import { Live } from "./live.interface";
import { User } from "./user.interface";

export interface Course {
    id: string;
    nombre: string;
    descripion: string;
    docenteId: User[];
    videos?: Live[];
  }