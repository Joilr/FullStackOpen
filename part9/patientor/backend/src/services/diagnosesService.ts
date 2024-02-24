import diagnosesData from "../../data/diagnoses";

import { DiagnosesEntry } from "../types";

const diagnoses: DiagnosesEntry[] = diagnosesData;

const getDiagnoses = (): DiagnosesEntry[] => {
  return diagnoses;
};

export default {
  getDiagnoses,
};
