import patientsData from "../../data/patients";
import { v4 as uuidv4 } from "uuid";

import {
  PatientsEntry,
  PatientsEntryWithoutSSN,
  NewPatientsEntry,
} from "../types";

const addPatient = (entry: NewPatientsEntry): PatientsEntry => {
  const newPatientsEntry = {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
    id: uuidv4(),
    ...entry,
  };

  patients.push(newPatientsEntry);
  return newPatientsEntry;
};

// Store full PatientsEntry objects, including SSN and entries
const patients: PatientsEntry[] = patientsData.map((patient) => ({
  ...patient,
  entries: [], // Add an empty array for 'entries'
}));

const getPatients = (): PatientsEntryWithoutSSN[] => {
  return patients.map(({ ssn: _ssn, entries: _entries, ...rest }) => rest);
};

const getPatientById = (id: string): PatientsEntry | undefined => {
  return patients.find((patient) => patient.id === id);
};

export default {
  getPatients,
  addPatient,
  getPatientById,
};
