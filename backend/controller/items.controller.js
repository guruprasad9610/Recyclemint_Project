import mongoose from "mongoose";
import Items from "../model/items.model.js";

import multer from 'multer';
const ObjectId = mongoose.Types.ObjectId;

const Storage = multer.diskStorage({
    destination: 'uploads',
    filename: (req, res, cb) => {
        cb(null, Date.now() + "_" + (res.originalname).trim());
    }
});
const upload = multer({
    storage: Storage,
}).single('image');


// Add Items
export const addItems = async (req, res) => {
    upload(req, res, (err) => {
        if (err) {
            console.log(err)
        } else {
            const { item_name, price, description } = req.body;
            const items = Items.create({
                item_name: item_name,
                price: price,
                image: {
                    contentType: 'image',
                    data: req.file.filename
                },
                imageURL:'uploads/'+req.file.filename,
                description: description
            });
            if (items) {
                res.send({ "uploaded": true });
            } else {
                res.send({ "uploaded": false });
            }

        }
    })
};



// Get all Items
export const getAllItems = async (req, res) => {
    const items = await Items.find({ isDelete:false });
    res.send(items)
}


// Get particular Item by ID
export const getItemsById = async (req, res) => {
    const items = await Items.find({ _id: new ObjectId(req.params.id), isDelete:false });
    res.send(items)
}




// Update an Item
export const updateItems = async (req, res) => {
    const updateItems = await Items.updateOne({ _id: new ObjectId(req.body._id) }, { $set: { "price": req.body.price, "description": req.body.description } });
    if (updateItems) {
        console.log(updateItems)
        res.send("update success")
    } else {
        res.send("update failed")
    }
};



// Delete Items by ID
export const deleteItemsById = async (req, res) => {
    const items = await Items.updateOne({ _id: new ObjectId(req.params.id) }, { $set: { "isActive": false, "isDelete": true } });
    if (items) {
        res.send("deleted successfully")
    } else {
        res.send("deletion failed")
    }
}