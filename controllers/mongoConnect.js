const { MongoClient, ServerApiVersion } = require('mongodb');

const uri =
  'mongodb+srv://alswjd:qwer1234@cluster0.z76x4qg.mongodb.net/?retryWrites=true&w=majority';
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

module.exports = client;
