import { Course } from "./courses.interface";

export interface CategoryCourse {
    nombre: string;
    description: string;
    imagen_referencia: string;
    cursosId: Course[];
  }