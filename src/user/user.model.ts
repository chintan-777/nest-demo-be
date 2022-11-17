import * as mongoose from 'mongoose';
import { USER_ROLE } from './user.roles';

export const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    match:
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  },
  role: { type: String, enum: USER_ROLE },
  phone: {
    type: String,
    index: true,
    required: true,
    match: /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/,
  },
  password: {
    type: String,
    required: true,
    match: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
  },
});

export interface User extends mongoose.Document {
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  phone: string;
  password: string;
}
