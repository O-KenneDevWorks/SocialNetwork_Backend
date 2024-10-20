/* Components
    thoughtText 
        String
        Required
        Must be between 1 and 280 characters
    createdAt 
        Date
        Set default value to the current timestamp
        Use a getter method to format the timestamp on query
    username string required
        String
        Required
    reactions
        Array of nested documents created with the reactionSchema

    Create a virtual called reactionCount that retrieves the length of the thought's reactions array field on query.
*/
import { Schema, model, Document, Types } from 'mongoose';

interface IThought extends Document {
  thoughtText: string;
  createdAt: Date;
  username: string;
  reactions: Types.ObjectId[];
}

// Schema to create User model
const thoughtSchema = new Schema<IThought>(
  {
    thoughtText: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 280,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    username: {
      type: String,
      required: true,
    },
    reactions: [
      {
        type: Schema.Types.ObjectId,
        ref: 'reactions',
      },
    ],
  },
  {
    // Mongoose supports two Schema options to transform Objects after querying MongoDb: toJSON and toObject.
    // Here we are indicating that we want virtuals to be included with our response, overriding the default behavior
    toJSON: {
      virtuals: true,
      getters: true,  // Enable getters in JSON output
    },
    id: false,
  }
);

// Create a virtual called reactionCount that retrieves the length of the thought's reactions array field on query.
thoughtSchema
  .virtual('reactionCount')
  // Getter
  .get(function () {
    return this.reactions.length;
  });

// Initialize our User model
console.log('Registering Thought model');
const Thought = model<IThought>('Thought', thoughtSchema);
console.log('Thought model registered');
export default Thought;