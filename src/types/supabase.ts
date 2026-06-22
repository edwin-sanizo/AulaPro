export interface Asignacion {
  id: string;
  v2_courses: {
    id: string;
    level: string;
    parallel: string;
  };
  v2_subjects: {
    name: string;
  };
}