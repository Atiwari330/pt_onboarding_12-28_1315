export function Disclaimer() {
  return (
    <div className="rounded-lg bg-muted/50 p-4 text-sm space-y-2">
      <p className="font-medium">Important Information About Your Medications</p>
      <ul className="space-y-1 text-muted-foreground">
        <li>• Accurate medication information is crucial for your safety and care.</li>
        <li>• Monthly medication check-ins are conducted via secure telehealth.</li>
        <li>• Always consult your provider before adjusting any medication.</li>
        <li>• Your information is protected under HIPAA guidelines.</li>
      </ul>
    </div>
  );
}