export interface Patient {
  id: number;
  dni: number;
  firstname: string;
  lastname: string;
  fechaDeNacimiento: Date;
  obraSocial: string;
  createdAt: Date;
  deletedAt: Date | null;
}

export interface EntryData {
  fecha: Date;
  notasMedico: string;
  complicaciones?: string;
  resultadoFinal?: string;
  duracionDelProcedimiento?: string;
  diagnostico?: string;
  motivoDeConsulta?: string;
  confimacionDeDiagnostico?: string;
  disease?: {
    id: number;
    enfermedad: string;
  };
}

export interface Entry {
  id: number;
  type: 'practice' | 'consultation';
  data: EntryData;
}

export interface PatientHistory {
  id: number;
  createdAt: Date;
  patient: Patient;
  entries: Entry[];
}
