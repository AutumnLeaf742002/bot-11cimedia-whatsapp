const { createBot, createProvider, createFlow, addKeyword } = require('@bot-whatsapp/bot')

const QRPortalWeb = require('@bot-whatsapp/portal')
const BaileysProvider = require('@bot-whatsapp/provider/baileys')
const JsonFileAdapter = require('@bot-whatsapp/database/json')


// Link aplicar vacante en el numeral
const aplicar_vacante = addKeyword('Aplicar a una vacante').addAnswer('*Enlace para aplicar a las vacantes* https://www.miempleord.com/');
const publicar_vacante = addKeyword('Publicar vacante').addAnswer('*Enlace para publicar vacantes* https://www.miempleord.com/p/formulario-para-publicar-puestos-de.html');
const descargar_curriculum = addKeyword('Descargar curriculum').addAnswer('# url 3');
const ver_vacantes = addKeyword('Ver vacantes de instagram').addAnswer('# url 4');

const flowPrincipal = addKeyword([])
.addAnswer('🙌 Hola bienvenido al *Chatbot de Mi Empleo RD*')
.addAnswer('Selecciona lo que quieres realizar.')
.addAnswer(
    '*Opciones a elegir*',
    {
        buttons:[
            {body:'Aplicar a una vacante'},
            {body:'Publicar vacante'},
        ]
    },
    null,
    [aplicar_vacante, publicar_vacante] // Agregar el objeto ver_vacantes al array
);

const main = async () => {
    const adapterDB = new JsonFileAdapter()
    const adapterFlow = createFlow([flowPrincipal])
    const adapterProvider = createProvider(BaileysProvider)

    createBot({
        flow: adapterFlow,
        provider: adapterProvider,
        database: adapterDB,
    })

    QRPortalWeb()
}

main()