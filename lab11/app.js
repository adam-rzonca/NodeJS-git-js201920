require("dotenv").config();

const MongoClient = require("mongodb").MongoClient;
const uri = process.env.MONGODB_CONNECTION;

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
client.connect(async (err) => {
  const collection = client.db("todo").collection("tasks");

  //   await collection.insertOne({
  //     task: "kupić piwczywo",
  //     completed: true,
  //   });

  //   await collection.updateMany(
  //     {},
  //     {
  //       $set: { createDate: "2020-06-28" },
  //     }
  //   );

  console.log(await collection.find().toArray());

  client.close();
});
