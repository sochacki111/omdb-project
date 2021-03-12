import mongoose, { Schema, Document } from 'mongoose';

export interface IComment extends Document {
  text: string;
  ownerName: string;
}

const CommentSchema: Schema = new Schema(
  {
    title: { type: String, required: true },
    ownerName: { type: String, required: true }
  },
  {
    timestamps: true
  }
);

const Comment = mongoose.model<IComment>('Comment', CommentSchema);

export default Comment;
