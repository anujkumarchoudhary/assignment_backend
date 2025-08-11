import { uploadToCloudinary } from '../config/cloudinary.config.js'
import Book from '../module/book.module.js'

export const getAllBooks = async (req, res) => {
    try {
        const allBooks = await Book.find()
        return res.status(200).json({ message: "All books", data: allBooks })
    }
    catch (err) {
        console.log("error", err)
        return res.status(500).json({ message: "Internal server error" })
    }
}

export const getSingleBooks = async (req, res) => {
    const { id } = req.params;
    try {
        const book = await Book.findById(id)
        if (!book) {
            return res.status(404).json({ message: "book not found!" })
        }
        return res.status(200).json({ message: "single books", data: book })
    }
    catch (err) {
        console.log("error", err)
        return res.status(500).json({ message: "Internal server error" })
    }
}

export const postBook = async (req, res) => {
    const { title, author, condition } = req.body;

    try {
        // Check if book already exists
        const isExitBook = await Book.findOne({ title });
        if (isExitBook) {
            return res.status(400).json({ message: "This book already exists" });
        }

        let imageUrl = null;


        if (req.file && req.file.buffer) {
            const cloudResult = await uploadToCloudinary(req.file.buffer);
            imageUrl = cloudResult.secure_url;
        }

        // Create new book
        const newBook = new Book({
            title,
            author,
            condition,
            image: imageUrl
        });

        await newBook.save();

        return res.status(201).json({
            success: true,
            message: "Book created successfully!",
            data: newBook
        });
    } catch (err) {
        console.error("Error creating book:", err);
        return res.status(500).json({ message: "Internal server error" });
    }
};

export const requestBook = async (req, res) => {
    const { id } = req.params;
    const userId = req.userId;

    try {
        const book = await Book.findById(id);

        if (!book) {
            return res.status(404).json({ message: "Book not found" });
        }

        if (book.status === "pending" && String(book.requestedBy) === String(userId)) {
            return res.status(400).json({ message: "You have already requested this book" });
        }

        book.status = "pending";

        book.requestedBy = userId;

        await book.save();

        return res.status(200).json({ success: true, message: "Book request submitted successfully!", data: book });

    } catch (err) {
        console.error("error", err);
        return res.status(500).json({ message: "Internal server error" });
    }
};

export const updateBookStatus = async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;

    if (!['accepted', 'declined'].includes(status)) {
        return res.status(400).json({ message: "Invalid status" });
    }

    try {
        const book = await Book.findById(id);
        if (!book) {
            return res.status(404).json({ message: "Book not found" });
        }

        book.status = status;
        await book.save();

        return res.status(200).json({ message: `Book ${status} successfully!`, data: book });
    } catch (err) {
        console.error("error", err);
        return res.status(500).json({ message: "Internal server error" });
    }
};



export const updateBook = async (req, res) => {
    const { title, author, condition, } = req.body;
    const { id } = req.params;

    let imageUrl = null;


    if (req.file && req.file.buffer) {
        const cloudResult = await uploadToCloudinary(req.file.buffer);
        imageUrl = cloudResult.secure_url;
    }

    try {
        const isExitBook = await Book.findById(id)

        if (!isExitBook) {
            return res.status(400).json({ message: "This book not found" })
        }

        if (title && title !== isExitBook.title) {
            const duplicate = await Book.findOne({ title });
            if (duplicate) {
                return res.status(400).json({ message: "Book title already exists" });
            }
        }
        const updatedBook = await Book.findByIdAndUpdate(id, { title, author, condition, image: imageUrl }, { new: true })
        return res.status(200).json({ message: "book updated successfully!", data: updatedBook })
    }
    catch (err) {
        console.log("error", err)
        return res.status(500).json({ message: "Internal server error" })
    }
}


export const deleteBook = async (req, res) => {
    const { id } = req.params;
    try {
        const isExitBook = await Book.findById(id)
        if (!isExitBook) {
            return res.status(404).json({ message: "Book not found" })
        }
        const deletedBook = await Book.findByIdAndDelete(id)
        return res.status(200).json({ message: "Deleted all book", data: deletedBook })

    }
    catch (err) {
        console.log("error", err)
        return res.status(500).json({ message: "Internal server error" })

    }
}