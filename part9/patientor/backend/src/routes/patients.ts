/* eslint-disable @typescript-eslint/no-unsafe-call */
import express from "express";
import patientsService from "../services/patientsService";

const router = express.Router();

router.get("/", (_req, res) => {
  res.send(patientsService.getPatients());
});

router.post("/", (_req, res) => {
  /* eslint-disable @typescript-eslint/no-unsafe-assignment */
  const { name, ssn, dateOfBirth, occupation, gender } = _req.body;

  const addedPatient = patientsService.addPatient({
    name,
    ssn,
    dateOfBirth,
    occupation,
    gender,
  });
  res.json(addedPatient);
});

export default router;
