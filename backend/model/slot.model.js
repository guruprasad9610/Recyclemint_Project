import mongoose from "mongoose";

const slot = mongoose.Schema({
    month: {
        type: String
    },
    year: {
        type: String
    },
    date: [String]
},{
    timestamps:true
});

const Slot = mongoose.model("slots", slot);
export default Slot;