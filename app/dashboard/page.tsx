"use client";

import { DashboardHeader } from '@/components/dashboard/DashboardHeader';
import { PatientTable } from '@/components/dashboard/PatientTable';
import { mockPatients } from '@/lib/data/mock-patients';

export default function DashboardPage() {
  return (
    <main className="min-h-screen bg-background">
      <DashboardHeader />
      <div className="container py-8">
        <div className="space-y-8">
          <div className="space-y-2">
            <h1 className="text-3xl font-semibold tracking-tight">Provider Dashboard</h1>
            <p className="text-muted-foreground">
              Monitor patient onboarding progress and status.
            </p>
          </div>
          <PatientTable patients={mockPatients} />
        </div>
      </div>
    </main>
  );
}