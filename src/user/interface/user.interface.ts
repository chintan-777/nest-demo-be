import mongoose from 'mongoose';

export class User extends mongoose.Document {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  role: string;
  password: string;
}
