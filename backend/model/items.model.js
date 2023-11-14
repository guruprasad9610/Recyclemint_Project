import mongoose from "mongoose";

const itemsSchema = mongoose.Schema({
    item_name:{
        required: true,
        type: String
    },
    price: {
        required: true,
        type: Number
    },
    image: {
        contentType: String,
        data: Buffer
    },
    imageURL: String,
    description: String,
    isActive: {
        type: Boolean,
        default: true
    },
    isDelete: {
        type: Boolean,
        default: false
    }
},{
    timestamps:true
});

const Items = mongoose.model("items",itemsSchema);
export default Items;
