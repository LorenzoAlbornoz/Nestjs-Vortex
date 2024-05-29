export class PracticeDTO {
  id: number;
  type: string;
  data: {
    fecha: Date;
    notasMedico: string;
    complicaciones: string;
    resultadoFinal: string;
    duracionDelProcedimiento: string;
  };
  doctor: {
    id: number;
    numeroDeMatricula: number;
    firstname: string;
    lastname: string;
    specialty: string;
    fechaDeIngreso: Date;
  };
  patient: {
    id: number;
    dni: number;
    firstname: string;
    lastname: string;
    fechaDeNacimiento: Date;
    obraSocial: string;
    createdAt: Date;
    deletedAt: Date | null;
  };
}
