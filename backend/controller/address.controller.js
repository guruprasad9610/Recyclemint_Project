import mongoose from "mongoose";
import Address from "../model/address.model.js";
const ObjectId = mongoose.Types.ObjectId;

// Add Address
export const addAddress = async (req, res) => {
    const { location, landmark, city, state, PIN, latitude, longitude, customer_Id } = req.body;
    const address = await Address.create({
        location: location,
        landmark: landmark,
        city: city,
        state: state,
        PIN: PIN,
        latitude: latitude,
        longitude: longitude,
        customer_Id: customer_Id
    });

    if (address) {
        res.send(
            {
                error: false,
                message: "saved successfully"
            }
        );
    }
};


// Get Address by ID
export const getAddressById = async (req, res) => {
    const addressId = req.params.id;
    const filteredAddress = await Address.findOne({ _id: new ObjectId(addressId), isDelete: false });
    if (filteredAddress) {
        res.send(filteredAddress);
    } else {
        res.send({ error: 'Address not found' });
    }
}

//Get Address by CustomerId
export const getAddressByCusId = async (req, res) => {
    const filteredAddress = await Address.find({ customer_Id: new ObjectId(req.params.cusId), isDelete: false });
    if (filteredAddress) {
        res.send(filteredAddress);
    } else {
        res.send({ error: 'Address not found' });
    }
}


// Update Address By ID
export const updateAddressById = async (req, res) => {
    const updateAddress = await Address.updateOne({ _id: new ObjectId(req.body._id) }, { $set: { "location": req.body.location, "landmark": req.body.landmark, "city": req.body.city, "state": req.body.state, "PIN": req.body.PIN, "latitude": req.body.latitude, "longitude": req.body.longitude } });
    if (updateAddress) {
        console.log(updateAddress)
        res.send("update success")
    } else {
        res.send("update failed")
    }
};


// Delete address by ID
export const deleteAddress = async (req, res) => {
    const address = await Address.updateOne({ _id: new ObjectId(req.params.id) }, { $set: { "isActive": false, "isDelete": true } });
    if (address) {
        res.send("deleted successfully")
    } else {
        res.send("deletion failed")
    }
}