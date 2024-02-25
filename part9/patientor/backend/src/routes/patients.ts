/* eslint-disable @typescript-eslint/no-unsafe-call */
import express from "express";
import patientsService from "../services/patientsService";
import toNewPatientsEntry from "../utils";

const router = express.Router();

router.get("/", (_req, res) => {
  res.send(patientsService.getPatients());
});

router.post("/", (_req, res) => {
  try {
    const newPatientsEntry = toNewPatientsEntry(_req.body);
    const addedPatient = patientsService.addPatient(newPatientsEntry);
    res.json(addedPatient);
  } catch (error: unknown) {
    let errorMessage = "Something went wrong.";
    if (error instanceof Error) {
      errorMessage += " Error: " + error.message;
    }
    res.status(400).send(errorMessage);
  }
});

export default router;
