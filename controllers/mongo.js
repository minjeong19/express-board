const { MongoClient, ServerApiVersion } = require('mongodb');

const uri =
  'mongodb+srv://alswjd:qwer1234@cluster0.z76x4qg.mongodb.net/?retryWrites=true&w=majority';
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});
client.connect((err) => {
  const test = client.db('kdt5').collection('test');
  console.log(test);
  // perform actions on the collection object
  test.deleteMany({}, (deleteErr, deleteResult) => {
    if (deleteErr) throw deleteErr;
    console.log(deleteResult);
    test.insertOne(
      {
        name: '민정',
        age: 25,
      },
      (insertErr, result) => {
        console.log(result);
        const findCursor = test.find({});
        findCursor.toArray((err, data) => {
          console.log(data);
        });
        // client.close();
      },
    );
  });
});
