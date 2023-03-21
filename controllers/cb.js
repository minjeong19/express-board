const { MongoClient, ServerApiVersion } = require('mongodb');

const uri =
  'mongodb+srv://alswjd:qwer1234@cluster0.z76x4qg.mongodb.net/?retryWrites=true&w=majority';
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

// find 쿼리
async function main() {
  try {
    await client.connect();
    const member2 = client.db('kdt5').collection('member2');
    await member2.deleteMany({});

    await member2.insertMany([
      { name: '김민정', age: 25 },
      { name: '이유림', age: 26 },
      { name: '이찬호', age: 26 },
      { name: '김정혁', age: 25 },
      { name: '송민선', age: 29 },
    ]);
    await member2.insertOne({ name: '조성희', age: 24 });
    await member2.deleteOne({ name: '이유림' });
    await member2.updateOne(
      { name: '조성희' },
      { $set: { name: '이유림', age: 25 } },
    );
    const findCursor = member2.find({ age: { $gte: 25 } });
    const dataArr = await findCursor.toArray();
    console.log(dataArr);
  } catch (err) {
    console.error(err);
  }
}

main();

// callback 이용하기
// client.connect((err) => {
//   const member = client.db('kdt5').collection('member');
//   console.log(member);
//   // perform actions on the collection object
//   member.deleteMany({}, (deleteManyErr, deleteManyResult) => {
//     if (deleteManyErr) throw deleteManyErr;
//     console.log(deleteManyResult);

//     member.insertMany(
//       [
//         { name: '김민정', age: 25 },
//         { name: '이유림', age: 26 },
//         { name: '이찬호', age: 26 },
//         { name: '김정혁', age: 25 },
//         { name: '송민선', age: 29 },
//       ],
//       (insertManyErr, insertManyResult) => {
//         if (insertManyErr) throw insertManyErr;
//         console.log(insertManyResult);

//         member.insertOne(
//           { name: '조성희', age: 24 },
//           (insertOneErr, insertOneResult) => {
//             if (insertOneErr) throw insertOneResult;
//             console.log(insertOneResult);

//             member.deleteOne(
//               { name: '이유림' },
//               (deleteOneErr, deleteOneResult) => {
//                 if (deleteOneErr) throw deleteOneErr;
//                 console.log(deleteOneResult);

//                 member.updateOne(
//                   { name: '조성희' },
//                   { $set: { name: '이유림', age: 25 } },
//                   (updateOneErr, updateOneResult) => {
//                     if (updateOneErr) throw updateOneErr;
//                     console.log(updateOneResult);

//                     const cursor = member.find({ age: { $gte: 25 } });

//                     cursor.toArray((toArrErr, toArrData) => {
//                       if (toArrErr) throw toArrErr;
//                       console.log(toArrData);
//                     });
//                   },
//                 );
//               },
//             );
//           },
//         );
//       },
//     );
//   });
// });
