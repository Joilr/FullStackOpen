import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import patientService from "../../services/patients";
import { Patient } from "../../types";

const PatientDetail = () => {
  const { patientId } = useParams<{ patientId: string }>();

  const [patient, setPatient] = useState<Patient | null>(null);

  useEffect(() => {
    const fetchPatient = async () => {
      if (patientId) {
        try {
          const fetchedPatient = await patientService.getPatient(patientId);
          setPatient(fetchedPatient);
        } catch (error) {
          console.error("Failed to fetch patient", error);
        }
      }
    };

    void fetchPatient();
  }, [patientId]);

  if (!patient) {
    return <div>Loading patient data...</div>;
  }

  return (
    <div>
      <div>{patient.name}</div>
      <div>{patient.dateOfBirth}</div>
      <div>{patient.gender}</div>
      <div>Occupation: {patient.occupation}</div>
      <div>SSN: {patient.ssn}</div>
    </div>
  );
};

export default PatientDetail;
