const mongoose = require("mongoose");

const VideoSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, "Enter video title"],
        },
        img: [{ type: String, required: [true, "enter Video Image"] }],
        earn: { type: Number, required: [true, "Enter Video earn"] },
        sub: { type: Number, required: [true, "Enter channel subs"] },
        view: { type: Number, required: [true, "Enter video views"] },
        comment: { type: Number, required: [true, "Enter video comments"] },
        like: { type: Number, required: [true, "Enter video likes"] },
        date: { type: String, required: [true, "Enter video date"] },
    }
);

module.exports = mongoose.model("Video", VideoSchema);