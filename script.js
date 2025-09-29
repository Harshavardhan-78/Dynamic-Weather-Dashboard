const apiKey = "2ec47e05681097894723219396dca517"; // Your OpenWeatherMap API Key
let forecastChart;

// --- API for Air Quality is based on Coordinates (Lat/Lon) ---
async function getAirQuality(lat, lon) {
    // Air Pollution API endpoint
    const airQualityUrl = `https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${apiKey}`;
    try {
        const response = await fetch(airQualityUrl);
        if (!response.ok) {
            // Handle specific 401 error or other issues
            if (response.status === 401) throw new Error("API Key Unauthorized for Air Quality.");
            throw new Error("Air Quality data unavailable.");
        }
        const data = await response.json();
        // AQI is stored in 'list[0].main.aqi' (1=Good, 5=Very Poor)
        return data.list[0].main.aqi;
    } catch (error) {
        console.warn("AQI Fetch Error:", error.message);
        return null; // Return null if fetching failed
    }
}

function openFarmerSupport(temp, windSpeed, humidity, aqi) {
    
    // --- DYNAMIC ADVICE LOGIC ---
    let irrigationAdvice = "Proceed with routine soil moisture checks.";
    let pesticideAdvice = "Standard advice: Check wind speed and precipitation forecast before spraying.";
    let workSafetyAdvice = "";
    
    // 1. Irrigation/Humidity Logic
    if (humidity >= 75) {
        // Correct use of template literals (backticks) for variables
        irrigationAdvice = `💧 **Reduce/Skip Irrigation.** High humidity (${humidity}%) naturally conserves soil moisture and may increase risk of fungal diseases. Focus on drainage.`;
    } else if (humidity < 40) {
        // Correct use of template literals
        irrigationAdvice = `🔥 **Immediate Irrigation Needed.** Low humidity (${humidity}%) causes rapid water loss. Monitor soil closely and irrigate immediately.`;
    }

    // 2. Pesticide Spraying Guidance (Uses Wind Speed)
    // windSpeed is rounded to 1 decimal place before passing to this function
    if (windSpeed >= 5) {
        pesticideAdvice = `🚫 **DANGER: Do NOT Spray.** Wind speed is high (${windSpeed} m/s). Significant chemical drift is likely. Postpone all spraying.`;
    } else if (windSpeed >= 2 && windSpeed < 5) {
        pesticideAdvice = `⚠️ **Use Caution.** Wind speed is moderate (${windSpeed} m/s). Spraying is possible, but use drift reduction nozzles and check wind direction carefully.`;
    } else {
        pesticideAdvice = `✅ **Good Spraying Conditions.** Wind speed is low (${windSpeed} m/s). Proceed with application.`;
    }
    
    // 3. Work/Health Safety (Uses Temperature and AQI)
    if (temp >= 35) {
        workSafetyAdvice += "🥵 **Extreme Heat Warning.** Schedule heavy labour for before 9 AM or after 5 PM. Ensure frequent breaks and hydration.";
    } 
    
    if (aqi >= 4) { // AQI 4 = Poor, 5 = Very Poor
        const aqiText = aqi === 5 ? "Very Poor" : "Poor";
        // Combine safety advice if heat and bad AQI occur
        workSafetyAdvice += (workSafetyAdvice ? "<br>" : "") + `💨 **Air Quality Alert (${aqiText}).** Limit strenuous outdoor activity, especially if operating machinery that raises dust.`;
    }
    
    if (!workSafetyAdvice) {
        workSafetyAdvice = "Normal conditions. Ensure regular breaks.";
    }

    // --- Window Content Generation ---
    const newWindow = window.open("", "_blank", "width=800,height=600");
    if (!newWindow) return alert("Popup blocked! Please allow popups for this site.");
    
    // Function to convert AQI number to descriptive text
    const getAqiText = (aqi) => {
        if (!aqi) return 'N/A';
        if (aqi <= 2) return 'Good';
        if (aqi === 3) return 'Moderate';
        return 'Poor/Very Poor';
    }

    newWindow.document.write(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <title>Farmer Support Center</title>
            <style>
                body { font-family: sans-serif; background-color: #f4f4f4; padding: 20px; color: #333; }
                .container { max-width: 600px; margin: auto; background: white; padding: 30px; border-radius: 10px; box-shadow: 0 0 10px rgba(0,0,0,0.1); }
                h1 { color: #28a745; border-bottom: 2px solid #28a745; padding-bottom: 10px; }
                h2 { color: #007bff; margin-top: 20px; }
                p strong { color: #cc5500; }
                .metric { font-size: 1.1em; font-weight: bold; color: #1f2833; margin-top: 5px; margin-bottom: 20px; }
                ul { list-style-type: disc; margin-left: 20px; }
                button { padding: 10px 20px; background-color: #6c757d; color: white; border: none; border-radius: 5px; cursor: pointer; margin-top: 20px; }
                button:hover { background-color: #5a6268; }
            </style>
        </head>
        <body>
            <div class="container">
                <h1>🌱 Farmer Support Center</h1>
                
                <p>Current Metrics for Decision Making:</p>
                <div class="metric">
                    Temp: ${Math.round(temp)}°C | Wind: ${windSpeed} m/s | Humidity: ${humidity}% | AQI: ${aqi ? aqi + ' (' + getAqiText(aqi) + ')' : 'N/A (check console for AQI error)'}
                </div>
                
                <h2>Pesticide Application Guidance</h2>
                <p><strong>Recommendation:</strong> ${pesticideAdvice}</p>

                <h2>Irrigation & Water Management</h2>
                <p><strong>Recommendation:</strong> ${irrigationAdvice}</p>
                
                <h2>Work & Health Safety</h2>
                <p><strong>Instruction:</strong> ${workSafetyAdvice}</p>

                <h2>General Planning Tips</h2>
                <ul>
                    <li>**Rain Forecast:** Check the main weather chart for the 5-day precipitation outlook before planning planting.</li>
                    <li>**Tilling/Plowing:** Avoid operating heavy machinery immediately after heavy rain to prevent soil compaction.</li>
                    <li>**Optimal Planting Time:** Match your crop schedule to the local seasonal temperatures and moisture forecasts.</li>
                </ul>
                
                <button onclick="window.close()">Back to Weather</button>
            </div>
        </body>
        </html>
    `);
    newWindow.document.close();
}

async function getWeather() {
    const city = document.getElementById("city-input").value.trim();
    if (!city) return alert("Please enter a city name!");

    const weatherInfoDiv = document.getElementById("weather-info");
    const loadingDiv = document.getElementById("loading");
    const farmerSupportBtn = document.getElementById("farmer-support-btn");

    // FIX: This explicitly hides the button before starting a new search
    farmerSupportBtn.style.display = 'none';

    weatherInfoDiv.classList.remove("visible");
    loadingDiv.classList.remove("hidden");
    weatherInfoDiv.innerHTML = "";

    try {
        // --- 1. Fetch current weather ---
        const currentUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
        const currentResponse = await fetch(currentUrl);
        if (!currentResponse.ok) {
            if (currentResponse.status === 401) throw new Error("API Key is invalid or not yet active.");
            throw new Error("City not found or request failed.");
        }
        const currentData = await currentResponse.json();

        // --- 2. Extract key metrics ---
        const lat = currentData.coord.lat;
        const lon = currentData.coord.lon;
        const temp = currentData.main.temp;
        const windSpeed = currentData.wind.speed;
        const humidity = currentData.main.humidity;
        
        // --- 3. Fetch Air Quality (uses Lat/Lon) ---
        const aqi = await getAirQuality(lat, lon);

        // --- 4. Fetch forecast (for chart) ---
        let forecastData = null;
        try {
            const forecastResponse = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`);
            if (!forecastResponse.ok) throw new Error("Forecast data unavailable.");
            forecastData = await forecastResponse.json();
        } catch (err) {
            console.warn(err.message);
        }

        // --- 5. Display Weather and Enable Button ---
        // Round windSpeed to 1 decimal place for cleaner display
        const displayWindSpeed = windSpeed.toFixed(1);

        weatherInfoDiv.innerHTML = `
            <h2>${currentData.name}, ${currentData.sys.country}</h2>
            <p class="temp">${Math.round(temp)}°C</p>
            <p class="desc">${currentData.weather[0].description}</p>
            <p>Humidity: ${humidity}%</p>
            <p>Wind: ${displayWindSpeed} m/s</p>
            ${aqi ? `<p>Air Quality Index (AQI): <strong>${aqi}</strong></p>` : ''}
        `;
        weatherInfoDiv.classList.add("visible");
        
        // FIX: Pass the rounded displayWindSpeed to openFarmerSupport
        farmerSupportBtn.setAttribute('onclick', `openFarmerSupport(${temp}, ${displayWindSpeed}, ${humidity}, ${aqi})`);
        farmerSupportBtn.style.display = 'block';

        // Render chart if forecast data is valid
        if (forecastData && forecastData.list?.length) createForecastChart(forecastData);

    } catch (error) {
        weatherInfoDiv.innerHTML = `<p style="color: #FF6B6B;">❌ ${error.message}</p>`;
        farmerSupportBtn.style.display = 'none';
        if (forecastChart) forecastChart.destroy();
    } finally {
        loadingDiv.classList.add("hidden");
    }
}

function createForecastChart(forecastData) {
    if (!forecastData?.list?.length) return;

    const dailyData = forecastData.list.filter(item => item.dt_txt.includes("12:00:00"));
    const labels = dailyData.map(item => new Date(item.dt_txt).toLocaleDateString("en-US", { weekday: "short" }));
    const temps = dailyData.map(item => item.main.temp);

    const canvas = document.getElementById("forecastChart");
    if (!canvas) return;

    if (forecastChart) forecastChart.destroy();

    const ctx = canvas.getContext("2d");
    forecastChart = new Chart(ctx, {
        type: "line",
        data: {
            labels: labels,
            datasets: [{
                label: "Temperature (°C)",
                data: temps,
                borderColor: "#66FCF1",
                backgroundColor: "rgba(102, 252, 241, 0.2)",
                fill: true,
                tension: 0.4,
                pointRadius: 6,
                pointHoverRadius: 8,
                pointBorderColor: '#66FCF1',
                pointBackgroundColor: '#0B0C10',
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: { labels: { color: "#C5C6C7" } },
                tooltip: {
                    backgroundColor: 'rgba(25, 34, 43, 0.8)',
                    titleColor: '#66FCF1',
                    bodyColor: '#C5C6C7',
                    borderColor: '#45A29E',
                    borderWidth: 1,
                    cornerRadius: 10,
                    callbacks: {
                        label: ctx => `${ctx.dataset.label}: ${Math.round(ctx.raw)}°C`
                    }
                }
            },
            scales: {
                x: { ticks: { color: "#C5C6C7" }, grid: { color: 'rgba(255, 255, 255, 0.1)' } },
                y: { ticks: { color: "#C5C6C7" }, grid: { color: 'rgba(255, 255, 255, 0.1)' } }
            }
        }
    });
}