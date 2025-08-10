import mongoose from 'mongoose'
const bookSchema = new mongoose.Schema({
    title: { type: String, required: true, unique: true },
    author: { type: String, },
    condition: { type: String, required: true, },
    image: { type: String, },
    status: { type: String, enum: ['pending', 'accepted', 'declined'], default: null },
    requestedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
})

const Book = mongoose.model("Book", bookSchema)

export default Book 