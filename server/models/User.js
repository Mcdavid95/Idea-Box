import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  fullname: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  token: String,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date }
});

userSchema.methods.generateHash = password =>
  bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);

userSchema.methods.validPassword = password => bcrypt.compareSync(password, this.password);

const User = mongoose.model('User', userSchema);
export default User;
