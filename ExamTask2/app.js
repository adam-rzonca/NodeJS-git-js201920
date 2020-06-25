const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const MongoClient = require("mongodb").MongoClient;
const ObjectID = require("mongodb").ObjectID;
const Joi = require("joi");
const moment = require("moment");
const { adPostSchema, adPutSchema, adQuerySchema } = require("./schema.js");

const url = "mongodb://localhost:27017/AdsDB";

let adsCollection;
let usersCollection;

const connectOptions = {
  useUnifiedTopology: true,
  useNewUrlParser: true,
};

const authMiddleware = async (req, res, next) => {
  try {
    const { authorization } = req.headers;

    if (!authorization) {
      res.sendStatus(401);
      return;
    }

    const [username, password] = authorization.split(":");
    const user = await usersCollection.findOne({ username });

    if (!user) {
      res.sendStatus(401);
      return;
    }

    if (user.password === password) {
      next();
    } else {
      res.sendStatus(401);
    }
  } catch (error) {
    next(error);
  }
};

(async () => {
  try {
    const client = await MongoClient.connect(url, connectOptions);

    console.log("Connected to Database...");

    adsCollection = await client.db().collection("Ads");
    usersCollection = await client.db().collection("Users");

    app.use(bodyParser.json());

    app.put("/:id", authMiddleware, async (req, res, next) => {
      try {
        // Walidacja body
        const { error } = Joi.validate(req.body, adPutSchema);
        if (error) {
          res.status(400).send(error.details);
          return;
        }

        const filter = { _id: ObjectID(req.params.id) };
        const data = { $set: { ...req.body } };

        const result = await adsCollection.findOneAndUpdate(filter, data);
        if (result.lastErrorObject.updatedExisting) {
          res.status(202).send("Updated");
        } else {
          res.sendStatus(404);
        }
      } catch (error) {
        next(error);
      }
    });

    app.delete("/:id", authMiddleware, async (req, res, next) => {
      try {
        const result = await adsCollection.deleteOne({
          _id: ObjectID(req.params.id),
        });

        if (result.deletedCount) {
          res.status(202).send("Deleted");
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
        let result = await usersCollection.findOne({
          username: req.body.username,
        });

        if (!result) {
          res.status(400).send("Invalid username");
          return;
        }

        const data = { ...req.body, add_time: moment().format("YYYY-MM-DD") };

        await adsCollection.insertOne(data);
        res.status(201).send("Created");
      } catch (error) {
        next(error);
      }
    });

    // https://expressjs.com/en/5x/api.html#req.query
    // Tablicę w query string budujemy w nastepujący sposób:
    // GET /shoes?color[]=blue&color[]=black&color[]=red
    // req.query.color => [blue, black, red]
    // [] po parametrze sprawi, że jeśli będzie tylko jeden parametr
    // to i tak zostanie zamieniony na tablicę:
    // GET /shoes?color[]=blue
    // req.query.color => [blue]
    // Co nie zdażyłoby się, gdyby query string zbudować w nastepuący sposób:
    // GET /shoes?color=blue&color=black&color=red
    // req.query.color => [blue, black, red]
    // !!! ALE: !!!
    // GET /shoes?color=blue
    // req.query.color => blue
    app.get("/", async (req, res, next) => {
      try {
        const query = req.query;
        console.log(query);

        const { error } = Joi.validate(query, adQuerySchema);
        if (error) {
          res.status(400).send(error.details);
          return;
        }

        let filter = query;

        if (filter.hasOwnProperty("categories")) {
          filter.categories = { $all: filter.categories };
        }

        if (filter.hasOwnProperty("text")) {
          filter.text = { $regex: filter.text, $options: "i" };
        }

        console.log(filter);

        const cursor = await adsCollection.find(filter).toArray();
        res.status(200).send(cursor);
      } catch (error) {
        next(error);
      }
    });

    app.get("/:id", async (req, res, next) => {
      try {
        const result = await adsCollection.findOne({
          _id: ObjectID(req.params.id),
        });

        if (result) {
          res.status(200).send(result);
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
