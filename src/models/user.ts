/* Components
    username
        String
        Unique
        Required
        Trimmed
    email
        String
        Required
        Unique
        Must match a valid email address (look into Mongoose's matching validation)
    thoughts
        Array of _id values referencing the Thought model
    friends
        Array of _id values referencing the User model (self-reference)

    Create a virtual called friendCount that retrieves the length of the user's friends array field on query.
*/
import { Schema, model, Document, Types } from 'mongoose';

interface IUser extends Document {
  username: string;
  email: string;
  thoughts: Types.ObjectId[];
  friends: Types.ObjectId[];
}

// Schema to create User model
const userSchema = new Schema<IUser>(
  {
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true},
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
      },
    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Thought',
      },
    ],
    friends: [
        {
          type: Schema.Types.ObjectId,
          ref: 'User',
        },
      ],
  },
  {
    // Mongoose supports two Schema options to transform Objects after querying MongoDb: toJSON and toObject.
    // Here we are indicating that we want virtuals to be included with our response, overriding the default behavior
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

// Create a virtual property `friendCount` that gets and sets the user's full name
userSchema
  .virtual('friendCount')
  // Getter
  .get(function () {
    return this.friends.length;
  })

// Initialize our User model
const User = model<IUser>('user', userSchema);

export default User;