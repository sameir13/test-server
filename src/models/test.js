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
    headingAnswer: [{ type: String }],
    matchingHeading: [
      {
        matchingHeadingQuesTitle: { type: String },
        matchHeadingsChoices: [{ type: Number }],
        matchingHeadingAnswerIndex: {
          type: Number,
          required: true,
          min: 0,
        },
      },
    ],

    /*yes no and not given questions*/
    trueFalse: [
      {
        trueFalseQuestion: {
          type: String,
        },

        trueFalseChoices: [
          {
            answerValue: { type: String },
          },
          {
            answerValue: { type: String },
          },
          {
            answerValue: { type: String },
          },
        ],

        trueFalseCorrectIndex: {
          type: Number,
          required: true,
          min: 0,
        },
      },
    ],

    /*Match The information questions*/

    infoAnswers: [{ type: String }],
    matchingInformation: [
      {
        matchingInfoQuesTitle: { type: String },
        matchingInfoChoices: [{ type: Number }],
        matchingInfoAnswersIndex: {
          type: Number,
          required: true,
          min: 0,
        },
      },
    ],
  },
  { timestamps: true }
);

export default mongoose?.models?.tests || mongoose?.model("tests", testSchema);
