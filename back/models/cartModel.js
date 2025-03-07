import { Schema , model } from "mongoose";

const cartItemSchema = new Schema({
  product: {
    type: Schema.Types.ObjectId,
    ref: "product",
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    min: 1,
  },
  attributes: {
    type: Map,
    of: String,
  },
});

const cartSchem = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    items: [cartItemSchema],
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {timestamps: true} // This automatically manages `createdAt` and `updatedAt`
);

const cartModel = model("cart", cartSchem);

export default cartModel;
