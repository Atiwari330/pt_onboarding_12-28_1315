export function PaymentDisclaimer() {
  return (
    <div className="rounded-lg bg-muted/50 p-4 text-sm space-y-2">
      <p className="font-medium">Secure Payment Processing</p>
      <ul className="space-y-1 text-muted-foreground">
        <li>• Your payment information is encrypted and securely stored</li>
        <li>• We only charge your card when services are rendered</li>
        <li>• You will be notified before any charges are processed</li>
        <li>• You can update your payment method at any time</li>
      </ul>
    </div>
  );
}