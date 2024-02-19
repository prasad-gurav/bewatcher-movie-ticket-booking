// Get today's date
const today = new Date();

// Get the date 15 days ago
const fifteenDaysAgo = new Date();
fifteenDaysAgo.setDate(fifteenDaysAgo.getDate() - 15);

// Format the dates as YYYY-MM-DD
export const todayFormatted = formatDate(today);
export const fifteenDaysAgoFormatted = formatDate(fifteenDaysAgo);

console.log("Today's date:", todayFormatted);
console.log("Date 15 days ago:", fifteenDaysAgoFormatted);

function formatDate(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}
