const express = require('express');
const app = express();
const PORT = 3000;

// Custom middleware to verify the time of the request
const workingHoursMiddleware = (req, res, next) => {
  const now = new Date();
  const day = now.getDay();
  const hour = now.getHours();

  if (isWorkingHours(day, hour)) {
    next();
  } else {
    res.send('The web application is only available during working hours (Monday to Friday, from 9 to 17).');
  }
};

// Applying the custom middleware to all routes
app.use(workingHoursMiddleware);

// Serve static files
app.use(express.static('public'));

// Define routes for each page
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/home.html');
});

app.get('/our-services', (req, res) => {
  res.sendFile(__dirname + '/views/our-services.html');
});

app.get('/contact-us', (req, res) => {
  res.sendFile(__dirname + '/views/contact-us.html');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

// Helper function to check if it's working hours
function isWorkingHours(day, hour) {
  const isWeekday = day >= 1 && day <= 5;
  const isWorkingHour = hour > 9 && hour < 17;
  return isWeekday && isWorkingHour;
}
