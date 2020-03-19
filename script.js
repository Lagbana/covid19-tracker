let ctx = document.getElementById('myChart').getContext('2d');
let chart = new Chart(ctx, {
    // The type of chart we want to create
    type: 'line',

    // The data for our dataset
    data: {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [{
            label: 'COVID-19',
            backgroundColor: 'rgb(255, 99, 132)',
            borderColor: 'rgb(255, 99, 132)',
            data: [0, 10, 5, 2, 20, 30, 45]
        }]
    },

    // Configuration options go here
    options: {}
});

let queryURL = 'https://corona.lmao.ninja/countries?sort=%5Bproperty%5D'

function callAPI() {
    fetch(queryURL)
        .then(function(response) {
            console.log(response)
            return response.json()
        })
        .then(function(coronaCases) {
            console.log(coronaCases)
            let china = coronaCases[1].country
            let chinaCases = coronaCases[1].cases
            let chinaTodayCases = coronaCases[1].todayCases
            let chinaDeaths = coronaCases[1].deaths
            let chinaTodayDeaths = coronaCases[1].todayDeaths
            let chinaRecovered = coronaCases[1].recovered
            let chinaCritical = coronaCases[1].critical

            let chinaCasesElement = document.getElementById("china-cases")
            let chinaTodayCasesElement = document.getElementById("china-today-cases")
            let chinaDeathsElement = document.getElementById("china-deaths")
            let chinaTodayDeathsElement = document.getElementById("china-today-deaths")
            let chinaRecoveredElement = document.getElementById("china-recoverd")
            let chinaCriticalElement = document.getElementById("china-critical")

            chinaCasesElement.textContent = "Cases: " + chinaCases
            chinaTodayCasesElement.textContent = "Cases Today: " + chinaTodayCases
            chinaDeathsElement.textContent = "Deaths: " + chinaDeaths
            chinaTodayDeathsElement.textContent = "Deaths Today: " + chinaTodayDeaths
            chinaRecoveredElement.textContent = "Recovered: " + chinaRecovered
            chinaCriticalElement.textContent = "Critical: " + chinaCritical
        })
}

let chinaButton = document.getElementById("china")
let chinaData = document.getElementById("china-data")

chinaButton.addEventListener("click", function() {
    callAPI()
})