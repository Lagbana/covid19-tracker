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
        //Call the worldwideDataCollector function
    worldwideDataCollector()

    // Display worldwide data when the user opens the page
    createBarGraph(0)
    displayTextData('Worldwide', 0)

    // Display Canada VERSUS Comparison by default
    createComparisonBarGraph('Canada', 'USA', 16, 3)


    // Call the create Dropdown Function
    createDropdown()

    // Call the event listener function
    chooseCountry()

    // Call the compare countries event listener function
    chooseCountriesCompare()

    console.log(covidData)
})

// Make a worldwide object with properties
let worldwideData = {
    cases: 0,
    todayCases: 0,
    deaths: 0,
    todayDeaths: 0,
    recovered: 0,
    active: 0,
    critical: 0,
    casesPerOneMillion: 0
}

// This function sums up the total for all properties and prepends the values to the covidData object
function worldwideDataCollector() {
    covidData.countries.unshift('Worldwide')
    for (let cases of covidData.cases) {
        worldwideData.cases += cases
    }

    covidData.cases.unshift(worldwideData.cases)

    for (let todayCases of covidData.todayCases) {
        worldwideData.todayCases += todayCases
    }
    covidData.todayCases.unshift(worldwideData.todayCases)

    for (let deaths of covidData.deaths) {
        worldwideData.deaths += deaths
    }
    covidData.deaths.unshift(worldwideData.deaths)

    for (let todayDeaths of covidData.todayDeaths) {
        worldwideData.todayDeaths += todayDeaths
    }
    covidData.todayDeaths.unshift(worldwideData.todayDeaths)

    for (let recovered of covidData.recovered) {
        worldwideData.recovered += recovered
    }
    covidData.recovered.unshift(worldwideData.recovered)

    for (let active of covidData.active) {
        worldwideData.active += active
    }
    covidData.active.unshift(worldwideData.active)

    for (let critical of covidData.critical) {
        worldwideData.critical += critical
    }
    covidData.critical.unshift(worldwideData.critical)

    worldwideData.casesPerOneMillion = Number(((worldwideData.cases / 7713468000) * 1000000).toFixed(0))
    covidData.casesPerOneMillion.unshift(worldwideData.casesPerOneMillion)
}



// Append all the countries into the select tag of all dropdowns

function createDropdown() {
    let dropdowns = document.getElementsByClassName('dropdown')
    for (let dropdown of dropdowns) {
        let worldwideOption = document.createElement('option')
        worldwideOption.setAttribute("value", 'Worldwide')
        worldwideOption.textContent = 'Worldwide'
        dropdown.appendChild(worldwideOption)
        let sortedCountryList = covidData.countries.slice().sort()
        for (let country of sortedCountryList) {
            let newCountry = document.createElement('option')
            newCountry.setAttribute("value", country)
            newCountry.textContent = country
            dropdown.appendChild(newCountry)
        }
    }
}

// Add an event listener based on what country the user chooses
// The CreateBarGraph function is called with the country index the user chose
// The displayTextData function is called with the country name and its index


function chooseCountry() {
    let firstDropdown = document.getElementById("countries")
    let countryIndex;
    let countryName;
    firstDropdown.addEventListener("change", function() {
        countryName = this.value
        let countries = covidData.countries
        for (let i = 0; i < countries.length; i++) {
            let country = countries[i]
            if (country === countryName) {
                countryIndex = i
            }
        }
        if (chart) {
            chart.destroy()
        }
        console.log(countryName)
        createBarGraph(countryIndex)
        displayTextData(countryName, countryIndex)
    })
}

// This Function Updates the text on the page with COVID-19 data for a specified country

function displayTextData(countryName, countryIndex) {
    let country = document.getElementById('country')
    country.innerHTML = "Country: " + "<span class='base-text'>" + countryName + "</span>"

    let cases = document.getElementById('cases')
    cases.innerHTML = "Total Cases: " + "<span class='orange-text'>" + covidData.cases[countryIndex].toLocaleString() + "</span>"

    let casesToday = document.getElementById('today-cases')
    casesToday.innerHTML = "Cases Today: " + "<span class='orange-text'>" + covidData.todayCases[countryIndex].toLocaleString() + " &uarr;" + "</span>"

    let deaths = document.getElementById('deaths')
    deaths.innerHTML = "Total Deceased: " + "<span class='negative-data'>" + covidData.deaths[countryIndex].toLocaleString() + "</span>"

    let deathsToday = document.getElementById('today-deaths')
    deathsToday.innerHTML = "Deceased Today: " + "<span class='negative-data'>" + covidData.todayDeaths[countryIndex].toLocaleString() + " &uarr;" + "</span>"

    let recovered = document.getElementById('recovered')
    recovered.innerHTML = "Total Recovered: " + "<span class='positive-data'>" + covidData.recovered[countryIndex].toLocaleString() + "</span>"

    let active = document.getElementById('active')
    active.innerHTML = "Active Cases: " + "<span class='orange-text'>" + covidData.active[countryIndex].toLocaleString() + "</span>"

    let critical = document.getElementById('critical')
    critical.innerHTML = "Critical Active Cases: " + "<span class='orange-text'>" + covidData.critical[countryIndex].toLocaleString() + "</span>"

    let casesPerOneMillion = document.getElementById('cases-per-million')
    casesPerOneMillion.innerHTML = "Cases per Million: " + "<span class='orange-text'>" + covidData.casesPerOneMillion[countryIndex].toLocaleString() + "</span>"
}

// Define chart outside function to make it global
// This way the chart data is deleted when the user chooses a different country
let chart;

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
    chart = new Chart(ctx, {
        // The type of chart we want to create
        type: 'horizontalBar',

        // The data for our dataset
        data: {
            labels: ['Cases', 'Recovered', 'Active', 'Critical', 'Cases per million', 'Cases Today', 'Deceased', 'Deceased Today'],
            datasets: [{
                // label: 'Number of People',
                backgroundColor: 'rgb(146, 183, 254)',
                borderColor: 'rgb(146, 183, 254)',
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


function chooseCountriesCompare() {
    let countryOne = document.getElementById("country-one")
    let countryIndexOne;
    let countryNameOne;
    countryOne.addEventListener("change", function() {
        countryNameOne = this.value
        let countries = covidData.countries
        for (let i = 0; i < countries.length; i++) {
            let country = countries[i]
            if (country === countryNameOne) {
                countryIndexOne = i
            }
        }
    })
    let countryTwo = document.getElementById("country-two")
    let countryIndexTwo;
    let countryNameTwo;
    countryTwo.addEventListener("change", function() {
        countryNameTwo = this.value
        let countries = covidData.countries
        for (let i = 0; i < countries.length; i++) {
            let country = countries[i]
            if (country === countryNameTwo) {
                countryIndexTwo = i
            }
        }
    })
    let compareButton = document.getElementById('compare-button')
    compareButton.addEventListener("click", function() {
        if (chart2) {
            chart2.destroy()
        }
        createComparisonBarGraph(countryNameOne, countryNameTwo, countryIndexOne, countryIndexTwo)
    })
}


// This creates a comparative bar graph between two countries

let chart2;

function createComparisonBarGraph(countryNameOne, countryNameTwo, countryIndexOne, countryIndexTwo) {
    let selectedCountryOne = covidData.countries[countryIndexOne]
    let casesPerOneMillionChartOne = covidData.casesPerOneMillion[countryIndexOne]


    let selectedCountryTwo = covidData.countries[countryIndexTwo]
    let casesPerOneMillionChartTwo = covidData.casesPerOneMillion[countryIndexTwo]

    let ctx = document.getElementById('myChart2').getContext('2d');
    chart2 = new Chart(ctx, {
        // The type of chart we want to create
        type: 'bar',

        // The data for our dataset
        data: {
            labels: [selectedCountryOne, selectedCountryTwo],
            datasets: [{
                label: ['Cases per million'],
                backgroundColor: ['red', 'blue'],
                data: [casesPerOneMillionChartOne, casesPerOneMillionChartTwo]
            }, ]
        },

        // Configuration options go here
        options: {
            title: {
                display: true,
                // text: 'Covid-19 Data Chart for: ' + selectedCountry,
                fontSize: 8
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
                        display: false
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