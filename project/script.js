const apiKey = "2ec47e05681097894723219396dca517";
let forecastChart;

async function getWeather() {
    const cityInput = document.getElementById("city-input");
    const city = cityInput.value.trim();
    if (!city) {
        alert("Please enter a city name!");
        return;
    }

    const weatherInfoDiv = document.getElementById("weather-info");
    const loadingDiv = document.getElementById("loading");

    weatherInfoDiv.classList.remove("visible");
    loadingDiv.classList.remove("hidden");
    weatherInfoDiv.innerHTML = "";

    const currentUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;

    try {
        const currentResponse = await fetch(currentUrl);
        if (!currentResponse.ok) {
            throw new Error("City not found");
        }
        const currentData = await currentResponse.json();
        //forecast data
        const forecastResponse = await fetch(forecastUrl);
        const forecastData = await forecastResponse.json();

        // Display current weather and trigger fade-in animation
        weatherInfoDiv.innerHTML = `
            <h2>${currentData.name}, ${currentData.sys.country}</h2>
            <p class="temp">${Math.round(currentData.main.temp)}°C</p>
            <p class="desc">${currentData.weather[0].description}</p>
            <p>Humidity: ${currentData.main.humidity}%</p>
            <p>Wind: ${currentData.wind.speed} m/s</p>
        `;
        weatherInfoDiv.classList.add("visible");


        createForecastChart(forecastData);

    } catch (error) {
        weatherInfoDiv.innerHTML = `<p style="color: #FF6B6B;">❌ ${error.message}</p>`;
        if (forecastChart) {
            forecastChart.destroy();
        }
    } finally {
        loadingDiv.classList.add("hidden");
    }
}

function createForecastChart(forecastData) {
    const dailyData = forecastData.list.filter(item => item.dt_txt.includes("12:00:00"));

    const labels = dailyData.map(item => new Date(item.dt_txt).toLocaleDateString("en-US", { weekday: "short" }));
    const temps = dailyData.map(item => item.main.temp);

    if (forecastChart) {
        forecastChart.destroy();
    }

    const ctx = document.getElementById("forecastChart").getContext("2d");
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
                        label: function(context) {
                            return `${context.dataset.label}: ${Math.round(context.raw)}°C`;
                        }
                    }
                }
            },
            scales: {
                x: {
                    ticks: { color: "#C5C6C7" },
                    grid: { color: 'rgba(255, 255, 255, 0.1)' }
                },
                y: {
                    ticks: { color: "#C5C6C7" },
                    grid: { color: 'rgba(255, 255, 255, 0.1)' }
                }
            }
        }
    });
}