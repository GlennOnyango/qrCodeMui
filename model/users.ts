import mongoose from "mongoose";

export interface User extends mongoose.Document {
  firstname: string;
  lastname: string;
  email: string;
  phone: number;
  password: string;
}

/* PetSchema will correspond to a collection in your MongoDB database. */
const UserSchema = new mongoose.Schema<User>({
  firstname: {
    type: String,
    required: [true, "Please provide a name for this pet."],
    maxlength: [60, "Name cannot be more than 60 characters"],
  },
  lastname: {
    type: String,
    required: [true, "Please provide the pet owner's name"],
    maxlength: [60, "Owner's Name cannot be more than 60 characters"],
  },
  email: {
    type: String,
    required: [true, "Please specify the species of your pet."],
    maxlength: [40, "Species specified cannot be more than 40 characters"],
  },
  phone: {
    type: Number,
  },
  password: {
    type: String,
  },
});

export default mongoose.models.User || mongoose.model<User>("User", UserSchema);
