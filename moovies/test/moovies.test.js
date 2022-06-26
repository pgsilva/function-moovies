const moovies = require('../domain/moovies')

test('should transform return data from API to speechText', async () => {

    const result = await moovies.run('baby driver')

    expect(result).toEqual('Encontrei 132 resultados para sua busca, separei o principal que foi: Baby Driver disponível em Apple iTunes, Google Play Movies, Netflix, Amazon Video, Microsoft Store, Claro video, Globoplay, Star Plus')
})