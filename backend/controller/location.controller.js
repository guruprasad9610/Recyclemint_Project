import mongoose from "mongoose";
import Location from "../model/location.model.js";
import axios from "axios";

const ObjectId = mongoose.Types.ObjectId;


// Add New Location
export const addLocation = async (req, res) => {
    const { location, city, state, PIN } = req.body;
    const newLocation = await Location.create({
        location: location,
        city: city,
        state: state,
        PIN: PIN
    });

    if (newLocation) {
        res.send(
            {
                error: false,
                message: "saved successfully"
            }
        );
    }
};


// Get all Locations
export const getAllLocation = async (req, res) => {
    const location = await Location.find({ isDelete:false });
    res.send(location)
}


// Get particular Location by ID
export const getLocationById = async (req, res) => {
    const location = await Location.find({ _id: new ObjectId(req.params.id), isDelete:false });
    res.send(location)
}




// Update Location
export const updateLocation = async (req, res) => {
    const updateLocation = await Location.updateOne({ _id: new ObjectId(req.body._id) }, { $set: { "location": req.body.location, "city": req.body.city, "state": req.body.state } });
    if (updateLocation) {
        console.log(updateLocation)
        res.send("update success")
    } else {
        res.send("update failed")
    }
};



// Delete Location by ID
export const deleteLocation = async (req, res) => {
    const location = await Location.updateOne({ _id: new ObjectId(req.params.id) }, { $set: { "isActive": false, "isDelete": true } });
    if (location) {
        res.send("deleted successfully")
    } else {
        res.send("deletion failed")
    }
}


// Validation of PIN code
export const validatePIN = async (req, res) => {
    const api = `https://api.postalpincode.in/pincode/${req.params.PIN}`
    axios.get(api).then(resp => {
        // console.log(resp.data);
        if (resp.data[0].Status != "Error") {
            res.send("valid pin")
        } else {
            res.send("invalid pin")
        }
    });
}

// Compare Location
export const compareLocation = async (req, res) => {
    const location = await Location.findOne({$and: [{ PIN: req.params.PIN },{isDelete: false}]});

    if (location) {
        return res.send({
            error: false,
            message: "service is available on the given pincode"
        });
    } else {
        res.send(
            {
                error: true,
                message: "service is not available on the given pincode"
            }
        );
    }
}

