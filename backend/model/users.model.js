import mongoose from "mongoose";
import bcrypt from "bcrypt";

const usersSchema = mongoose.Schema({
    name: {
        type: String,
        default: ""
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },

    usertype: String,
    
    mobile: {
        type: String,
        default: ""
    },
    image: {
        contentType: String,
        data: Buffer
    },
    imageURL: String,
    isActive: {
        type: Boolean,
        default: true
    },
    isDelete: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
});



// Password
usersSchema.pre('save', function (next) {
    if (this.isModified('password')) {
        bcrypt.hash(this.password, 8, (err, hash) => {
            {
                if (err) return next(err);

                this.password = hash;
                next();
            }
        });
    };
});

usersSchema.methods.comparePassword = async function (password) {
    if (!password) throw new Error('Password is missing, cannot compare!');
    try {
        const result = await bcrypt.compare(password, this.password);
        return result;
    } catch (error) {
        console.log('Error while comparing password!', error.message);
    }
};

const Users = mongoose.model("users", usersSchema);
export default Users;
