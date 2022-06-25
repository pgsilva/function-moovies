'use strict'

const Alexa = require('ask-sdk-core')
const moovies = require('../domain/moovies')

const LaunchRequestHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'LaunchRequest'
    },
    handle(handlerInput) {
        const speechText = 'Bem vindo ao Moovies seu oráculo do entretenimento, ' +
            'posso te falar exatamente onde assistir qualquer filme ou série!'

        const reprompt = 'Só dizer: Onde assisto o filme ou série e o nome que deseja pesquisar, se preferir falar apenas o nome também posso conseguir.'

        return handlerInput.responseBuilder
            .speak(speechText)
            .reprompt(reprompt)
            .withSimpleCard('Bem vindo ao Moovies seu oráculo do entretenimento!', speechText)
            .getResponse()
    }
}


const OndeAssistoIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'OndeAssistoIntent'
    },
    async handle(handlerInput) {
        const tvshow =
            handlerInput.requestEnvelope.request.intent.slots['filme'].value ||
            handlerInput.requestEnvelope.request.intent.slots['serie'].value

        console.log(`[INFO] Moovies acaba de receber um pedido para ${tvshow} e irá processar ...`)

        const speechText = await moovies.run(tvshow)

        return handlerInput.responseBuilder
            .speak(speechText)
            .withSimpleCard('Moovies.', speechText)
            .getResponse()
    }
}

const CancelAndStopIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && (Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.CancelIntent'
                || Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.StopIntent')
    },
    handle(handlerInput) {
        const speechText = 'Que a força esteja com você!'

        return handlerInput.responseBuilder
            .speak(speechText)
            .withSimpleCard('Que a força esteja com você!', speechText)
            .withShouldEndSession(true)
            .getResponse()
    }
}

const SessionEndedRequestHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'SessionEndedRequest'
    },
    handle(handlerInput) {
        // Any clean-up logic goes here.
        return handlerInput.responseBuilder.getResponse()
    }
}

const ErrorHandler = {
    canHandle() {
        return true;
    },
    handle(handlerInput, error) {
        console.log(`Error handled: ${error.message}`);

        return handlerInput.responseBuilder
            .speak('Encontrei um probleminha ao pesquisar, me desculpe ainda estou aprendendo, vamos tentar de novo ?')
            .reprompt('Encontrei um probleminha ao pesquisar, me desculpe ainda estou aprendendo, vamos tentar de novo ?')
            .getResponse();
    }
};

const skill = Alexa.SkillBuilders.custom()
    .addRequestHandlers(
        LaunchRequestHandler,
        OndeAssistoIntentHandler,
        CancelAndStopIntentHandler,
        SessionEndedRequestHandler,
    )
    .addErrorHandlers(ErrorHandler)
    .create()

module.exports = {
    LaunchRequestHandler,
    OndeAssistoIntentHandler,
    CancelAndStopIntentHandler,
    SessionEndedRequestHandler,
    ErrorHandler,
    skill
}