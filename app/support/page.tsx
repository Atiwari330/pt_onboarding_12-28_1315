"use client";

import { Button } from '@/components/ui/button';
import { ContactForm } from '@/components/support/ContactForm';
import { ArrowLeft, Phone } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function SupportPage() {
  const router = useRouter();

  return (
    <main className="min-h-screen bg-background py-12 px-4">
      <div className="container max-w-2xl mx-auto space-y-8">
        <Button
          variant="ghost"
          onClick={() => router.back()}
          className="flex items-center gap-2 mb-8"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Onboarding
        </Button>

        <div className="space-y-6">
          <div className="space-y-2">
            <h1 className="text-3xl font-semibold tracking-tight">
              We're Here to Help
            </h1>
            <p className="text-muted-foreground">
              Having trouble with the onboarding process? We're here to assist you.
            </p>
          </div>

          <div className="flex items-center gap-2 text-muted-foreground">
            <Phone className="h-4 w-4" />
            <span>Call us at 1-800-123-4567</span>
          </div>

          <div className="bg-card p-6 rounded-lg shadow-sm">
            <ContactForm />
          </div>
        </div>
      </div>
    </main>
  );
}