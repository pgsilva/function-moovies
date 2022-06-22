const axios = require("axios");
const _ = require("lodash");

const API_URI = "https://apis.justwatch.com/"
const API_LANGUAGE = "pt"
const API_LOCALE = "pt_BR"

const client = axios.create({
    baseURL: `${API_URI}`
})

const providers = client.get(`/content/providers/locale/${API_LOCALE}`)

let streamings = []
let api = {}

api.run = async (event) => {
    streamings = await providers

    console.log("[INFO] Evento recebido, buscando series e filmes...")
    const response = await client.post(
        `content/titles/${API_LOCALE}/popular?language=${API_LANGUAGE}`,
        {
            "query": "stranger things"
        }
    )

    console.log(`[INFO] Busca concluida - Status: ${response.status}`)
    return beautify(response.data)
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
        channels += `${streamings.data.find(s => s.id == str).clear_name} `
    })

    return channels
}


module.exports = api

