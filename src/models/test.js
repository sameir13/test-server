import mongoose from "mongoose";

const testSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
    },


    slug:{
        type:String,
        required:[true,"Slug is required"],
        unique:true,
        trim:true
    },

    readingPara: {
      type: String,
      required: [true, "Reading paragraph is required"],
    },

    /*mcqs based test question*/
    MultipleChoice: [
      {
        QuestionID: {
          type: Number,
        },
        QuestionText: {
          type: String,
        },
        CorrectAns: {
          type: String,
        },

        QuestionOptions: [
          {
            optionTitle: { type: String },
            optionValue: { type: String },
          },
        ],
      },
    ],

    /*yes no and not given questions*/
    TrueFalse: [
      {
        QuestionID: {
          type: Number,
          default: 1,
        },
        QuestionText: {
          type: String,
        },
        CorrectAns: {
          type: String,
        },

        QuestionOptions: [
          {
            optionTitle: { type: String },
            optionValue: { type: String },
          },
          {
            optionTitle: { type: String },
            optionValue: { type: String },
          },
          {
            optionTitle: { type: String },
            optionValue: { type: String },
          },
        ],
      },
    ],

    /*Match The Headings the quesions*/
    MatchingHeading: [
      {
        QuestionID: {
          type: Number,
          default: 1,
        },
        QuestionText: {
          type: String,
        },
        CorrectAns: {
          type: String,
        },

        QuestionOptions: [
          {
            optionTitle: { type: String },
            optionValue: { type: String },
          },
        ],
      },
    ],
  },
  { timestamps: true }
);

export default mongoose?.models?.tests || mongoose?.model("tests", testSchema);
