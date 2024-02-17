"use client";
import { useState } from "react";
import React from "react";

const Page = () => {
  const [testQuestions, setTestQuestions] = useState({
    title: "",
    readingParaOne: "",
    readingParaSec: "",
    readingParaThird: "",
    multipleChoice: [
      {
        questionText: "",
        choices: [{ optionTitle: "", optionValue: "" }],
        correctChoiceIndex: 0,
      },
    ],
    trueFalse: [
      {
        trueFalseQuestion: "",
        trueFalseChoices: [
          { answerValue: 0 },
          { answerValue: 1 },
          { answerValue: 2 },
        ],
        trueFalseCorrectIndex: 0,
      },
    ],
  });

  console.log(testQuestions);

  const handleChange = (e, id, index) => {
    const { name, value } = e.target;

    if (name === "questionText" || name === "correctChoiceIndex") {
      const updatedQuestions = testQuestions?.multipleChoice?.map((v, i) => {
        if (i === id) {
          return { ...v, [name]: value };
        }
        return v;
      });

      setTestQuestions({ ...testQuestions, multipleChoice: updatedQuestions });
      return;
    }

    if (name === "optionTitle" || name === "optionValue") {
      const updatedOptions = testQuestions?.multipleChoice[id]?.choices?.map(
        (v, i) => {
          if (i === index) {
            return { ...v, [name]: value };
          }
          return v;
        }
      );

      setTestQuestions((prev) => ({
        ...prev,
        multipleChoice: prev.multipleChoice.map((mc, mcIndex) => {
          if (mcIndex === id) {
            return {
              ...mc,
              choices: updatedOptions,
            };
          }
          return mc;
        }),
      }));
      return;
    }

    if (name === "trueFalseQuestion" || name === "trueFalseCorrectIndex") {
      const updatedTrueFalse = testQuestions?.trueFalse?.map((v, i) => {
        if (i === id) {
          return { ...v, [name]: value };
        }
        return v;
      });

      setTestQuestions({ ...testQuestions, trueFalse: updatedTrueFalse });
      return;
    }

    setTestQuestions({ ...testQuestions, [name]: value });
  };


  // FUNCTIONS FOR ADDING GENERATING MORE TABS IN THE ARRAY------------------------------
  const addMorefaq = (e) => {
    e.preventDefault();

    setTestQuestions((prev) => {
      const updatedMultipleChoice = [
        ...prev.multipleChoice,
        {
          questionText: "",
          choices: [{ optionTitle: "", optionValue: "" }],
          correctChoiceIndex: 0,
        },
      ];

      return { ...prev, multipleChoice: updatedMultipleChoice };
    });
  };
  const addMoreTrueFalse = (e) => {
    e.preventDefault();
    setTestQuestions((prev) => {
      const newTrueFalseQuestion = [
        ...prev.trueFalse,
        {
          trueFalseQuestion: "",
          trueFalseChoices: [
            { answerValue: 0 },
            { answerValue: 1 },
            { answerValue: 2 },
          ],
          trueFalseCorrectIndex: 0,
        },
      ];

      return { ...prev, trueFalse: newTrueFalseQuestion };
    });
  };
  const addMoreOpt = (e, id) => {
    e.preventDefault();

    setTestQuestions((prev) => ({
      ...prev,
      multipleChoice: prev.multipleChoice.map((mc, mcIndex) => {
        if (mcIndex === id) {
          return {
            ...mc,
            choices: [...mc.choices, { optionTitle: "", optionValue: "" }],
          };
        }
        return mc;
      }),
    }));
  };

  // FUNCTIONS FOR REMOVING THE QUESTIONS-------
  const deleteMcqs = (i) => {
    setTestQuestions((prev) => {
      const afterRemovingMcqs = prev.multipleChoice?.filter(
        (items, index) => i != index
      );
      return { ...prev, multipleChoice: afterRemovingMcqs };
    });
  };

  const deleteMulipleChoiceOpts = (i, j) => {
    setTestQuestions((prev) => ({
      ...prev,
      multipleChoice: prev.multipleChoice.map((mc, mcIndex) => {
        if (mcIndex === i) {
          return {
            ...mc,
            choices: mc.choices.filter(
              (choice, choiceIndex) => j !== choiceIndex
            ),
          };
        }
        return mc;
      }),
    }));
  };

  const deleteTrueFalse = (i) => {
    setTestQuestions((prev) => {
      const afterRemovingTrueFalse = prev.trueFalse.filter(
        (items, index) => i != index
      );
      return { ...prev, trueFalse: afterRemovingTrueFalse };
    });
  };

  return (
    <div className="border border-red-300 p-6">
      <form className=" max-w-[700px] p-4 m-auto">
        <div className="border-3 border-black mb-2 flex flex-col flex-1 gap-2">
          <label htmlFor="title">Title</label>
          <input
            id="title"
            className="border border-gray-500"
            type="text"
            // value={testQuestions.title}
            name="title"
            onChange={handleChange}
          />
        </div>
        <div className="border-3 border-black mb-2 flex flex-col flex-1 gap-2">
          <label htmlFor="readingParaOne">para 1</label>
          <input
            className=" border border-gray-500"
            onChange={handleChange}
            type="text"
            name="readingParaOne"
            value={testQuestions.readingParaOne}
            id="readingParaOne"
          />
        </div>
        <div className="border-3 border-black mb-2 flex flex-col flex-1 gap-2">
          <label htmlFor="readingParaSec">para 2</label>
          <input
            className=" border border-gray-500"
            onChange={handleChange}
            type="text"
            name="readingParaSec"
            value={testQuestions.readingParaSec}
            id="readingParaSec"
          />
        </div>
        <div className="border-3 border-black mb-2 flex flex-col flex-1 gap-2">
          <label htmlFor="readingParaThird">para 3</label>
          <input
            className=" border border-gray-500"
            onChange={handleChange}
            type="text"
            value={testQuestions.readingParaThird}
            name="readingParaThird"
            id="readingParaThird"
          />
        </div>

        {/* WORKING -________________ */}

        {/* mcqs------------------------------------------------------------------------------------------------- */}
        <div className="my-7 p-7 border border-green-500">
          <h3>MULTIPLE CHOICE QUESTIONS</h3>

          {testQuestions?.multipleChoice?.map((v, i) => (
            <div
              key={i}
              className=" border border-yellow-600 my-6 p-3  relative"
            >
              <span
                onClick={() => deleteMcqs(i)}
                className={
                  i > 0
                    ? " rounded-[100%] p-1 cursor-pointer border border-red-400 bg-red-400 text-white absolute right-0 top-[-10px]"
                    : " hidden"
                }
              >
                remove
              </span>
              <div className="  mb-2 flex flex-col gap-2  ">
                <label htmlFor="readingParaThird">Question Text</label>
                <input
                  type="text"
                  name={"questionText"}
                  onChange={(e) => handleChange(e, i)}
                  value={testQuestions?.multipleChoice[i]?.questionText}
                  id={"questionText"}
                  className="border border-gray-500"
                />
              </div>
              <div className="border-3 border-black mb-2 flex flex-col flex-1 gap-2">
                <label htmlFor="readingParaThird">Correct Answer Index</label>
                <input
                  className=" border border-gray-500"
                  onChange={(e) => handleChange(e, i)}
                  value={testQuestions.multipleChoice[i].correctChoiceIndex}
                  name={"correctChoiceIndex"}
                  type="number"
                  id="correctChoiceIndex"
                />
              </div>

              <div className=" border rounded-sm p-2 my-5">
                {v?.choices?.map((opt, j) => (
                  <>
                    <div
                      key={j}
                      className=" flex gap-7  bg-gray-300  my-3 p-3 relative"
                    >
                      <span
                        className={
                          j > 0
                            ? " rounded-[100%] p-1 cursor-pointer  <text-2xlm></text-2xlm> text-red-400 absolute right-[-10px] top-[-10px]"
                            : " hidden"
                        }
                        onClick={() => deleteMulipleChoiceOpts(i, j)}
                      >
                        X
                      </span>
                      <div className="border-3 border-black mb-2 flex flex-col flex-1 gap-2">
                        <label htmlFor="readingParaThird">option title</label>

                        <input
                          className=" border border-gray-500"
                          onChange={(e) => handleChange(e, i, j)}
                          value={
                            testQuestions?.multipleChoice[i].choices[j]
                              .optionTitle
                          }
                          name={"optionTitle"}
                          type="text"
                          id="correctChoiceIndex"
                        />
                      </div>

                      <div className="border-3 border-black mb-2 flex flex-col flex-1 gap-2">
                        <label htmlFor="readingParaThird">option value</label>
                        <input
                          className=" border border-gray-500"
                          onChange={(e) => handleChange(e, i, j)}
                          value={
                            testQuestions?.multipleChoice[i].choices[j]
                              .optionValue
                          }
                          name={"optionValue"}
                          type="text"
                          id="optionValue"
                        />
                      </div>
                    </div>
                  </>
                ))}
              </div>
              <button
                className="border bg-blue-300 p-1 rounded-sm text-white"
                onClick={(e) => addMoreOpt(e, i)}
              >
                Add More Option
              </button>
            </div>
          ))}
          <button
            className="border bg-blue-300 p-1 rounded-sm text-white"
            onClick={(e) => addMorefaq(e)}
          >
            Add More Question
          </button>
        </div>

        {/* true False Form ------------------------------------------------------------------------------------*/}
        <div className=" border border-red-400 my-7 p-4 ">
          <h1>TRUE FALSE</h1>
          {testQuestions?.trueFalse?.map((v, i) => (
            <div
              key={i}
              className="  border border-yellow-400 my-4 p-5 relative"
            >
              <>
                <span
                  onClick={() => deleteTrueFalse(i)}
                  className={
                    i > 0
                      ? " rounded-[100%] p-1 cursor-pointer border border-red-400 bg-red-400 text-white absolute right-0 top-[-10px]"
                      : " hidden"
                  }
                >
                  remove
                </span>
                <div className="  mb-2 flex flex-col gap-2   ">
                  <label htmlFor="readingParaThird">Question Text</label>
                  <input
                    type="text"
                    onChange={(e) => handleChange(e, i)}
                    value={testQuestions?.trueFalse[i]?.trueFalseQuestion}
                    id={"trueFalseQuestion"}
                    name={"trueFalseQuestion"}
                    className="border border-gray-500"
                  />
                </div>

                <div className=" border border-black p-1 my-4 flex justify-between">
                  <span className=" text-sm text-gray-400">YES: 1</span>
                  <span className=" text-sm text-gray-400">NO: 0</span>
                  <span className=" text-sm text-gray-400">NOT GIVEN: 2</span>
                </div>

                <div className="border-3 border-black mb-2 flex flex-col flex-1 gap-2">
                  <label htmlFor="readingParaThird">Correct Answer Index</label>
                  <input
                    className=" border border-gray-500"
                    onChange={(e) => handleChange(e, i)}
                    value={testQuestions.trueFalse[i].trueFalseCorrectIndex}
                    name={"trueFalseCorrectIndex"}
                    type="number"
                    id="trueFalseCorrectIndex"
                  />
                </div>
              </>
            </div>
          ))}

          <button
            className="border bg-blue-300 p-1 rounded-sm text-white"
            onClick={(e) => addMoreTrueFalse(e)}
          >
            Add More True False Questions
          </button>
        </div>
      </form>
    </div>
  );
};

export default Page;
