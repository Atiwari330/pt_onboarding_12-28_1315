"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { ConsentAgreements, ConsentAgreementsErrors } from '@/lib/types/consent-agreements';

interface ConsentSectionProps {
  formData: ConsentAgreements;
  onChange: (data: ConsentAgreements) => void;
  errors?: ConsentAgreementsErrors;
}

export function ConsentSection({
  formData,
  onChange,
  errors,
}: ConsentSectionProps) {
  const handleCheckboxChange = (field: keyof ConsentAgreements) => {
    onChange({ ...formData, [field]: !formData[field] });
  };

  return (
    <div className="space-y-6">
      <Accordion type="single" collapsible className="w-full space-y-4">
        <AccordionItem value="hipaa">
          <AccordionTrigger className="text-left">
            HIPAA Privacy Notice
          </AccordionTrigger>
          <AccordionContent className="text-sm text-muted-foreground space-y-4">
            <p>
              This notice describes how medical information about you may be used
              and disclosed and how you can get access to this information.
            </p>
            <p>
              Your health information is private and protected by law. We only
              release your health information with your authorization or as
              permitted by law.
            </p>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="telehealth">
          <AccordionTrigger className="text-left">
            Telehealth Consent
          </AccordionTrigger>
          <AccordionContent className="text-sm text-muted-foreground space-y-4">
            <p>
              By using our telehealth services, you understand and agree that:
            </p>
            <ul className="list-disc pl-4 space-y-2">
              <li>You may be treated via telehealth technology</li>
              <li>All laws and professional standards that apply to in-person healthcare also apply to telehealth</li>
              <li>There are both benefits and risks to telehealth that differ from in-person sessions</li>
            </ul>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="privacy">
          <AccordionTrigger className="text-left">
            Privacy Policy
          </AccordionTrigger>
          <AccordionContent className="text-sm text-muted-foreground space-y-4">
            <p>
              We take your privacy seriously. This policy outlines:
            </p>
            <ul className="list-disc pl-4 space-y-2">
              <li>What personal information we collect</li>
              <li>How we use your information</li>
              <li>How we protect your data</li>
              <li>Your rights regarding your personal information</li>
            </ul>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="terms">
          <AccordionTrigger className="text-left">
            Terms of Service
          </AccordionTrigger>
          <AccordionContent className="text-sm text-muted-foreground space-y-4">
            <p>
              These terms govern your use of our services. Key points include:
            </p>
            <ul className="list-disc pl-4 space-y-2">
              <li>Service description and limitations</li>
              <li>Your responsibilities as a client</li>
              <li>Payment terms and cancellation policies</li>
              <li>Liability limitations and disclaimers</li>
            </ul>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <div className="space-y-4 pt-4">
        <div className="flex items-center space-x-2">
          <Checkbox
            id="hipaa"
            checked={formData.hipaaConsent}
            onCheckedChange={() => handleCheckboxChange('hipaaConsent')}
          />
          <Label htmlFor="hipaa" className="font-normal">
            I have read and understand the HIPAA Privacy Notice
          </Label>
        </div>
        {errors?.hipaaConsent && (
          <p className="text-sm text-destructive">{errors.hipaaConsent}</p>
        )}

        <div className="flex items-center space-x-2">
          <Checkbox
            id="telehealth"
            checked={formData.telehealthConsent}
            onCheckedChange={() => handleCheckboxChange('telehealthConsent')}
          />
          <Label htmlFor="telehealth" className="font-normal">
            I consent to receive telehealth services
          </Label>
        </div>
        {errors?.telehealthConsent && (
          <p className="text-sm text-destructive">{errors.telehealthConsent}</p>
        )}

        <div className="flex items-center space-x-2">
          <Checkbox
            id="privacy"
            checked={formData.privacyPolicy}
            onCheckedChange={() => handleCheckboxChange('privacyPolicy')}
          />
          <Label htmlFor="privacy" className="font-normal">
            I accept the Privacy Policy
          </Label>
        </div>
        {errors?.privacyPolicy && (
          <p className="text-sm text-destructive">{errors.privacyPolicy}</p>
        )}

        <div className="flex items-center space-x-2">
          <Checkbox
            id="terms"
            checked={formData.termsOfService}
            onCheckedChange={() => handleCheckboxChange('termsOfService')}
          />
          <Label htmlFor="terms" className="font-normal">
            I agree to the Terms of Service
          </Label>
        </div>
        {errors?.termsOfService && (
          <p className="text-sm text-destructive">{errors.termsOfService}</p>
        )}
      </div>
    </div>
  );
}