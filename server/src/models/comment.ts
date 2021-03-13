import mongoose, { Schema, Document } from 'mongoose';

export interface IComment extends Document {
  text: string;
  ownerName: string;
  movie: {
    type: mongoose.Schema.Types.ObjectId;
    ref: 'Movie';
    _id: any;
  };
}

const CommentSchema: Schema = new Schema(
  {
    text: { type: String, required: true },
    ownerName: { type: String, required: true },
    movie: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Movie'
    }
  },
  {
    timestamps: true
  }
);

const Comment = mongoose.model<IComment>('Comment', CommentSchema);

export default Comment;
