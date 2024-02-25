"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const types_1 = require("./types");
const isString = (text) => {
    return typeof text === "string" || text instanceof String;
};
const parseValue = (value) => {
    if (!value || !isString(value)) {
        throw new Error("Incorrect or missing string");
    }
    return value;
};
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isGender = (param) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    return Object.values(types_1.Gender).includes(param);
};
const parseGender = (gender) => {
    if (!gender || !isGender(gender)) {
        throw new Error(`Incorrect or missing gender: ${gender}`);
    }
    return gender;
};
const toNewPatientsEntry = (object) => {
    if (!object || typeof object !== "object") {
        throw new Error("Incorrect or missing data");
    }
    if ("name" in object &&
        "ssn" in object &&
        "dateOfBirth" in object &&
        "occupation" in object &&
        "gender" in object) {
        const newEntry = {
            name: parseValue(object.name),
            ssn: parseValue(object.ssn),
            dateOfBirth: parseValue(object.dateOfBirth),
            occupation: parseValue(object.occupation),
            gender: parseGender(object.gender),
        };
        return newEntry;
    }
    throw new Error("Incorrect data: some fields are missing");
};
exports.default = toNewPatientsEntry;
