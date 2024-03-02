"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const patients_1 = __importDefault(require("../../data/patients"));
const uuid_1 = require("uuid");
const addPatient = (entry) => {
    const newPatientsEntry = Object.assign({ 
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
        id: (0, uuid_1.v4)() }, entry);
    patients.push(newPatientsEntry);
    return newPatientsEntry;
};
// Store full PatientsEntry objects, including SSN and entries
const patients = patients_1.default.map((patient) => (Object.assign(Object.assign({}, patient), { entries: [] })));
const getPatients = () => {
    return patients.map((_a) => {
        var { ssn: _ssn, entries: _entries } = _a, rest = __rest(_a, ["ssn", "entries"]);
        return rest;
    });
};
const getPatientById = (id) => {
    return patients.find((patient) => patient.id === id);
};
exports.default = {
    getPatients,
    addPatient,
    getPatientById,
};
