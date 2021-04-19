exports.handler = function (context, event, callback) {
  const client = context.getTwilioClient();

  const response = new Twilio.Response();
  response.appendHeader('Access-Control-Allow-Origin', '*')

  const {contactNumber} = event

  const fetchSyncDocument = async () =>
      client.sync.services(context.SYNC_SERVICE_SID)
          .documents(contactNumber).fetch()
          .then(document => document.sid)
          .catch(e => {
            console.log(e)
            return createSyncDocument()
          })


  const createSyncDocument = () =>
      client.sync.services(context.SYNC_SERVICE_SID)
          .documents
          .create({uniqueName: contactNumber})
          .then(document => document.sid)
          .catch(e => console.log(e))






};
