"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable @typescript-eslint/no-unsafe-call */
const express_1 = __importDefault(require("express"));
const patientsService_1 = __importDefault(require("../services/patientsService"));
const router = express_1.default.Router();
router.get("/", (_req, res) => {
    res.send(patientsService_1.default.getPatients());
});
router.post("/", (_req, res) => {
    /* eslint-disable @typescript-eslint/no-unsafe-assignment */
    const { name, ssn, dateOfBirth, occupation, gender } = _req.body;
    const addedPatient = patientsService_1.default.addPatient({
        name,
        ssn,
        dateOfBirth,
        occupation,
        gender,
    });
    res.json(addedPatient);
});
exports.default = router;
