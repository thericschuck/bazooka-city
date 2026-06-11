export function formatPrice(amount: string, currencyCode: string): string {
  return new Intl.NumberFormat('de-DE', {
    style: 'currency',
    currency: currencyCode,
  }).format(parseFloat(amount));
}
