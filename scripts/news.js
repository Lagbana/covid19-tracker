let article1 = document.querySelector('#one')
let article2 = document.querySelector('#two')
let article3 = document.querySelector('#three')
let article4 = document.querySelector('#four')
let article5 = document.querySelector('#five')
let picOne = document.querySelector('#pic-one')
let picTwo = document.querySelector('#pic-two')
let picThree = document.querySelector('#pic-three')
let picFour = document.querySelector('#pic-four')
let picFive = document.querySelector('#pic-five')

// New York Times data object
let newsObject = {
    headline: [],
    abstract: [],
    url: [],
    image: []
}



// New York Times API URL
let newsURL = 'https://api.nytimes.com/svc/search/v2/articlesearch.json?q=coronavirus&fq=news_desk:("Well""world""Science""Parenting""Business")&api-key=ACeMqzCBBL6xruyG3Mxjy1pnx5tbG9qf'


const getNews = (newsResults) => {
    for (let index of newsResults) {
        newsObject.headline.push(index.headline.main) //-------------------> List of headlines
        newsObject.abstract.push(index.abstract) //-------------------> List of article abstract / summary
        newsObject.url.push(index.web_url) //-------------------> List of article URLs
        const doesExist = index && index.multimedia[38] && index.multimedia[38].url
        let img = doesExist ? `https://static01.nyt.com/${index.multimedia[38].url}?quality=90&auto=webp` : 'https://via.placeholder.com/210x140.png?text=Image+Unavailable'
        newsObject.image.push(img) //-------------------> List of image URLs
    }

}


const createArticles = () => {
    // Article 1
    picOne.setAttribute('src', newsObject.image[1])
    let header1 = document.createElement('h6')
    header1.textContent = newsObject.headline[1]
    let body1 = document.createElement('p')
    body1.textContent = newsObject.abstract[1]
    let link1 = document.createElement('a')
    link1.classList.add('stretched-link')
    link1.textContent = 'Read More'
    link1.setAttribute('href', newsObject.url[1])
    link1.setAttribute('target', '_blank')
    article1.append(header1)
    article1.append(body1)
    article1.append(link1)
    // Article 2
    picTwo.setAttribute('src', newsObject.image[3])
    let header2 = document.createElement('h6')
    header2.textContent = newsObject.headline[3]
    let body2 = document.createElement('p')
    body2.textContent = newsObject.abstract[3]
    let link2 = document.createElement('a')
    link2.classList.add('stretched-link')
    link2.textContent = 'Read More'
    link2.setAttribute('href', newsObject.url[3])
    link2.setAttribute('target', '_blank')
    article2.append(header2)
    article2.append(body2)
    article2.append(link2)
    // Article 3
    picThree.setAttribute('src', newsObject.image[5])
    let header3 = document.createElement('h6')
    header3.textContent = newsObject.headline[5]
    let body3 = document.createElement('p')
    body3.textContent = newsObject.abstract[5]
    let link3 = document.createElement('a')
    link3.classList.add('stretched-link')
    link3.textContent = 'Read More'
    link3.setAttribute('href', newsObject.url[5])
    link3.setAttribute('target', '_blank')
    article3.append(header3)
    article3.append(body3)
    article3.append(link3)
    // Article 4
    picFour.setAttribute('src', newsObject.image[7])
    let header4 = document.createElement('h6')
    header4.textContent = newsObject.headline[7]
    let body4 = document.createElement('p')
    body4.textContent = newsObject.abstract[7]
    let link4 = document.createElement('a')
    link4.classList.add('stretched-link')
    link4.textContent = 'Read More'
    link4.setAttribute('href', newsObject.url[7])
    link4.setAttribute('target', '_blank')
    article4.append(header4)
    article4.append(body4)
    article4.append(link4)
    // Article 5
    picFive.setAttribute('src', newsObject.image[9])
    let header5 = document.createElement('h6')
    header5.textContent = newsObject.headline[9]
    let body5 = document.createElement('p')
    body5.textContent = newsObject.abstract[9]
    let link5 = document.createElement('a')
    link5.classList.add('stretched-link')
    link5.textContent = 'Read More'
    link5.setAttribute('href', newsObject.url[9])
    link5.setAttribute('target', '_blank')
    article5.append(header5)
    article5.append(body5)
    article5.append(link5)

}

// Call ALL functions inside this on Page Load
document.addEventListener('DOMContentLoaded', async () => {

    const data = await getData(newsURL)
    // console.log(data.response.docs[0])
    let articlesList = data.response.docs
    getNews(articlesList)
    createArticles()
})
