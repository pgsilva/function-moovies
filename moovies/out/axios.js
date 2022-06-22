const axios = require("axios");

const API_URI = "https://apis.justwatch.com/"
const API_LANGUAGE = "pt"
const API_LOCALE = "pt_BR"

const http = axios.create({
    baseURL: `${API_URI}`
})

let client = {}

client.streaming = async () => {
    console.log("[INFO] Buscando canais de streaming...")

    const response = await http.get(`/content/providers/locale/${API_LOCALE}`)

    console.log(`[INFO] Busca de canais concluida - Status: ${response.status}`)
    return response.data
}

client.search = async (event) => {

    console.log("[INFO] Evento recebido, buscando series e filmes...")
    const response = await http.post(
        `content/titles/${API_LOCALE}/popular?language=${API_LANGUAGE}`,
        {
            "query": "stranger things"
        }
    )

    console.log(`[INFO] Busca concluida - Status: ${response.status}`)
    return response.data
}

module.exports = client

