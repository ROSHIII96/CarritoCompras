// HOISTING Las declaraciones de función se elevan al inicio del
// scope. formatCurrency() se usa en línea 8 pero se declara en
// línea 12 — funciona porque JS la "hoist" antes de ejecutar.

const _test = formatCurrency(0) // llamada antes de la declaración
void _test

// HOISTING Declaración de función — JS la eleva completa al scope
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('es-CR', {
    style: 'currency',
    currency: 'CRC',
    maximumFractionDigits: 0,
  }).format(amount)
}
