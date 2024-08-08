import mongoose, { Document, Model } from "mongoose";

export enum ROLE {
    ADMIN = "admin",
    USER = "user",
    SUPER_ADMIN = "superAdmin"
}

type Name = {
    fname: string;
    lname: string;
}
export interface IUserType {
    userId: string;
    displayName: Name;
    email: string;
    image: string;
    predictionWinScore: number;
    predictionLoseScore: number;
    totalPredictions: number;
    role: "admin" | "user" | "superAdmin";
    teamId: string | null;
};

export interface IUser extends Document {
    userId: string;
    displayName: Name;
    email: string;
    image: string;
    predictionWinScore: number;
    predictionLoseScore: number;
    totalPredictions: number;
    role: ROLE;
    teamId: string | null;
};

const userSchema = new mongoose.Schema<IUser>({
    userId: {
        type: String,
        required: true,
        unique: true,
    },
    displayName: {
        fname: {
            type: String,
            required: true
        },
        lname: {
            type: String,
        }
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    image: {
        type: String,
        default: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.nicepng.com%2Fpng%2Ffull%2F128-1280406_user-icon-png.png&f=1&nofb=1&ipt=79e0e5827a46435b66aa6f2de64329d9e9321d449c98ead2072dd5747ab7a57b&ipo=images"
    },
    predictionLoseScore: {
        type: Number,
        default: 0
    },
    predictionWinScore: {
        type: Number,
        default: 0
    },
    totalPredictions: {
        type: Number,
        default: 0
    },
    role: {
        type: String,
        default: ROLE.USER
    },
    teamId: {
        type: String
    }
}, { timestamps: true })


const userModel: Model<IUser> = mongoose.model<IUser>("Users", userSchema);

export default userModel;

