import mongoose, { Document, Model } from "mongoose";

export interface IUserType {
    userId: string;
    displayName: string;
    email: string;
    image: string;
};

export interface IUser extends Document {
    userId: string;
    displayName: string;
    email: string;
    image: string;
};

const userSchema = new mongoose.Schema<IUser>({
    userId: {
        type: String,
        required: true
    },
    displayName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    image: {
        type: String
    }
}, { timestamps: true })


const userModel: Model<IUser> = mongoose.model<IUser>("Users", userSchema);

export default userModel;

