import mongoose from "mongoose";
const { Schema } = mongoose;

// Assuming you have a Product model already defined elsewhere
const userSchema = new Schema({
    userName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    cart: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Product',
            default: null
        }
    ]
});

const User = mongoose.model('Users', userSchema);
export default User;
