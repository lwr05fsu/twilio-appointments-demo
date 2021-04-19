exports.handler = function (context, event, callback) {
    console.log('fetch-recent-contacts.event', event)
    const client = context.getTwilioClient();
    const response = new Twilio.Response();
    response.appendHeader('Access-Control-Allow-Origin', '*');

    client.sync.services(context.SYNC_SERVICE_SID)
        .documents
        .list({limit:1000})
        .then(appointments => {
            console.log('appointments',appointments)
            response.setBody(JSON.stringify(appointments))
            callback(null, response)
        })
        .catch(e => {
            console.log(e)
            callback(e, null)
        })
};
