export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat("hu-HU", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(date)
}

export function formatTime(date: Date): string {
  return new Intl.DateTimeFormat("hu-HU", {
    hour: "2-digit",
    minute: "2-digit",
  }).format(date)
}

export function formatDateRange(startDate: Date, endDate: Date): string {
  const start = formatDate(startDate)
  const end = formatDate(endDate)
  return `${start} - ${end}`
}

export function getRelativeDateLabel(date: Date): string {
  const now = new Date()
  const diffTime = Math.abs(date.getTime() - now.getTime())
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

  if (diffDays === 0) {
    return "Ma"
  } else if (diffDays === 1) {
    return date > now ? "Holnap" : "Tegnap"
  } else if (diffDays < 7) {
    return date > now ? `${diffDays} nap múlva` : `${diffDays} napja`
  } else if (diffDays < 30) {
    const weeks = Math.floor(diffDays / 7)
    return date > now ? `${weeks} hét múlva` : `${weeks} hete`
  } else {
    return formatDate(date)
  }
}
