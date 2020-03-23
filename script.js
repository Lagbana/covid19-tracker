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

    // Call the create Dropdown Function
    createDropdown()

    // Call the event listener function
    chooseCountry()
})

let countriesSelector = document.getElementById('countries')

// Append all the countries into the select tag

function createDropdown() {
    let sortedCountryList = covidData.countries.slice().sort()
    for (let country of sortedCountryList) {
        let newCountry = document.createElement('option')
        newCountry.setAttribute("value", country)
        newCountry.textContent = country
        countriesSelector.appendChild(newCountry)
    }
}

//Search bar to search through dropdown of countries

function filter() {
    let keyword = document.getElementById("search").value;
    let select = document.getElementById("countries");
    for (var i = 0; i < select.length; i++) {
        var txt = select.options[i].text;
        if (txt.substring(0, keyword.length).toLowerCase() !== keyword.toLowerCase() && keyword.trim() !== "") {
            select.options[i].style.display = 'none';
        } else {
            select.options[i].style.display = 'list-item';
        }
    }
}


// Add an event listener based on what country the user chooses
// The CreateBarGraph function is called with the country index the user chose
// The displayTextData function is called with the country name and its index

function chooseCountry() {
    let countryIndex;
    let countryName;
    countriesSelector.addEventListener("change", function() {
        countryName = this.value
        let countries = covidData.countries
        for (let i = 0; i < countries.length; i++) {
            let country = countries[i]
            if (country === countryName) {
                countryIndex = i
            }
        }
        createBarGraph(countryIndex)
        displayTextData(countryName, countryIndex)
    })

}

// This Function Updates the text on the page with COVID-19 data for a specified country

function displayTextData(countryName, countryIndex) {
    let country = document.getElementById('country')
    country.innerHTML = "Country: " + "<span class='view-data'>" + countryName + "</span>"

    let cases = document.getElementById('cases')
    cases.innerHTML = "Total Cases: " + "<span class='view-data'>" + covidData.cases[countryIndex] + "</span>"

    let casesToday = document.getElementById('today-cases')
    casesToday.innerHTML = "Cases Today: " + "<span class='view-data'>" + "+ "  + covidData.todayCases[countryIndex] + "</span>"

    let deaths = document.getElementById('deaths')
    deaths.innerHTML = "Total Deceased: " + "<span class='negative-data'>" + covidData.deaths[countryIndex] + "</span>"

    let deathsToday = document.getElementById('today-deaths')
    deathsToday.innerHTML = "Deceased Today: " + "<span class='negative-data'>" + "+ " + covidData.todayDeaths[countryIndex] + "</span>"

    let recovered = document.getElementById('recovered')
    recovered.innerHTML = "Total Recovered: " + "<span class='positive-data'>" + covidData.recovered[countryIndex] + "</span>"

    let active = document.getElementById('active')
    active.innerHTML = "Active Cases: " + "<span class='view-data'>" + covidData.active[countryIndex] + "</span>"

    let critical = document.getElementById('critical')
    critical.innerHTML = "Critical Active Cases: " + "<span class='view-data'>" + covidData.critical[countryIndex] + "</span>"

    let casesPerOneMillion = document.getElementById('cases-per-million')
    casesPerOneMillion.innerHTML = "Cases per Million: " + "<span class='view-data'>" + covidData.casesPerOneMillion[countryIndex] + "</span>"
}


// From the object covid19, the different properties are retrieved
// The bar graph is updated with that countries' data
function createBarGraph(countryIndex) {
    let selectedCountry = covidData.countries[countryIndex]
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
        type: 'horizontalBar',

        // The data for our dataset
        data: {
            labels: ['Total Cases', ' Total Recovered', 'Active Cases', 'Critical Active Cases', 'Cases per million', 'Cases Today', ' Total Deceased', 'Deceased Today'],
            datasets: [{
                // label: 'Number of People',
                backgroundColor: 'rgb(255, 99, 132)',
                borderColor: 'rgb(255, 99, 132)',
                data: [casesChart, recoveredChart, activeChart, criticalChart, casesPerOneMillionChart, casesTodayChart, deathsChart, deathsTodayChart]

            }]
        },

        // Configuration options go here
        options: {
            title: {
                display: true,
                text: 'Covid-19 Data Chart for: ' + selectedCountry,
                fontSize: 16
            },

            legend: {
                display: false,
            },

            scales: {
                xAxes: [{
                    gridLines: {
                        display: true
                    },
                    scaleLabel: {
                        display: true,
                        labelString: 'Number of People'
                    }
                }],
                yAxes: [{
                    gridLines: {
                        display: false
                    }
                }]
            }

        }
    });
}
