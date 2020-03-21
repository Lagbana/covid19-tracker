// Covid data object
let covidData = {
    countries: [],
    cases: [],
    todayCases: [],
    deaths: [],
    todayDeaths: [],
    recovered: [],
    active: [],
    critical: [],
    casesPerOneMillion: []
}

// covid-19 API URL
let queryURL = 'https://corona.lmao.ninja/countries?sort=%5Bproperty%5D'

// Re-Usable function to get any API data
const getData = async(url) => {
    const result = await fetch(url).then(response => response.json())
    return result
}

// Function to get all our necessary data
const populate = (coronaCases) => {
    for (let index of coronaCases) {
        covidData.countries.push(index.country) //-------------------> List of Countries
        covidData.cases.push(index.cases) //-------------------> List of Cases
        covidData.todayCases.push(index.todayCases) //-------------------> List of Today's Cases
        covidData.deaths.push(index.deaths) //-------------------> List of Total Deaths
        covidData.todayDeaths.push(index.todayDeaths) //-------------------> List of Today's Deaths
        covidData.active.push(index.active) //----------------------> List of Active (need more context for "Active")
        covidData.recovered.push(index.recovered) //-------------------> List of Recovered
        covidData.critical.push(index.critical) //-------------------> List of Critical
        covidData.casesPerOneMillion.push(index.casesPerOneMillion) //------------------> List of cases per one million (used for comparison
    }
    return covidData
}

// Call ALL functions inside this on Page Load
document.addEventListener('DOMContentLoaded', async() => {

    const data = await getData(queryURL)
    covidData = populate(data)
})

// Put the graph details into a function ----> Dustin's Task


let countriesSelector = document.getElementById('countries')

let countryIndex;


// Add an event listener based on what country the user clicks on
// The CreateBarGraph function is called that correspponds to the country index the user chose
countriesSelector.addEventListener("click", function() {
    let countryName = event.target.getAttribute("value")
    let countries = covidData.countries
    for (let i = 0; i < countries.length; i++) {
        let country = countries[i]
        if (country === countryName) {
            countryIndex = i
        }
    }
    createBarGraph(countryIndex)
})

// From the object covid19, the different properties are retrieved
// The bar graph is updated with that countries' data
function createBarGraph(countryIndex) {
    console.log(covidData)
    let casesChart = covidData.cases[countryIndex]
    let casesTodayChart = covidData.todayCases[countryIndex]
    let deathsChart = covidData.deaths[countryIndex]
    let deathsTodayChart = covidData.todayDeaths[countryIndex]
    let recoveredChart = covidData.recovered[countryIndex]
    let activeChart = covidData.active[countryIndex]
    let criticalChart = covidData.critical[countryIndex]
    let casesPerOneMillionChart = covidData.casesPerOneMillion[countryIndex]

    let ctx = document.getElementById('myChart').getContext('2d');
    let chart = new Chart(ctx, {
        // The type of chart we want to create
        type: 'bar',

        // The data for our dataset
        data: {
            labels: ['Cases', 'Cases Today', 'Deaths', 'Deaths Today', 'Recovered', 'Active', 'Critical', 'Cases per million'],
            datasets: [{
                label: 'COVID-19',
                backgroundColor: 'rgb(255, 99, 132)',
                borderColor: 'rgb(255, 99, 132)',
                data: [casesChart, casesTodayChart, deathsChart, deathsTodayChart, recoveredChart, activeChart, criticalChart, casesPerOneMillionChart]

            }]
        },

        // Configuration options go here
        options: {}
    });
}