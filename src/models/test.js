import mongoose from "mongoose";

const testSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
    },
    slug: {
      type: String,
      required: [true, "Slug is required"],
      unique: true,
    },
    readingParaOne: {
      type: String,
    },
    readingParaSec: {
      type: String,
    },
    readingParaThird: {
      type: String,
    },

    /*mcqs based test question*/
    multipleChoice: [
      {
        questionText: {
          type: String,
        },

        choices: [
          {
            optionTitle: { type: String },
            optionValue: { type: String },
          },
        ],
        correctChoiceIndex: {
          type: Number,
          required: true,
          min: 0,
        },
      },
    ],

    /*Match The information questions*/
    matchingHeading: [
      {
        answerInfo: [{ answerOption: String }],
        questionOptions: [
          {
            optionTitle: { type: String },
            choices: [{ type: String }],
            correctChoiceIndex: {
              type: Number,
              required: true,
              min: 0,
            },
          },
        ],
      },
    ],

    /*yes no and not given questions*/
    trueFalse: [
      {
        questionText: {
          type: String,
        },

        choices: [
          {
            optionValue: { type: String },
          },
          {
            optionValue: { type: String },
          },
          {
            optionValue: { type: String },
          },
        ],

        correctChoiceIndex: {
          type: Number,
          required: true,
          min: 0,
        },

        

      },
    ],

    /*Match The information questions*/
    matchingInformation: [
      {
        answerInfo: [
          {
            answerOption: String,
          },
        ],
        questionOptions: [
          {
            optionTitle: { type: String },
            choices: [{ type: String }],
            correctChoiceIndex: {
              type: Number,
              required: true,
              min: 0,
            },
          },
        ],
      },
    ],
  },
  { timestamps: true }
);

export default mongoose?.models?.tests || mongoose?.model("tests", testSchema);
