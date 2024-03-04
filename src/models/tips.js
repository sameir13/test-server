import mongoose, { mongo } from "mongoose";

const tipsSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Title Required!"],
    trim: true,
  },
  metaTitle: {
    type: String,
    required: [true, "Meta Title Required!"],
    trim: true,
  },
  metaDesc: {
    type: String,
    required: [true, "Meta Description Required!"],
    trim: true,
  },
  slug: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  desc: {
    type: String,
    required: [true, "Description Required!"],
    trim: true,
  },
  imgUrl: {
    type: String,
    required: [true, "Featured Image Required!"],
  },
  imgAlt: {
    type: String,
    required: [true, "Image Alternate Text Required!"],
  },
  rating: {
    type: Number,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref:"users"
  },
  category:{
    type:String,
    required:[true, "Category Required!!!"]
  }
},{timestamps:true})


export default mongoose?.models?.tips || mongoose?.model("tips", tipsSchema)
