document.addEventListener('DOMContentLoaded', function() {
    const ctx = document.getElementById('vitalsChart').getContext('2d');

    let vitalsChart; // Declare chart variable in a higher scope

    // Function to fetch and update the chart data
    const fetchAndRenderChart = async () => {
        try {
            const response = await fetch('http://localhost:3000/api/vitals-trend');
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();

            // Check if the chart instance already exists
            if (vitalsChart) {
                vitalsChart.destroy(); // Destroy old chart instance
            }

            // Create a new Chart instance with the fetched data
            vitalsChart = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: data.labels,
                    datasets: [
                        {
                            label: 'pH',
                            data: data.ph,
                            borderColor: 'rgb(75, 192, 192)',
                            tension: 0.4,
                            fill: false
                        },
                        {
                            label: 'Moisture (%)',
                            data: data.moisture,
                            borderColor: 'rgb(54, 162, 235)',
                            tension: 0.4,
                            fill: false
                        },
                        {
                            label: 'Temperature (°C)',
                            data: data.temperature,
                            borderColor: 'rgb(255, 159, 64)',
                            tension: 0.4,
                            fill: false
                        }
                    ]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            position: 'top',
                        },
                        title: {
                            display: false,
                        }
                    },
                    scales: {
                        y: {
                            beginAtZero: false,
                        }
                    }
                }
            });

        } catch (error) {
            console.error('Error fetching chart data:', error);
        }
    };

    // Function to fetch and update the latest card data
    const fetchAndRenderCards = async () => {
        try {
            const response = await fetch('http://localhost:3000/api/latest-data');
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();

            // Update the HTML elements with the new data
            document.querySelector('.card:nth-of-type(1) .value').textContent = data.ph;
            document.querySelector('.card:nth-of-type(2) .value').textContent = `${data.moisture}%`;
            document.querySelector('.card:nth-of-type(3) .value').textContent = `${data.temperature}°C`;
            document.querySelector('.card:nth-of-type(4) .value').textContent = `${data.organicMatter}%`;

        } catch (error) {
            console.error('Error fetching card data:', error);
        }
    };

    // Initial data fetch on page load
    fetchAndRenderChart();
    fetchAndRenderCards();

    // Fetch new card data every 5 seconds for a "live" feel
    setInterval(fetchAndRenderCards, 5000);

const fetchAndRenderTable = async () => {
    try {
        const response = await fetch('http://localhost:3000/api/macronutrients');
        if (!response.ok) throw new Error('Failed to fetch macronutrients data');

        const data = await response.json();
        const tbody = document.querySelector('.data-table tbody');
        tbody.innerHTML = ""; // clear old rows

        data.forEach(row => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${row.field}</td>
                <td>${row.date}</td>
                <td>${row.nitrogen}</td>
                <td>${row.phosphorus}</td>
                <td>${row.potassium}</td>
                <td>
                  <span class="status-badge ${row.status.toLowerCase()}">
                    ${row.status}
                  </span>
                </td>
            `;
            tbody.appendChild(tr);
        });
    } catch (error) {
        console.error("Error fetching macronutrients data:", error);
    }
};

// Call it once on page load
fetchAndRenderTable();
});