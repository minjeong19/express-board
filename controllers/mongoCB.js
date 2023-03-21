const { MongoClient, ServerApiVersion } = require('mongodb');

const uri =
  'mongodb+srv://alswjd:qwer1234@cluster0.z76x4qg.mongodb.net/?retryWrites=true&w=majority';
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

// insertOne 쿼리

client.connect((err) => {
  const test = client.db('kdt5').collection('test');
  console.log(test);
  // perform actions on the collection object
  test.deleteMany({}, (deleteErr, deleteResult) => {
    if (deleteErr) throw deleteErr;
    console.log(deleteResult);

    test.insertOne(
      {
        name: 'pororo',
        age: 5,
      },
      (insertErr, insertResult) => {
        if (insertErr) throw insertErr;
        console.log(insertResult);
      },
    );
  });
});

// deleteMany 쿼리

// client.connect((err) => {
//   const test = client.db('kdt5').collection('test');
//   console.log(test);
//   // perform actions on the collection object
//   test.deleteMany({}, (deleteErr, deleteResult) => {
//     if (deleteErr) throw deleteErr;
//     console.log(deleteResult);

//     test.insertMany(
//       [
//         { name: 'pororo', age: 5 },
//         { name: 'loopy', age: 6 },
//         { name: 'crong', age: 4 },
//       ],
//       (insertErr, insertResult) => {
//         if (insertErr) throw insertErr;
//         console.log(insertResult);

//         test.deleteMany(
//           { age: { $gte: 5 } },
//           (deleteManyErr, deleteManyResult) => {
//             if (deleteManyErr) throw deleteManyErr;
//             console.log(deleteManyResult);
//           },
//         );
//         // client.close();
//       },
//     );
//   });
// });

// update 쿼리
// client.connect((err) => {
//   const test = client.db('kdt5').collection('test');
//   console.log(test);
//   // perform actions on the collection object
//   test.deleteMany({}, (deleteErr, deleteResult) => {
//     if (deleteErr) throw deleteErr;
//     console.log(deleteResult);

//     test.insertMany(
//       [
//         { name: 'pororo', age: 5 },
//         { name: 'loopy', age: 6 },
//         { name: 'crong', age: 4 },
//       ],
//       (insertErr, insertResult) => {
//         if (insertErr) throw insertErr;
//         console.log(insertResult);

//         test.updateMany(
//           { age: { $gte: 5 } },
//           { $set: { name: '5살 이상인 친구들' } },
//           (updateErr, updateResult) => {
//             if (updateErr) throw updateErr;
//             console.log(updateResult);
//           },
//         );
//         // client.close();
//       },
//     );
//   });
// });

// insertOne 쿼리
// client.connect((err) => {
//   const test = client.db('kdt5').collection('test');
//   console.log(test);
//   // perform actions on the collection object
//   test.deleteMany({}, (deleteErr, deleteResult) => {
//     if (deleteErr) throw deleteErr;
//     console.log(deleteResult);
//     test.insertOne(
//       {
//         name: '민정',
//         age: 25,
//       },
//       (insertErr, result) => {
//         console.log(result);
//         const findCursor = test.find({});
//         findCursor.toArray((err, data) => {
//           console.log(data);
//         });
//         // client.close();
//       },
//     );
//   });
// });

// insertMany 쿼리

// client.connect((err) => {
//   const test = client.db('kdt5').collection('test');
//   console.log(test);
//   // perform actions on the collection object
//   test.deleteMany({}, (deleteErr, deleteResult) => {
//     if (deleteErr) throw deleteErr;
//     console.log(deleteResult);

//     test.insertMany(
//       [
//         { name: 'pororo', age: 5 },
//         { name: 'loopy', age: 6 },
//         { name: 'crong', age: 4 },
//       ],
//       (insertErr, insertResult) => {
//         if (insertErr) throw insertErr;
//         console.log(insertResult);
//       },
//     );
//   });
// });

// find 쿼리
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

// test.insertMany(
//   [
//     { name: 'pororo', age: 5 },
//     { name: 'loopy', age: 6 },
//     { name: 'crong', age: 4 },
//   ],
//   (insertErr, insertResult) => {
//     if (insertErr) throw insertErr;
//     console.log(insertResult);
//     // 조건에 빈객체를 넣어두면 모두다
//     const findCursor = test.find({});
//     console.log(findCursor);
//     findCursor.toArray((toArrErr, toArrData) => {
//       if (toArrErr) throw toArrErr;
//       console.log(toArrData);
//     });
// findOne 실습
// test.findOne({ name: 'loopy' }, (findErr, findData) => {
//   if (findErr) throw findErr;
//   console.log(findData);
// });
// client.close();
//       },
//     );
//   });
// })
