"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { CheckCircle2, XCircle } from 'lucide-react';
import { Patient } from '@/lib/types/patient';

interface PatientTableProps {
  patients: Patient[];
}

export function PatientTable({ patients }: PatientTableProps) {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Patient Name</TableHead>
            <TableHead>Personal Details</TableHead>
            <TableHead>Medical History</TableHead>
            <TableHead>Symptoms</TableHead>
            <TableHead>Medications</TableHead>
            <TableHead>Scheduling</TableHead>
            <TableHead>Consent</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {patients.map((patient) => (
            <TableRow key={patient.id}>
              <TableCell className="font-medium">{patient.name}</TableCell>
              <TableCell>{patient.step1Completed ? <CompletedIcon /> : <PendingIcon />}</TableCell>
              <TableCell>{patient.step2Completed ? <CompletedIcon /> : <PendingIcon />}</TableCell>
              <TableCell>{patient.step3Completed ? <CompletedIcon /> : <PendingIcon />}</TableCell>
              <TableCell>{patient.step4Completed ? <CompletedIcon /> : <PendingIcon />}</TableCell>
              <TableCell>{patient.step5Completed ? <CompletedIcon /> : <PendingIcon />}</TableCell>
              <TableCell>{patient.step6Completed ? <CompletedIcon /> : <PendingIcon />}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

function CompletedIcon() {
  return <CheckCircle2 className="h-5 w-5 text-green-500" />;
}

function PendingIcon() {
  return <XCircle className="h-5 w-5 text-gray-300" />;
}