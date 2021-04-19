exports.handler = function (context, event, callback) {
    console.log(event)
    const response = new Twilio.Response()
    response.appendHeader('Access-Control-Allow-Origin', '*');
    const {contactNumber} = event

    const client = context.getTwilioClient();
    client.studio.flows(context.FLOW_SID)
        .executions
        .create({to: '+1' + contactNumber, from: context.TWILIO_NUMBER})
        .then(execution => {
            console.log(execution.sid)
            response.setBody('Success')
            callback(null, response)
        })
        .catch(e => {
            console.log(e)
            callback(e, null)
        })
};
