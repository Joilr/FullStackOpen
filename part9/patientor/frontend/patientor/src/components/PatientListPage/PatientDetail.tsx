import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import patientService from "../../services/patients";
import {
  Patient,
  Diagnosis,
  Entry,
  HospitalEntry,
  OccupationalHealthcareEntry,
  HealthCheckEntry,
} from "../../types";

interface PatientDetailProps {
  diagnoses: Diagnosis[];
}

const HospitalEntryComponent: React.FC<{ entry: HospitalEntry }> = ({
  entry,
}) => (
  <div>
    <p>
      Hospital Admission: {entry.discharge.date}, Criteria:{" "}
      {entry.discharge.criteria}
    </p>
  </div>
);

const OccupationalHealthcareEntryComponent: React.FC<{
  entry: OccupationalHealthcareEntry;
}> = ({ entry }) => (
  <div>
    <p>Employer: {entry.employerName}</p>
    {entry.sickLeave && (
      <p>
        Sick Leave: {entry.sickLeave.startDate} to {entry.sickLeave.endDate}
      </p>
    )}
  </div>
);

const HealthCheckEntryComponent: React.FC<{ entry: HealthCheckEntry }> = ({
  entry,
}) => (
  <div>
    <p>Health Check Rating: {entry.healthCheckRating}</p>
  </div>
);

const EntryDetails: React.FC<{ entry: Entry; diagnoses: Diagnosis[] }> = ({
  entry,
}) => {
  switch (entry.type) {
    case "Hospital":
      return <HospitalEntryComponent entry={entry} />;
    case "OccupationalHealthcare":
      return <OccupationalHealthcareEntryComponent entry={entry} />;
    case "HealthCheck":
      return <HealthCheckEntryComponent entry={entry} />;
    default:
      return assertNever(entry);
  }
};

// Utility function for exhaustive checking
function assertNever(x: never): never {
  throw new Error("Unhandled case: " + JSON.stringify(x));
}

const PatientDetail: React.FC<PatientDetailProps> = ({ diagnoses }) => {
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

    fetchPatient();
  }, [patientId]);

  if (!patient) {
    return <div>Loading patient data...</div>;
  }

  return (
    <div>
      <h2>{patient.name}</h2>
      <p>Date of Birth: {patient.dateOfBirth}</p>
      <p>Gender: {patient.gender}</p>
      <p>Occupation: {patient.occupation}</p>
      <p>SSN: {patient.ssn}</p>
      <h3>Entries</h3>
      <ul>
        {patient.entries.map((entry) => (
          <li key={entry.id}>
            <p>
              {entry.date}: {entry.description}
            </p>
            <p>Diagnosed by {entry.specialist}</p>
            {entry.diagnosisCodes && (
              <ul>
                {entry.diagnosisCodes.map((code) => (
                  <li key={code}>
                    {code} - {diagnoses.find((d) => d.code === code)?.name}
                  </li>
                ))}
              </ul>
            )}
            <EntryDetails entry={entry} diagnoses={diagnoses} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PatientDetail;
