"use client";

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface SignatureConfirmationProps {
  value: string;
  onChange: (value: string) => void;
  error?: string;
}

export function SignatureConfirmation({
  value,
  onChange,
  error,
}: SignatureConfirmationProps) {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="signature">
          Please type your full name to sign
        </Label>
        <Input
          id="signature"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Your full name"
          className={error ? 'border-destructive' : ''}
        />
        {error && (
          <p className="text-sm text-destructive">{error}</p>
        )}
      </div>
      <p className="text-sm text-muted-foreground">
        By typing your name above, you acknowledge that this serves as your electronic
        signature and agreement to all terms and conditions presented.
      </p>
    </div>
  );
}