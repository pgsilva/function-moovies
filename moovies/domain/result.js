const client = require("../out/axios");

let streamings = []
module.exports.run = async (event) => {
    streamings = await client.streaming()
    const result = await client.search(event.term)
    return beautify(result)
}


function beautify(data) {
    if (data.items.length == 0) return 'Não foram encontrados resultado para a busca'

    let topFiveResults = ""

    for (var i = 0; i < 5; i++) {
        const stream = streaming(data.items[i]).trim()

        if (stream != '')
            topFiveResults += `${data.items[i].title.trim()} disponível em ${stream}, `
        else
            topFiveResults += `${data.items[i].title.trim()}, `
    }

    let message = `Foram encontrados ${data.total_results} resultados para sua busca, os 5 principais foram: ${topFiveResults}`
    return message.substring(0, message.length - 2)
}

function streaming(show) {
    let channels = ''

    let offers = []

    if (show.offers && show.offers.length > 0)
        offers = [...new Set(show.offers.map(it => it.provider_id))]

    offers.forEach(str => {
        channels += `${streamings.find(s => s.id == str).clear_name} `
    })

    return channels
}

