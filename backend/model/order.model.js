import mongoose from "mongoose";

const itemSchema = mongoose.Schema({
    itemid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'items',
    },
    weight: {
        type: Number,
    },
});

const orderSchema = mongoose.Schema({
    customer_id: {
        type: mongoose.Schema.Types.ObjectId, // Assuming you're using Mongoose
        ref: 'customers',
    },
    address_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'address',
    },
    agent_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
    },
    item: [
        itemSchema
    ],
    // item: [{
    //     itemid: {
    //         type: mongoose.Schema.Types.ObjectId,
    //         ref: 'items',
    //     },
    //     weight: {
    //         type: Number,
    //     }
    // }],
    est_price: {
        type: Number
    },
    order_id: {
        type: String
    },
    schedule_date: {
        type: String
    },
    isAssign: {
        type: Boolean
    },
    status: {
        type: Number,
        default: 0
    },
    // isActive: {
    //     type:Boolean,
    //     default:true
    // },
    isDelete: {
        type: Number,
        default: 0
    }
}, {
    timestamps: true
});

const Orders = mongoose.model("orders", orderSchema);
export default Orders;
