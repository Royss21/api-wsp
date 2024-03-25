import mongoose from "mongoose";


const ChatSchema = new mongoose.Schema({
    key: {
        type: String,
        required: [true, 'key is missing'],
        unique: true,
    },
    chat: {
        type: Array,
    },
})

export const Chat = mongoose.model('Chat', ChatSchema)
