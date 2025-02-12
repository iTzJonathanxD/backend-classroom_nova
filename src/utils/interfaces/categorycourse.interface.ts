import { Course } from "./courses.interface";

export interface CategoryCourse {
    id: string;
    nombre: string;
    description: string;
    imagen_referencia: string;
    cursosId: Course[];
  }