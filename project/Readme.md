🌤️ Dynamic Weather App

📌 Overview

The Dynamic Weather App allows users to get real-time weather information for any city using the OpenWeather API.
It is built using HTML, CSS, and JavaScript and demonstrates fetching API data and dynamically updating the UI.

🚀 Features

🌍 Search for weather in any city

🌡️ Displays temperature, humidity, wind speed, and weather description

☁️ Dynamic weather icon based on current weather

🕒 Real-time updates when a new city is searched

🖥️ Responsive UI, works on desktop and mobile

⚠️ API Key Usage

The project uses OpenWeather API key.

Important: In this frontend-only project, the key is included in script.js for demonstration purposes.

Security note: In production, API keys should never be exposed in frontend code. A backend proxy should be used to keep the key secret.

🛠️ Technologies Used

HTML5

CSS3

JavaScript (ES6+)

OpenWeather API

▶️ How to Run Locally

Clone the repository:

## git clone https://github.com/<your-username>/Dynamic-Weather-App.git
## cd Dynamic-Weather-App


Open index.html in your browser (Chrome, Firefox, Edge)

Optional: Edit script.js to add your own OpenWeather API key:

const API_KEY = "your_api_key_here";


Search any city and see real-time weather updates!

📂 Project Structure
Dynamic-Weather-App/
│── index.html      # Main HTML page
│── styles.css      # Stylesheet
│── script.js       # JavaScript code for API calls
│── README.md       # Project documentation

🎯 Future Enhancements

Add geolocation support to show weather automatically based on user location

Implement forecast for 5 days with charts

Add unit conversion (Celsius ↔ Fahrenheit)

Deploy as a hosted app on GitHub Pages, Netlify, or Vercel

Move API calls to a backend to hide the API key
