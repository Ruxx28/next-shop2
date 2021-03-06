import { model, Schema, models } from "mongoose";

const productSchema = new Schema({
    sku: { type: String, default: "" },
    status: { type: String, default: "published", } /* 'published'||'not released' */,
    slug: { type: String },
    name: { type: String, required: true },
    quantity: { type: Number, required: true },
    desMd: { type: String },
    desXl: { type: String },
    price: { type: Number, required: true },
    likeCount: { type: Number, default: 0 },
    buyCount: { type: Number, default: 0 },
    viewCount: { type: Number, default: 0 },
    isSale: {
      status: { type: Boolean, default: false },
      type: { type: String, default: "percent" } /* or value */,
      value: { type: Number, default: 0 },
      end: { type: Date, default: new Date() },
    },
    size: { type: Number, default: 0 },
    weight: { type: Number, default: 0 },
    image: {
      item: { type: String, default: null },
      lib: [String],
    },
    tag: { type: [String], required: false},
    category: {
      type: [Schema.Types.ObjectId],
      ref: "category",
      required: false,
    },
    supplier: { type: [Schema.Types.ObjectId], ref: "supplier", required: false},
}, { timestamps: true });

export default models.product || model("product", productSchema);