import mongoose from "mongoose";
import Customers from "../model/customer.model.js";
import multer from "multer";
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



// External Login
export const login = async (req, res) => {
    Customers.findOne({
        mobile: req.body.mobile
    }).then((data) => {
        console.log("user", data)
        if (data) {
            // generate OTP
            const otp = Math.floor(1000 + Math.random() * 9000);
            console.log(otp);
            //update OTP
            Customers.updateOne({ _id: data._id }, { $set: { OTP: otp } }).then(userData => {
                if (userData) {
                    res.send({
                        error: false,
                        customerDetails: data,
                        message: "LoggedIn successfully"
                    })
                } else {
                    res.send({
                        error: true,
                        message: "Some error occured"
                    })
                }
            })
            // response send

        } else {
            //create customer with OTP
            const otp = Math.floor(1000 + Math.random() * 9000);
            console.log(otp);
            let customerDetails = new Customers({
                mobile: req.body.mobile,
                OTP: otp
            })
            customerDetails.save()
                .then((data1) => {

                    console.log(data1)

                    //response send
                    let response = {
                        message: "Saved successfully",
                        customerDetails: data1,
                        // isComplete: false
                    }

                    console.log(response);

                    res.send(response)


                }).catch(err => [
                    res.status(500).send({
                        error: true,
                        message: err
                    })
                ])
        }

    })
};

// verify OTP
export const verifyOTP = async (req, res) => {
    Customers.findOne({ mobile: req.body.mobile, OTP: req.body.OTP }).then(customerData => {
        console.log(customerData);
        if (customerData!=null) {
            res.send({
                error: false,
                message: "OTP verified"
            })
        } else {
            res.send({
                error: true,
                message: "Invalid OTP"
            })
        }
    })
}

// Get Customers by mobile
export const getCustomersByPhone = async (req, res) => {
    const customers = await Customers.find({ mobile: (req.params.phone), isDelete: false });
    res.send(customers)
}

// Complete Profile
export const updateProfile = async (req, res) => {
    upload(req, res, (err) => {
        if (err) {
            console.log(err)
        } else {
            console.log("test", req.file)
            if (req.file) {
                console.log("Hola, File is there");
                Customers.updateOne({ "mobile": req.body.mobile }, {
                    $set: {
                        "name": req.body.name,
                        "email": req.body.email,
                        "image": {
                            contentType: 'image',
                            data: req.file.filename
                        },
                        "imageURL": 'uploads/' + req.file.filename,
                        "isComplete": true
                    }
                }).then(resp => {
                    if (resp) {
                        console.log(resp)
                        res.send("update success")
                    } else {
                        res.send("update failed")
                    }
                })
            } else {
                console.log("Hola, File is not there");
                Customers.updateOne({ "mobile": req.body.mobile }, {
                    $set: {
                        "name": req.body.name,
                        "email": req.body.email,
                        "isComplete": true
                    }
                }).then(resp => {
                    if (resp) {
                        console.log(resp)
                        res.send("update success")
                    } else {
                        res.send("update failed")
                    }
                })
            }

        }
    })

};


// Get all Customers' Details
export const getAllCustomers = async (req, res) => {
    const customers = await Customers.find({ isDelete: false});
    res.send(customers)
}


// Delete customer by ID
export const deletecustomerById = async (req, res) => {
    const customers = await Customers.updateOne({ _id: new ObjectId(req.params.id) }, { $set: { "isActive": false, "isDelete": true } });
    if (customers) {
        res.send("deleted successfully")
    } else {
        res.send("deletion failed")
    }
}