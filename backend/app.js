//app building using json with relavent declerations of dependencies


const express = require("express");
const mongoose = require("mongoose");
const app = express();

//json type to be used
app.use(express.json());

// Resource sharing with the use of cross-origin

app.use((req, res, next) => {
    
    //granting of access for access controlling
    res.setHeader("Access-Control-Allow-Origin", "*");

    //operations allowed to be performed
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, DELETE, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    next();
  });

// Importing the model created for factorial calculation

const Factorial = require("./models/factorial");


app.get("/api/health", async (req, res) => {
    res.status(200).json({message: "Okay"});  
});


//main operations to be done inorder to factorial calculation

app.post("/api/factorial/:number", async (req, res) => {
    try {

        const number = +req.params.number;
        let f = 1;

        //condition checking 

        for(let i = 1; i <= number; i++)    
        {  
            f = f * i;  
        }  

        //include the number or digit inputted
        const factorial = new Factorial({
            input: number,
            result: f
        });

        //save results

        await factorial.save();

        res.status(200).json({
            result: f,
            allData: await Factorial.find()
        });

        //error handling

    } catch (error) {
        res.status(500).json(error);
    }   
});

//obtain the factorial using the declared function calling

app.get("/api/factorial", async (req, res) => {
    try {
        const factorials = await Factorial.find();
        res.status(200).json(factorials);
    } catch (error) {
        res.status(500).json(error);
    }   
});

//delete the calculations and other

app.delete("/api/factorial/:id", async (req, res) => {
    try {
        const fact = await Factorial.findById(req.params.id);
        if (!fact) {
            return res.status(404).json({ message: 'not found' });
        }

        //remove the values
        await fact.remove();

        //find the factorial from the input

        res.status(200).json(await Factorial.find());


    } catch (error) {
        res.status(500).json(error);
    } 
});

//connecting with the Database

mongoose.connect(
    `mongodb://mongodb:27017/factorials?ssl=false`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
    (err) => {
      if (err) {

        //if connection failed message to be displayed

        console.error("DB Connection failed with MONGODB");
        console.error(err);
      } else {

        //successful connection message

        console.log("DB Connection SUCCESSFULL with MONGODB");

        //port number where data is retrieved
        app.listen(8080);
      }
    }
  );

