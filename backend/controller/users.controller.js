import mongoose from "mongoose";
import Users from "../model/users.model.js";
import multer from 'multer';
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



// Internal Login
export const usersLogin = async (req, res) => {
    const { email, password } = req.body;
    const users = await Users.findOne({ email });

    if (users && (await users.comparePassword(password))) {
        return res.json({
            _id: users._id,
            name: users.name,
            email: users.email,
            mobile: users.mobile,
            usertype: users.usertype,
            imageURL: users.imageURL
        });
    } else {
        res.send(
            {
                error: true,
                message: "User doesn't exist"
            }
        );
    }
}


// Create Users
export const createUsers = async (req, res) => {
    upload(req, res, (err) => {
        console.log(req.file);
        if (err) {
            console.log(err)
        } else {
            console.log("test",req.file)
            if(req.file){
                console.log("Hola, File is there");
                const { name, email, password, usertype, mobile } = req.body;
                const users = Users.create({
                    name: name,
                    email: email,
                    password: password,
                    usertype: usertype,
                    mobile: mobile,
                    image: {
                        contentType: 'image',
                        data: req.file.filename
                    },
                    imageURL: 'uploads/' + req.file.filename
                });
                if (users) {
                    res.send(
                        {
                            error: false,
                            message: "saved successfully"
                        }
                    );
                }
            }else{
                console.log("Hola, File is not there");
                const { name, email, password, usertype, mobile } = req.body;
                const users = Users.create({
                    name: name,
                    email: email,
                    password: password,
                    usertype: usertype,
                    mobile: mobile
                });
                if (users) {
                    res.send(
                        {
                            error: false,
                            message: "saved successfully"
                        }
                    );
                }
            }

        }
    })
};



// Get Users by ID
export const getUsersById = async (req, res) => {
    const users = await Users.find({ _id: new ObjectId(req.params.id), isDelete: false });
    res.send(users)
}


// Get all Users (excluding Admin) by usertype
export const getAllUsers = async (req, res) => {
    let query = { 'usertype': { $ne: "admin" }, isDelete:false}
    if (req.query.utype) {
        query = { 'usertype': req.query.utype, isDelete:false }
    }
    const users = await Users.find(query);
    res.send(users)
}



// Update Users by ID
export const updateUsers = async (req, res) => {
    upload(req, res, (err) => {
        if (err) {
            console.log(err)
        } else {
            console.log("test", req.file)
            if (req.file) {
                console.log("Hola, File is there");
                Users.updateOne({ "_id": req.body._id }, {
                    $set: {
                        "name": req.body.name,
                        "email": req.body.email,
                        "image": {
                            contentType: 'image',
                            data: req.file.filename
                        },
                        "imageURL": 'uploads/' + req.file.filename,
                        "mobile": req.body.mobile,
                        "password": req.body.password,
                        "usertype": req.body.usertype,
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
                Users.updateOne({ "_id": req.body._id }, {
                    $set: {
                        "name": req.body.name,
                        "email": req.body.email,
                        "mobile": req.body.mobile,
                        "password": req.body.password,
                        "usertype": req.body.usertype,
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


// Delete users by ID
export const deleteusersById = async (req, res) => {
    const users = await Users.updateOne({ _id: new ObjectId(req.params.id) }, { $set: { "isActive": false, "isDelete": true } });
    if (users) {
        res.send("deleted successfully")
    } else {
        res.send("deletion failed")
    }
}