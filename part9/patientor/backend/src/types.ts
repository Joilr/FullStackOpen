export interface DiagnosesEntry {
  code: string;
  name: string;
  latin?: string;
}

export interface PatientsEntry {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn: string;
  gender: string;
  occupation: string;
}

export type PatientsEntryWithoutSSN = Omit<PatientsEntry, "ssn">;
export type NewPatientsEntry = Omit<PatientsEntry, "id">;
