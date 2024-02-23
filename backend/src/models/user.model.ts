import { Document, model, Schema} from 'mongoose';

export interface IUserDocument extends Document{
  email: string;
  password: string;
}

const UserSchema = new Schema<IUserDocument>({
  email: {
    type: String,
    required: true,
    lowercase: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

//console.log(Document, UserSchema)


export default model<IUserDocument>("User", UserSchema);
