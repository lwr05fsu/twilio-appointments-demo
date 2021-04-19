exports.handler = function (context, event, callback) {
    console.log('fetch-recent-contacts.event', event)

    let {contactNumber} = event
    if (!contactNumber.startsWith('+1'))
        contactNumber = '+1' + contactNumber

    const client = context.getTwilioClient();
    const response = new Twilio.Response();
    response.appendHeader('Access-Control-Allow-Origin', '*');
    response.appendHeader( 'Content-Type', 'application/json'); //'Content-Type','application/x-www-form-urlencoded'); //

    client.sync.services(context.SYNC_SERVICE_SID)
        .documents(contactNumber)
        .fetch()
        .then(appointment => {
            console.log('fetch-appointment appointment', appointment)
            if (appointment && appointment.sid) {
                console.log(appointment)
                const responseBody = {
                    status: 'Appointment Found',
                    date: appointment.data.date,
                    time: appointment.data.time,
                    confirmed:appointment.data.confirmed || false
                }
                response.setBody(responseBody)
            } else {
                response.setBody({status: 'No Appointment'})
            }
            callback(null, response)
        })
        .catch(e => {
            console.log(e)
            response.setBody({status: 'No Appointment'})
            callback(null, response)
        })
};
