import mongoose from "mongoose";
import Joi from 'joi';
import { joiPasswordExtendCore } from 'joi-password';

const joiPassword = Joi.extend(joiPasswordExtendCore);

const UserSchema = new mongoose.Schema({ 
  username: {
    type: String,
    unique: true,
    requierd: [true, "user must have username (valid email address)"]
  },
  password: String
});

const UserModel = mongoose.model("users", UserSchema);

export default UserModel;

export const UserValidation = Joi.object({  
username: Joi.string().email().required(),
password: joiPassword
    .string()
    .min(6)
    .max(16)
    .minOfSpecialCharacters(1)
    .minOfLowercase(1)
    .minOfUppercase(1)
    .minOfNumeric(1)
    .noWhiteSpaces()
    .required()
  });

