import mongoose from "mongoose";

const BookSchema = mongoose.Schema(
    {
        title: { type: String, required: true },
        author: { type: String, required: true },
        publishYear: { type: Number, required: true },
        summary: { type: String, required: true },
        complete: { type: Boolean, default: false },
    },
    {
        timestamps: true
    }
)

export const Book = mongoose.model('Books', BookSchema);

