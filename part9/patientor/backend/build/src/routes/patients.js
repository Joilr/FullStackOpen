"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable @typescript-eslint/no-unsafe-call */
const express_1 = __importDefault(require("express"));
const patientsService_1 = __importDefault(require("../services/patientsService"));
const utils_1 = __importDefault(require("../utils"));
const router = express_1.default.Router();
router.get("/", (_req, res) => {
    res.send(patientsService_1.default.getPatients());
});
router.get("/:id", (req, res) => {
    const { id } = req.params; // Destructure the id from request parameters
    const patient = patientsService_1.default.getPatientById(id); // Assuming this method exists and returns the patient with the given ID or undefined if not found
    if (patient) {
        res.send(patient); // Send the found patient back as the response
    }
    else {
        res.status(404).send({ error: "Patient not found" }); // Send a 404 error if no patient was found with the given ID
    }
});
router.post("/", (_req, res) => {
    try {
        const newPatientsEntry = (0, utils_1.default)(_req.body);
        const addedPatient = patientsService_1.default.addPatient(newPatientsEntry);
        res.json(addedPatient);
    }
    catch (error) {
        let errorMessage = "Something went wrong.";
        if (error instanceof Error) {
            errorMessage += " Error: " + error.message;
        }
        res.status(400).send(errorMessage);
    }
});
exports.default = router;
