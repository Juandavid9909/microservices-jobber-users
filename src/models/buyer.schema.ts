import { IBuyerDocument } from "@juandavid9909/jobber-shared";
import { model, Model, Schema } from "mongoose";

const buyerSchema: Schema = new Schema(
  {
    username: {
      type: String,
      required: true,
      index: true
    },
    email: {
      type: String,
      required: true,
      index: true
    },
    profilePicture: {
      type: String,
      required: true
    },
    country: {
      type: String,
      required: true
    },
    isSeller: {
      type: Boolean,
      default: false
    },
    purchasedGigs: [
      {
        type: Schema.Types.ObjectId,
        ref: "Gig"
      }
    ],
    createdAt: {
      type: Date
    }
  },
  {
    versionKey: false
  }
);

export const BuyerModel: Model<IBuyerDocument> = model<IBuyerDocument>("Buyer", buyerSchema, "Buyer");
