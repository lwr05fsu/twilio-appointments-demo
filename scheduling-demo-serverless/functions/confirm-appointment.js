exports.handler = function (context, event, callback) {
    console.log('fetch-recent-contacts.event', event)

    console.log('confirm-appointment',event)
    const {contactNumber} = event

    const client = context.getTwilioClient();
    const response = new Twilio.Response();
    response.appendHeader('Access-Control-Allow-Origin', '*');

    client.sync.services(context.SYNC_SERVICE_SID)
        .documents(contactNumber)
        .fetch()
        .then(appointment => appointment.data)
        .then(data => {
            data.confirmed = true
            console.log('confirm-appointment data',data)
            client.sync.services(context.SYNC_SERVICE_SID)
                .documents(contactNumber)
                .update({data: data})
                .then(appointment => console.log('appointment',appointment))
                .catch(e => console.log(e))
            response.setBody(JSON.stringify({status: 'Success'}))
            callback(null, response)
        })
        .catch(e => {
            console.log(e)
            response.setBody(JSON.stringify({status: 'No Appointment'}))
            callback(null, response)
        })
};
