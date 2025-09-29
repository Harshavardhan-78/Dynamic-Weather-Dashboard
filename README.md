

# Dynamic Weather & Agricultural Decision Support App

This project is a web application that provides real-time weather, a 5-day forecast, and a unique **Farmer Support Center** offering data-driven agricultural and health safety advice. It is built using standard web technologies and the OpenWeatherMap API.

-----

## 🚀 Project Description

This is a **Dynamic Weather Application** built with pure **JavaScript, HTML, and CSS**, integrating the **OpenWeatherMap API** to provide real-time weather and forecast data. Beyond standard weather reporting, the application features a unique **Farmer Support Center**, offering dynamic, data-driven agricultural and health safety advice based on current weather metrics.

### Key Features

  * **Real-Time Weather & AQI:** Displays current temperature, humidity, wind speed, and the Air Quality Index (AQI).
  * **5-Day Forecast:** Uses the **Chart.js** library to present an interactive line graph of the temperature outlook.
  * **Specialized Decision Support:** The "Farmer Support" feature analyzes live data to provide actionable advice on:
      * **Irrigation Guidance:** Recommendations based on current humidity levels (e.g., reduce/skip or immediate irrigation).
      * **Pesticide Application Safety:** Warnings based on wind speed to prevent chemical drift.
      * **Work & Health Safety:** Alerts for extreme heat ($\ge 35^\circ \text{C}$) and poor air quality ($\text{AQI } \ge 4$).

### API Key Management (Security Note)

  * The OpenWeatherMap API key is currently stored directly within the client-side JavaScript file (`script.js`).
  * **⚠️ Security Warning:** **This is NOT recommended for production environments.** For a secure deployment, the application should be refactored to use a **server-side proxy** (e.g., Node.js) to hide the key from the public client.

-----

## 🛠️ Prerequisites

To run and use this application, you must have the following:

1.  **OpenWeatherMap API Key:** You need a valid API key from OpenWeatherMap to fetch weather data.
2.  **Browser Setup:** The key must be inserted into the designated variable within the `script.js` file.
3.  **Modern Web Browser:** Any modern browser (Chrome, Firefox, Edge, Safari) that supports HTML5, CSS3, and JavaScript.

**Setup Instructions:**

1.  Obtain your API Key from the OpenWeatherMap website.
2.  Open `script.js`.
3.  Replace the placeholder value with your actual key:
    ```javascript
    const apiKey = "YOUR_API_KEY_HERE"; // Replace this value
    ```

-----

## 💻 How to Use

The application is straightforward to use once the files are set up locally.

1.  **Launch:** Open the `index.html` file directly in your web browser.
2.  **Input Location:** Type a city name (e.g., "Paris," "Sydney") into the **Location** input field.
3.  **Get Weather:** Click the **Submit** button to fetch and display the current weather and the 5-day forecast chart.
4.  **Access Farmer Support:** After the weather data loads, the **Farmer Support** button will appear. Click it to open a new pop-up window containing the specific agricultural and safety advice based on the displayed metrics.
5.  **Close Advice:** Click the **Back to Weather** button in the pop-up to return to the main screen.

-----

## 📂 Project Structure

The project follows a standard file structure for a simple web application:

```
.
├── index.html        // The main structure and entry point of the application.
├── script.js         // Core logic, API calls, data processing, chart rendering, and decision support logic.
└── style.css         // Styling for the application, including layout, colors, and animations.
```
## ✨ Future Enhancements
1. **Security: Implement a server-side proxy to hide the API key.

2. **Functionality: Add precipitation forecasts and UV Index reporting.

3. **UX: Implement geolocation, search history, and temperature unit toggling.
