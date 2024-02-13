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
      trim: true,
    },
    readingPara: {
      type: String,
      required: [true, "Reading paragraph is required"],
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
          max: {
            type: Number,
            validate: [
              validateChoicesLength,
              "Correct choice index out of range",
            ],
          },
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
              max: {
                type: Number,
                validate: [
                  validateChoicesLength,
                  "Correct choice index out of range",
                ],
              },
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

        correctChoiceIndex: {
          type: Number,
          required: true,
          min: 0,
          max: {
            type: Number,
            validate: [
              validateChoicesLength,
              "Correct choice index out of range",
            ],
          },
          enum:[0,1,2]
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

            correctChoiceIndex: {
              type: Number,
              required: true,
              min: 0,
              max: {
                type: Number,
                validate: [
                  validateChoicesLength,
                  "Correct choice index out of range",
                ],
              },
            },

            choices: [{ type: String }],
          },
        ],
      },
    ],
  },
  { timestamps: true }
);

/*Validator function checking if that index exists in the array of options*/
function validateChoicesLength(value) {
  return this.choices && value < this.choices.length;
}

export default mongoose?.models?.tests || mongoose?.model("tests", testSchema);
