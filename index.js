const express =  require("express");
const cors = require("cors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const {connection} = require("./config/db");
const {Usermodel} = require("./models/User.model");
const {Hotelmodel} = require("./models/Hotel.model.js");
const PORT = process.env.PORT;

const app = express();

app.use(
    cors({
      origin: "*",
    })
  );

app.use(express.json());

app.post("/signup", async (req, res) => {
  const {name, email, password} = req.body;
  try{
      bcrypt.hash(password, 4, async function(err, hash) {
          await Usermodel.create({name, email, password : hash})
          res.send({message : "User successfully created"})
      });
  }
 catch(err){
  console.log(err)
  res.status(500).send("Something went wrong, please try again later")
 }
})

app.post("/login", async (req, res) => {
  const {email, password} = req.body;
  const user = await Usermodel.findOne({email})
  if(!user){
      return res.send({message : "Sign up first"})
  }
  const hash = user?.password
  bcrypt.compare(password, hash, function(err, result) {
      if(result){
          const token = jwt.sign({ userID : user._id}, process.env.JWT_SECRET_KEY);
          res.send({message : "login successfull", token : token})
      }
      else{
          res.send({message : "login failed"})
      }
  });
})

app.get("/hotels", async (req, res) => {
    const hotels = await Hotelmodel.find()
    res.send({"hotels" : hotels})
})

app.listen(PORT, async () => {
    try {
        await connection;
        console.log("Successfully connected to DB");
    } catch (error) {
        console.log("Error connecting to DB");
        console.log(error);
    }
    console.log(`Listening on port ${PORT}`);
})