import patientsData from "../../data/patients";

import { PatientsEntryWithoutSSN } from "../types";

const patients: PatientsEntryWithoutSSN[] = patientsData.map(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  ({ ssn, ...rest }) => rest
);

const getPatients = (): PatientsEntryWithoutSSN[] => {
  return patients;
};

export default {
  getPatients,
};
