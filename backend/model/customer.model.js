import mongoose from "mongoose";

const customerSchema = mongoose.Schema({
    name:{
        type: String,
        default:""
    },
    mobile: String,
    email: {
        type: String,
        default:""
    },
    image: {
        contentType: String,
        data: Buffer
    },
    imageURL: String,
    avatar: {
        type: String
    },
    OTP: String,    
    isActive: {
        type:Boolean,
        default:true
    },
    isDelete: {
        type:Boolean,
        default:false
    },
    isComplete: {
        type: Boolean,
        default:false
    }
},{
    timestamps:true
});

const Customers = mongoose.model("customers",customerSchema);
export default Customers;
