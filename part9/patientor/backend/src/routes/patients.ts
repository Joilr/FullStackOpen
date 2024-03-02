/* eslint-disable @typescript-eslint/no-unsafe-call */
import express from "express";
import patientsService from "../services/patientsService";
import toNewPatientsEntry from "../utils";

const router = express.Router();

router.get("/", (_req, res) => {
  res.send(patientsService.getPatients());
});

router.get("/:id", (req, res) => {
  const { id } = req.params; // Destructure the id from request parameters
  const patient = patientsService.getPatientById(id); // Assuming this method exists and returns the patient with the given ID or undefined if not found

  if (patient) {
    res.send(patient); // Send the found patient back as the response
  } else {
    res.status(404).send({ error: "Patient not found" }); // Send a 404 error if no patient was found with the given ID
  }
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
