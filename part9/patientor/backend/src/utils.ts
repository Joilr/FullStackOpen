import { NewPatientsEntry, Gender, Entry } from "./types";

const isString = (text: unknown): text is string => {
  return typeof text === "string" || text instanceof String;
};

const parseValue = (value: unknown): string => {
  if (!value || !isString(value)) {
    throw new Error("Incorrect or missing string");
  }

  return value;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isGender = (param: any): param is Gender => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  return Object.values(Gender).includes(param);
};

const parseEntries = (entries: unknown): Entry[] => {
  if (!entries || !Array.isArray(entries)) {
    throw new Error("Incorrect or missing entries");
  }

  return entries as Entry[];
};

const parseGender = (gender: unknown): Gender => {
  if (!gender || !isGender(gender)) {
    throw new Error(`Incorrect or missing gender: ${gender}`);
  }
  return gender;
};

const toNewPatientsEntry = (object: unknown): NewPatientsEntry => {
  if (!object || typeof object !== "object") {
    throw new Error("Incorrect or missing data");
  }

  if (
    "name" in object &&
    "ssn" in object &&
    "dateOfBirth" in object &&
    "occupation" in object &&
    "gender" in object &&
    "entries" in object
  ) {
    const newEntry: NewPatientsEntry = {
      name: parseValue(object.name),
      ssn: parseValue(object.ssn),
      dateOfBirth: parseValue(object.dateOfBirth),
      occupation: parseValue(object.occupation),
      gender: parseGender(object.gender),
      entries: parseEntries(object.entries),
    };

    return newEntry;
  }

  throw new Error("Incorrect data: some fields are missing");
};

export default toNewPatientsEntry;
