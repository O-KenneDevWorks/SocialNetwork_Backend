/* Components
    reactionId
        Use Mongoose's ObjectId data type
        Default value is set to a new ObjectId
    reactionBody
        String
        Required
        280 character maximum
    username
        String
        Required
    createdAt
        Date
        Set default value to the current timestamp
        Use a getter method to format the timestamp on query

    This will not be a model, but rather will be used as the reaction field's subdocument schema in the Thought model.
*/

import { Schema, Document } from 'mongoose';

export interface IReaction extends Document {
  reactionBody: string;
  username: string;
  createdAt: Date;
}

export const reactionSchema = new Schema<IReaction>(
  {
    reactionBody: {
      type: String,
      required: true,
      maxlength: 280,
    },
    username: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    toJSON: {
      getters: true,
    },
    id: false,
  }
);

export default reactionSchema;
