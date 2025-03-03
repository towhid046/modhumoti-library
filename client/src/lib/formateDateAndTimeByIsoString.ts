export function formateDateAndTimeByIsoString(isoString: string): string {
    const date = new Date(isoString);
    const options: Intl.DateTimeFormatOptions = { hour: "numeric", minute: "2-digit", hour12: true };
  
    // Convert to Bangladesh time zone (UTC+6)
    const bangladeshTime = new Date(date.toLocaleString("en-US", { timeZone: "Asia/Dhaka" }));
  
    const now = new Date(new Date().toLocaleString("en-US", { timeZone: "Asia/Dhaka" }));
  
    // Remove time from both dates for comparison
    const today = new Date(now);
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
  
  