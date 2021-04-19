exports.handler = function (context, event, callback) {
    console.log('fetch-recent-contacts.event', event)

    const {contactNumber, name, timeSelection} = event
    const time = appointments[timeSelection]

    const client = context.getTwilioClient();
    const response = new Twilio.Response();
    response.appendHeader('Access-Control-Allow-Origin', '*');

    const fetchOrCreateAppointment = async () => {
        const data = {
            name:name,
            time:time,
            confirmed:false
        }
        console.log('Appointment Data', data)
        let appointment

        await client.sync.services(context.SYNC_SERVICE_SID)
            .documents(contactNumber)
            .update({data:data})
            .catch(e => {
                console.log(e)
                appointment = client.sync.services(context.SYNC_SERVICE_SID)
                    .documents
                    .create({
                        uniqueName: contactNumber,
                        data: data
                    })
                    .catch(e => console.log(e))
            })
    }

    fetchOrCreateAppointment()
        .then(() => {
            response.setBody(JSON.stringify({status: 'Complete'}))
            callback(null, response)
        })
        .catch(e => {
            console.log(e)
            response.setBody(JSON.stringify({status: 'Complete'}))
            callback(null, response)
        })

};

const appointments = {
    1: '8AM',
    2: '10AM',
    3: '12PM',
    4: '2PM'
}