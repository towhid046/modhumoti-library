export function formatDateAndTimeByTimestamp(timestamp: number): string {
  // Convert timestamp to Date object
  const date = new Date(timestamp);

  // Convert UTC time to Bangladesh time by adding 6 hours
  const bangladeshTime = new Date(date.getTime() + 6 * 60 * 60 * 1000);

  const options: Intl.DateTimeFormatOptions = { hour: "numeric", minute: "2-digit", hour12: true };

  // Get current Bangladesh date
  const now = new Date();
  const bangladeshNow = new Date(now.getTime() + 6 * 60 * 60 * 1000);

  // Create "today" and "yesterday" dates without time for comparison
  const today = new Date(bangladeshNow);
  today.setHours(0, 0, 0, 0);

  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);

  if (bangladeshTime >= today) {
    return `Today, ${bangladeshTime.toLocaleTimeString("en-US", options)}`;
  } else if (bangladeshTime >= yesterday) {
    return `Yesterday, ${bangladeshTime.toLocaleTimeString("en-US", options)}`;
  } else {
    return `${bangladeshTime.toLocaleDateString("en-US", { day: "2-digit", month: "short" })}, ${bangladeshTime.toLocaleTimeString("en-US", options)}`;
  }
}
