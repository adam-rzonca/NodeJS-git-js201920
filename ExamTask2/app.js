const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const MongoClient = require("mongodb").MongoClient;
const ObjectID = require("mongodb").ObjectID;
const Joi = require("joi");

const url = "mongodb://localhost:27017/AdsDB";

const connectOptions = {
  useUnifiedTopology: true,
  useNewUrlParser: true,
};

const adPostSchema = Joi.object().keys({
  username: Joi.string().required(), // Wymagany, string
  categories: Joi.array().items(Joi.string().required()), //Wymagany, tablica stringów z przynajmniej jednym elelemntem
  text: Joi.string().required(), // Wymagany, string
  price: Joi.number().greater(0).precision(2), // Opcjonalny, większy od zera i z dwoma miejcami po przecinku
});

const adPutSchema = Joi.object().keys({
  categories: Joi.array().items(Joi.string().required()), //Wymagany, tablica stringów z przynajmniej jednym elelemntem
  text: Joi.string().required(), // Wymagany, string
  price: Joi.number().greater(0).precision(2), // Opcjonalny, większy od zera i z dwoma miejcami po przecinku
});

(async () => {
  try {
    const client = await MongoClient.connect(url, connectOptions);

    console.log("Connected to Database...");

    const adsCollection = await client.db().collection("Ads");
    const usersCollection = await client.db().collection("Users");

    app.use(bodyParser.json());

    app.put("/:id", async (req, res, next) => {
      try {
        const filter = { _id: ObjectID(req.params.id) };

        // Walidacja body
        const { error } = Joi.validate(req.body, adPutSchema);

        if (error) {
          res.status(400).send(error.details);
          return;
        }
        const data = { $set: { ...req.body } };

        const result = await adsCollection.findOneAndUpdate(filter, data);
        if (result.lastErrorObject.updatedExisting) {
          res.status(200).send("Updated");
        } else {
          res.sendStatus(404);
        }
      } catch (error) {
        next(error);
      }
    });

    app.delete("/:id", async (req, res, next) => {
      try {
        const result = await adsCollection.deleteOne({
          _id: ObjectID(req.params.id),
        });

        if (result.deletedCount) {
          res.status(200).send("Deleted");
        } else {
          res.sendStatus(404);
        }
      } catch (error) {
        next(error);
      }
    });

    app.post("/", async (req, res, next) => {
      try {
        // Walidacja body
        const { error } = Joi.validate(req.body, adPostSchema);

        if (error) {
          res.status(400).send(error.details);
          return;
        }

        // Walidacja usera
        const result = await usersCollection.findOne({
          username: req.body.username,
        });
        if (!result) {
          res.status(400).send("Invalid username");
          return;
        }

        const data = { ...req.body, add_time: new Date() };
        await adsCollection.insertOne(data);
        res.status(201).send("Created");
      } catch (error) {
        next(error);
      }
    });

    app.get("/", async (req, res, next) => {
      try {
        const cursor = await adsCollection.find().toArray();
        res.status(200).send(cursor);
      } catch (error) {
        next(error);
      }
    });

    app.get("/:id", async (req, res, next) => {
      try {
        const cursor = await adsCollection
          .find({ _id: ObjectID(req.params.id) })
          .toArray();

        if (cursor.length) {
          res.status(200).send(cursor);
        } else {
          res.sendStatus(404);
        }
      } catch (error) {
        next(error);
      }
    });

    app.use((error, req, res, next) => {
      const { message } = error;
      console.log(message);
      res.status(400).send(message);
    });

    app.listen(4000, () => console.log("Start server..."));
  } catch (error) {
    console.log(error);
  }
})();
