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

const patients: PatientsEntryWithoutSSN[] = patientsData.map(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  ({ ssn, ...rest }) => rest
);

const getPatients = (): PatientsEntryWithoutSSN[] => {
  return patients;
};

export default {
  getPatients,
  addPatient,
};
