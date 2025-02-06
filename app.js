const express = require('express');
const mongodb = require('mongoose');
const Address = require('./models/address');  // Importing the model
const app = express();
const PORT = 3000;
app.use(express.json());  

mongodb.connect('mongodb://localhost:27017/api_database')
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);  
  });

app.post("/create", async (req, res) => {
  try {
    const { door_no, street_name, area, district, pincode, phone_number } = req.body;
    const newData = new Address({door_no, street_name, area, district, pincode, phone_number});
    await newData.save();
    res.status(201).json(newData);
  } catch (err) {
    console.error("Error creating record"); 
    res.status(500).json("Error creating record");
  }
});

app.get("/get", async (req, res) => {
  try {
    const records = await Address.find();
    res.status(200).json(records);
  } catch (err) {
    console.error("Error fetching records");
    res.status(500).json("Error fetching records");
  }
});

app.get("/get/:id", async (req, res) => {
  try {
    const record = await Address.findById(req.params.id);
    if (!record) {
      return res.status(404).json("Record not found" );
    }
    res.status(200).json(record);
  } catch (err) {
    console.error("Error fetching record");
    res.status(500).json("Error fetching record");
  }
});

app.put("/update/:id", async (req, res) => {
  try {
    const { door_no, street_name, area, district, pincode, phone_number } = req.body;
    const updatedRecord = await Address.findByIdAndUpdate(req.params.id, { door_no, street_name, area, district, pincode, phone_number }, { new: true });
    if (!updatedRecord) {
      return res.status(404).json("Record not found");
    }
    res.status(200).json(updatedRecord);
  } catch (err) {
    console.error("Error updating record");
    res.status(500).json("Error updating record");
  }
});

app.delete("/delete/:id", async (req, res) => {
  try {
    const deletedRecord = await Address.findByIdAndDelete(req.params.id);
    if (!deletedRecord) {
      return res.status(404).json("Record not found");
    }
    res.status(200).json("Record deleted successfully");
  } catch (err) {
    console.error("Error deleting record");
    res.status(500).json("Error deleting record");
  }
});
