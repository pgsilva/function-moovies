const client = require("../out/axios");

let streamings = []

module.exports.run = async (tvshow) => {
    streamings = await client.streaming()
    const result = await client.search(tvshow)
    return beautify(result)
}


const beautify = (data) => {
    if (data.items.length == 0) return 'Não foram encontrados resultado para a busca'

    let topThreeResults = ""

    for (let i = 0; i < 3; i++) {
        const stream = streaming(data.items[i]).trim()

        if (stream != '')
            topThreeResults += `${data.items[i].title.trim()} disponível em ${stream} e `
        else
            topThreeResults += `${data.items[i].title.trim()}, `
    }

    let message = `Encontrei ${data.total_results} resultados para sua busca, separei os 3 principais que foram: ${topThreeResults}`
    return message.substring(0, message.length - 2)
}

const streaming = (show) => {
    let channels = ''

    let offers = []

    if (show.offers && show.offers.length > 0)
        offers = [...new Set(show.offers.map(it => it.provider_id))]

    offers.forEach(str => {
        channels += `${streamings.find(s => s.id == str).clear_name}, `
    })

    return channels.substring(0, channels.length - 2)
}

