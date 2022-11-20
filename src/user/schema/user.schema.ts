import * as mongoose from 'mongoose';
import { userRoles } from './user.roles';

export const UserSchema = new mongoose.Schema({
  firstName: {
    required: true,
    type: String,
  },
  lastName: {
    required: true,
    type: String,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    index: true,
  },
  phone: {
    type: String,
    required: true,
    unique: true,
    index: true,
  },
  role: {
    type: String,
    default: 'user',
    enum: [...userRoles],
  },
  password: {
    type: String,
    required: true,
  },
});
