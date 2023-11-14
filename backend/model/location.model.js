import mongoose from "mongoose";
const ObjectId = mongoose.Types.ObjectId;

const locationSchema = mongoose.Schema({
    location:String,
    city: String,
    PIN: {
        type: String,
        required: true
    },
    state: String,
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

const Location = mongoose.model("location", locationSchema);
export default Location;