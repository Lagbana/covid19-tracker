// Put the graph details into a function ----> Dustin's Task
let ctx = document.getElementById('myChart').getContext('2d');
let chart = new Chart(ctx, {
    // The type of chart we want to create
    type: 'bar',

    // The data for our dataset
    data: {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [{
            label: 'COVID-19',
            backgroundColor: 'rgb(255, 99, 132)',
            borderColor: 'rgb(255, 99, 132)',
            data: []

        }]
    },

    // Configuration options go here
    options: {}
});



// Covid data object
let covidData = {
    countries:[],
    cases:[],
    todayCases:[],
    deaths:[],
    todayDeaths:[],
    recovered:[],
    active:[],
    critical:[],
    casesPerOneMillion:[]
}

// covid-19 API URL
let queryURL = 'https://corona.lmao.ninja/countries?sort=%5Bproperty%5D'

// Re-Usable function to get any API data
const getData = async (url) => {
    const result = await fetch(url).then(response => response.json())
    return result
}

// Function to get all our necessary data
const populate = (coronaCases) => {
    for (let index of coronaCases){
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
document.addEventListener('DOMContentLoaded', async () => {

    const data = await getData(queryURL)
    covidData = populate(data)
    console.log(covidData)
})


