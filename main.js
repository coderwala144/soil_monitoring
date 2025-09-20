document.addEventListener('DOMContentLoaded', function() {
    const ctx = document.getElementById('vitalsChart').getContext('2d');

    // This is sample data. Replace this with your actual data from a backend or API
    const phData = [6.5, 7.2, 7.0, 6.8, 6.9, 7.1, 7.5];
    const moistureData = [45, 52, 48, 55, 50, 47, 51];
    const tempData = [22, 24, 23, 25, 24, 23, 25];
    const labels = ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5', 'Day 6', 'Day 7'];

    const vitalsChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [
                {
                    label: 'pH',
                    data: phData,
                    borderColor: 'rgb(75, 192, 192)',
                    tension: 0.4,
                    fill: false
                },
                {
                    label: 'Moisture (%)',
                    data: moistureData,
                    borderColor: 'rgb(54, 162, 235)',
                    tension: 0.4,
                    fill: false
                },
                {
                    label: 'Temperature (°C)',
                    data: tempData,
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

    // You would add functions here to fetch new data and update the chart.
    // Example: vitalsChart.data.datasets[0].data = newData;
    // vitalsChart.update();
});