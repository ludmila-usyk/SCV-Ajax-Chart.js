const ctx = document.querySelector('.js-chart').getContext('2d');
const GLOBAL_MEAN_TEMPERATURE = 14;

// console.log(ctx);

function fetchData() {
    fetch("./ZonAnn.Ts+dSST.csv")
        .then((response) =>
            response.text()
        )
        .then(data => {
            const parsedData = Papa.parse(data, { header: true }).data;

            const mappedData = parsedData.reduce((acc, entry) => {
                acc.years.push(entry.Year);
                acc.temps.push(Number(entry.Glob) + GLOBAL_MEAN_TEMPERATURE);

                return acc;
            }, {years: [], temps: []});
            // const years = parsedData.map(entry => entry.Year);
            // const temps = parsedData.map(entry => Number(entry.Glob) + GLOBAL_MEAN_TEMPERATURE);
            
            new Chart(ctx, {
    type: 'line',
    data: {
        labels: mappedData.years,
        datasets: [{
            label: '# GLOBAL TEMPERATURE',
            data: mappedData.temps,
            borderColor: "rgba(255, 99, 132, 1)",
            borderWidth: 1,
            fill: false,
        }]
    },
    options: {
        scales: {
            y: {
                ticks: {
                    callback(value) {
                        return value + '°';
                    }
                }
            }
        }
    }
});
        })
}
fetchData();




