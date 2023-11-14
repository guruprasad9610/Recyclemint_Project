import mongoose from "mongoose";
const ObjectId = mongoose.Types.ObjectId;

const cusAddressSchema = mongoose.Schema({
    location:{
        type: String,
        required: true
    },
    landmark: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    PIN: {
        type: String,
        required: true
    },    
    latitude: Number,
    longitude: Number,
    customer_Id: {
        type: ObjectId,
        required: true
    },
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

const Address = mongoose.model("address",cusAddressSchema);
export default Address;
