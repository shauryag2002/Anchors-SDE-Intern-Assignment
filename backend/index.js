
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); // Add this line

const app = express();
const port = 5000;
const Video = require('./models/Video');

mongoose.connect('mongodb+srv://shaurya:shaurya@cluster0.dbu6tyo.mongodb.net/', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((error) => {
        console.error('Error connecting to MongoDB:', error);
    });
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors()); // Add this line


app.get('/', async (req, res) => {
    try {
        const videos = await Video.find().sort({ earn: -1 });
        res.json(videos);
    } catch (error) {
        console.error('Error retrieving videos:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.post('/', async (req, res) => {
    try {
        const video = new Video(req.body);
        await video.save();
        res.status(201).json(video);
    } catch (error) {
        console.error('Error creating video:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});


