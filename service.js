// backend/server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGO_URI).then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

// Schema
const appSchema = new mongoose.Schema({
    name: String,
    description: String,
    code: String,
    status: { type: String, default: 'Not Deployed' }
});

const AppModel = mongoose.model("App", appSchema);

// Routes
app.get('/apps', async (req, res) => {
    const apps = await AppModel.find();
    res.json(apps);
});

app.post('/apps', async (req, res) => {
    const newApp = new AppModel(req.body);
    await newApp.save();
    res.json(newApp);
});

app.put('/apps/:id/deploy', async (req, res) => {
    const updated = await AppModel.findByIdAndUpdate(req.params.id, { status: "Deployed" }, { new: true });
    res.json(updated);
});

app.delete('/apps/:id', async (req, res) => {
    await AppModel.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted" });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
