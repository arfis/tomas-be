import mongoose, {
    Schema
} from 'mongoose';
import isEmail from 'validator/lib/isEmail';

import {
    passwordReg
} from '../validators/validators';
import {hashSync, compareSync} from "bcrypt-nodejs";
import jwt from 'jsonwebtoken';
import {devConfig} from "../constants/constants";

const UserSchema = new Schema({
    email: {
        type: String,
        unique: true,
        required: [true, 'Email is required!'],
        trim: true,
        validate: {
            validator(email) {
                return isEmail(email);
            },
            message: '{VALUE} is not a valid email!',
        },
    },
    firstName: {
        type: String,
        required: [true, 'FirstName is required!'],
        trim: true,
    },
    lastName: {
        type: String,
        required: [true, 'LastName is required!'],
        trim: true,
    },
    userName: {
        type: String,
        required: [true, 'UserName is required!'],
        trim: true,
        unique: true,
    },
    password: {
        type: String,
        required: [true, 'Password is required!'],
        trim: true,
        minlength: [6, 'Password need to be longer!'],
        validate: {
            validator(password) {
                return passwordReg.test(password);
            },
            message: '{VALUE} is not a valid password!',
        },
    },
})
UserSchema.pre('save', function (next) {
    if (this.isModified('password')) {
        this.password = hashSync(this.password);
    }
    return next();
})

UserSchema.methods = {
    _hashPassword(password) {
        return hashSync(password);
    },
    authenticateUser(password) {
        return compareSync(password, this.password);
    },
    createToken() {
        return jwt.sign(
            {
                _id: this._id,
            },
            devConfig.JWT_SECRET,
            {
                expiresIn: devConfig.tokenLife
            }
        );
    },
    createRefreshToken() {
        return jwt.sign(
            {
                _id: this._id,
            },
            devConfig.REFRESH_TOKEN_SECRET,
            {
                expiresIn: devConfig.refreshTokenLife
            }
        )
    },
    toJSON() {
        return {
            _id: this._id,
            userName: this.userName,
            token: `JWT ${this.createToken()}`,
            refreshToken: this.createRefreshToken()
        };
    },
};

export default mongoose.model('User', UserSchema);
