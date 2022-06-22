const client = require("../out/axios");

let streamings = []
module.exports.run = async (event) => {
    streamings = await client.streaming()
    const result = await client.search(event)
    return beautify(result)
}


function beautify(data) {
    if (data.items.length == 0) return 'Não foram encontrados resultado para a busca'

    let topFiveResults = ""

    for (var i = 0; i < 5; i++) {
        topFiveResults += ` ${data.items[i].title} disponível em ${streaming(data.items[i])} \n`
    }

    return `
        Foram encontrados ${data.total_results} resultados para sua busca, os 5 principais foram:
        ${topFiveResults}   
    `
}

function streaming(show) {
    let channels = ""

    const offers = [...new Set(show.offers.map(it => it.provider_id))]

    offers.forEach(str => {
        channels += `${streamings.find(s => s.id == str).clear_name} `
    })

    return channels
}

