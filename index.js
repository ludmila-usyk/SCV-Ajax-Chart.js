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
                acc.tempN.push(Number(entry.NHem) + GLOBAL_MEAN_TEMPERATURE);
                acc.tempS.push(Number(entry.SHem) + GLOBAL_MEAN_TEMPERATURE);

                return acc;
            }, {years: [], temps: [], tempN: [], tempS: []});
            // const years = parsedData.map(entry => entry.Year);
            // const temps = parsedData.map(entry => Number(entry.Glob) + GLOBAL_MEAN_TEMPERATURE);
            
            new Chart(ctx, {
    type: 'line',
    data: {
        labels: mappedData.years,
        datasets: [
            {
            label: '# GLOBAL TEMPERATURE',
            data: mappedData.temps,
            borderColor: "rgba(255, 99, 132, 1)",
            borderWidth: 1,
            fill: false,
            },
            {
            label: '# Northern Hemisphere TEMPERATURE',
            data: mappedData.tempN,
            borderColor: "rgba(205, 129, 67, 1)",
            borderWidth: 1,
            fill: false,
            },
            {
            label: '# Southern Hemisphere TEMPERATURE',
            data: mappedData.tempS,
            borderColor: "rgba(16, 44, 9, 1)",
            borderWidth: 1,
            fill: false,
            }
        ]
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
            // x: {
            //     ticks: {
            //         callback(value) {
            //             return value + 'years';
            //         }
            //     }
            // }
        }
    }
});
        })
}
fetchData();




