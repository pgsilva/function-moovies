const client = require("../out/axios")

let streamings = []

module.exports.run = async (tvshow) => {
    streamings = await client.streaming()
    const result = await client.search(tvshow)

    return beautify(result)
}


const beautify = (data) => {
    if (data.items.length == 0) return 'Não foram encontrados resultado para a busca'

    const stream = streaming(data.items[0]).trim()

    let message = `Encontrei ${data.total_results} resultados para sua busca, separei o principal que foi: ${data.items[0].title.trim()} disponível em ${stream}`

    return message.substring(0, message.length - 1)
}

const streaming = (show) => {
    let channels = ''

    let offers = []

    if (show.offers && show.offers.length > 0)
        offers = [...new Set(show.offers.map(it => it.provider_id))]

    offers.forEach(str => {
        channels += `${streamings.find(s => s.id == str).clear_name}, `
    })

    return channels
}


const topThreeResults = (shows) => {
    let topThreeResults = ""

    for (let i = 0; i < 3; i++) {
        const stream = streaming(shows[i]).trim()

        if (stream != '')
            topThreeResults += `${shows[i].title.trim()} disponível em ${stream} e `
        else
            topThreeResults += `${shows[i].title.trim()}, `
    }

    return topThreeResults
}