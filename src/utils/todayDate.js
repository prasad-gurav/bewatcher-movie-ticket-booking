const today = new Date();

// Extract day, month, and year
const day = String(today.getDate()).padStart(2, '0'); // Ensure 2-digit format
const month = String(today.getMonth() + 1).padStart(2, '0'); // Month starts from 0, so add 1
const year = today.getFullYear();


const todaysDate = `${day}:${month}:${year}`;

console.log(todaysDate); 
export default todaysDate;