import mongoose from "mongoose";

const orderitemSchema = mongoose.Schema({
    order_id: {
        type: mongoose.Schema.Types.ObjectId, // Assuming you're using Mongoose
        ref: 'order',
    },
    item_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'items',
    },
    item_weight: {
        type: Number
    },
    item_price: {
        type: Number
    },
    est_price: {
        type: Number
    },
    order_id: {
        type: String
    },
    city: {
        type: String
    },
}, {
    timestamps: true
});

const Orderitems = mongoose.model("orderitems", orderitemSchema);
export default Orderitems;
