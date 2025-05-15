export function formatNumber(value: number, options?: Intl.NumberFormatOptions): string {
  return new Intl.NumberFormat("hu-HU", options).format(value)
}

export function formatPercentage(value: number, fractionDigits = 0): string {
  return formatNumber(value, {
    style: "percent",
    minimumFractionDigits: fractionDigits,
    maximumFractionDigits: fractionDigits,
  })
}

export function formatCurrency(value: number, currency = "HUF"): string {
  return formatNumber(value, {
    style: "currency",
    currency,
  })
}

export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text
  return text.slice(0, maxLength) + "..."
}

export function pluralize(count: number, singular: string, plural: string): string {
  return count === 1 ? singular : plural
}
