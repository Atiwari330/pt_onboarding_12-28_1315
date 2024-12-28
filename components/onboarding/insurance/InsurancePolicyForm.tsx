"use client";

import { FormField } from '../FormField';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { InsurancePolicy, RelationshipType } from '@/lib/types/insurance-billing';

interface InsurancePolicyFormProps {
  policy: InsurancePolicy;
  onChange: (policy: InsurancePolicy) => void;
  errors?: {
    carrier?: string;
    policyNumber?: string;
    groupNumber?: string;
    policyHolder?: {
      name?: string;
      dateOfBirth?: string;
      relationship?: string;
    };
  };
  title: string;
}

export function InsurancePolicyForm({
  policy,
  onChange,
  errors,
  title,
}: InsurancePolicyFormProps) {
  const updateField = (field: keyof InsurancePolicy | 'holderName' | 'holderDOB' | 'holderRelationship', value: string) => {
    const updatedPolicy = { ...policy };
    
    if (field === 'holderName') {
      updatedPolicy.policyHolder.name = value;
    } else if (field === 'holderDOB') {
      updatedPolicy.policyHolder.dateOfBirth = value;
    } else if (field === 'holderRelationship') {
      updatedPolicy.policyHolder.relationship = value as RelationshipType;
    } else {
      updatedPolicy[field] = value;
    }
    
    onChange(updatedPolicy);
  };

  return (
    <div className="space-y-6">
      <h3 className="font-medium text-lg">{title}</h3>
      
      <div className="space-y-4">
        <FormField
          label="Insurance Carrier"
          value={policy.carrier}
          onChange={(value) => updateField('carrier', value)}
          error={errors?.carrier}
          required
        />

        <div className="grid sm:grid-cols-2 gap-4">
          <FormField
            label="Policy Number"
            value={policy.policyNumber}
            onChange={(value) => updateField('policyNumber', value)}
            error={errors?.policyNumber}
            required
          />

          <FormField
            label="Group Number"
            value={policy.groupNumber}
            onChange={(value) => updateField('groupNumber', value)}
            error={errors?.groupNumber}
            required
          />
        </div>

        <div className="space-y-4">
          <h4 className="font-medium">Policy Holder Information</h4>
          
          <FormField
            label="Full Name"
            value={policy.policyHolder.name}
            onChange={(value) => updateField('holderName', value)}
            error={errors?.policyHolder?.name}
            required
          />

          <div className="grid sm:grid-cols-2 gap-4">
            <FormField
              label="Date of Birth"
              type="date"
              value={policy.policyHolder.dateOfBirth}
              onChange={(value) => updateField('holderDOB', value)}
              error={errors?.policyHolder?.dateOfBirth}
              required
            />

            <div className="space-y-2">
              <Label>Relationship to Patient</Label>
              <Select
                value={policy.policyHolder.relationship}
                onValueChange={(value) => updateField('holderRelationship', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select relationship" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="self">Self</SelectItem>
                  <SelectItem value="spouse">Spouse</SelectItem>
                  <SelectItem value="child">Child</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
              {errors?.policyHolder?.relationship && (
                <p className="text-sm text-destructive">
                  {errors.policyHolder.relationship}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}