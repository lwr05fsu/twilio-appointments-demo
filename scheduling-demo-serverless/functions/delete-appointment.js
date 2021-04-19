exports.handler = function (context, event, callback) {
    console.log('delete-appointment-event', event)

    const {contactNumber} = event

    const client = context.getTwilioClient();
    const response = new Twilio.Response();
    response.appendHeader('Access-Control-Allow-Origin', '*');
    response.setBody('Done and Dusted')

    client.sync.services(context.SYNC_SERVICE_SID)
        .documents(contactNumber)
        .remove().then(resp=> {
        console.log(resp)
        callback(null, response)
    })
        .catch(e => {
            console.log(e)
            response.setBody(JSON.stringify({status: 'No Appointment'}))
            callback(null, response)
        })
};
