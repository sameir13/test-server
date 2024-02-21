"use client";
import axios from "axios";
import { useState, useEffect } from "react";
import React from "react";
import { toast, Toaster } from "react-hot-toast";

const Page = () => {
  const [isLoading, setIsloading] = useState(false);
  const [testQuestions, setTestQuestions] = useState({
    title: "",
    readingParaOne: "",
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
    matchingHeading: [
      {
        matchingHeadingQuesTitle: "",
        matchingHeadingAnswerIndex: 0,
        matchHeadingsChoices: [],
      },
    ],
    matchingInformation: [
      {
        matchingInfoQuesTitle: "",
        matchingInfoAnswersIndex: 0,
        matchingInfoChoices: [],
      },
    ],
  });

  const handleChange = (e, id, index) => {
    const { name, value, type, checked } = e.target;

    if (name === "questionText") {
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
    if (
      name === "matchingHeadingQuesTitle" ||
      name === "matchingHeadingAnswerIndex"
    ) {
      const updatedTrueFalse = testQuestions?.matchingHeading?.map((v, i) => {
        if (i === id) {
          return { ...v, [name]: value };
        }
        return v;
      });

      setTestQuestions({ ...testQuestions, matchingHeading: updatedTrueFalse });
      return;
    }

    if (
      name === "matchingInfoQuesTitle" ||
      name === "matchingInfoAnswersIndex"
    ) {
      const updatedInformationHandler = testQuestions?.matchingInformation?.map(
        (v, i) => {
          if (i === id) {
            return { ...v, [name]: value };
          }
          return v;
        }
      );

      setTestQuestions({
        ...testQuestions,
        matchingInformation: updatedInformationHandler,
      });

      return;
    }

    setTestQuestions({ ...testQuestions, [name]: value });
  };

  const handleCheckboxChange = (i, j) => {
    setTestQuestions((prevQuestions) => ({
      ...prevQuestions,
      multipleChoice: prevQuestions.multipleChoice.map(
        (question, questionIndex) => {
          if (questionIndex === i) {
            return {
              ...question,
              correctChoiceIndex: j,
            };
          }
          return question;
        }
      ),
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

  const deleteMatchHeadingQuestions = (i) => {
    setTestQuestions((prev) => {
      const afterRemovingMatchHeadingQuestion = prev.matchingHeading?.filter(
        (items, index) => i != index
      );

      return { ...prev, matchingHeading: afterRemovingMatchHeadingQuestion };
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

  const deleteMatchInfoQuestions = (i) => {
    setTestQuestions((prev) => {
      const afterRemovingMatchInfoQuestions = prev?.matchingInformation?.filter(
        (items, index) => i != index
      );

      return { ...prev, matchingInformation: afterRemovingMatchInfoQuestions };
    });
  };

  // Matching heading answer options adding----------------------------
  const [data, setdata] = useState();
  const [tags, setTags] = useState([]);
  const addTag = (e) => {
    e.preventDefault();
    if (!data) {
      return;
    }
    var copy = tags;
    copy.push(data);
    setTags(copy);
    setdata("");
    setTestQuestions((prev) => {
      const updatedMatchingHeading = prev.matchingHeading.map((mh) => {
        const updatedMatchHeadingsChoices = tags.map((tag, tagsIndex) => {
          return tagsIndex;
        });

        return {
          ...mh,
          matchHeadingsChoices: updatedMatchHeadingsChoices,
        };
      });

      return {
        ...prev,
        matchingHeading: updatedMatchingHeading,
      };
    });
  };
  // Handle KeyDown Funcitons ------------/
  const handlekeydown = (e) => {
    if (e.key === "Enter") {
      addTag(e);
    }
  };

  // Handle Answer Delete -----------------/
  const handleDel = (i) => {
    const updatedTags = [...tags];
    updatedTags.splice(i, 1);
    setTags(updatedTags);
    setTestQuestions((prev) => {
      const updatedMatchingHeading = prev.matchingHeading.map((mh) => {
        const updatedMatchHeadingsChoices = updatedTags.map(
          (tag, tagsIndex) => {
            return tagsIndex;
          }
        );

        return {
          ...mh,
          matchHeadingsChoices: updatedMatchHeadingsChoices,
        };
      });

      return {
        ...prev,
        matchingHeading: updatedMatchingHeading,
      };
    });
  };

  // Matching Information answer options adding---------------------------------------
  const [infoData, setInfoData] = useState();
  const [matchingInformationValues, setMatchingInformationValues] = useState(
    []
  );
  const addInfoAnswers = (e) => {
    e.preventDefault();
    if (!infoData) {
      return;
    }
    var copy = matchingInformationValues;
    copy.push(infoData);
    setMatchingInformationValues(copy);
    setInfoData("");

    setTestQuestions((prev) => {
      const updatedMatchingInfo = prev.matchingInformation.map((mI) => {
        const updatedMatchingInfoChoices = matchingInformationValues?.map(
          (ans, ansIndex) => {
            return ansIndex;
          }
        );

        return {
          ...mI,
          matchingInfoChoices: updatedMatchingInfoChoices,
        };
      });

      return {
        ...prev,
        matchingInformation: updatedMatchingInfo,
      };
    });
  };
  const handleEnterDown = (e) => {
    if (e.key === "Enter") {
      addInfoAnswers(e);
    }
  };
  const handleInfoAnsDel = (i) => {
    setMatchingInformationValues((prevMatchingInfoValues) => {
      const copyInfoAnswers = [...prevMatchingInfoValues];
      copyInfoAnswers.splice(i, 1);

      setTestQuestions((prev) => {
        const updatedMatchingInfo = prev.matchingInformation.map((mI) => {
          const updatedMatchingInfoChoices = copyInfoAnswers.map(
            (ans, ansIndex) => {
              return ansIndex;
            }
          );

          return {
            ...mI,
            matchingInfoChoices: updatedMatchingInfoChoices,
          };
        });

        return {
          ...prev,
          matchingInformation: updatedMatchingInfo,
        };
      });

      return copyInfoAnswers;
    });
  };
  // ends here------------------------------------------------------------------------

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
  const addMoreMatchHeadings = (e) => {
    e.preventDefault();
    setTestQuestions((prev) => {
      const updatedHeadingQuestion = [
        ...prev.matchingHeading,
        {
          matchingHeadingQuesTitle: "",
          matchingHeadingAnswerIndex: 0,
          matchHeadingsChoices: [],
        },
      ];

      return { ...prev, matchingHeading: updatedHeadingQuestion };
    });
  };

  const addMoreMatchInfoQuestions = (e) => {
    e.preventDefault();
    setTestQuestions((prev) => {
      const afterAddingMoreInfoQuestions = [
        ...prev.matchingInformation,
        {
          matchingInfoQuesTitle: "",
          matchingInfoAnswersIndex: 0,
          matchingInfoChoices: [],
        },
      ];

      return { ...prev, matchingInformation: afterAddingMoreInfoQuestions };
    });
  };

  // alphabets array for the choices
  const alphabetsArray = [
    "a",
    "b",
    "c",
    "d",
    "e",
    "f",
    "g",
    "h",
    "i",
    "j",
    "k",
    "l",
    "m",
    "n",
    "o",
    "p",
    "q",
    "r",
    "s",
    "t",
    "u",
    "v",
    "w",
    "x",
    "y",
    "z",
  ];

  // const [rendering, setRendering] = useState([0]);

  // const selectTypeRendering = [
  //   {
  //     lable: "Multiple Choice Questions",
  //     typeKey: 1,
  //   },
  //   {
  //     lable: "Match The Heading",
  //     typeKey: 2,
  //   },
  //   {
  //     lable: "True false",
  //     typeKey: 3,
  //   },
  //   {
  //     lable: "Match The Information",
  //     typeKey: 4,
  //   },
  // ];
  // const handleTabClick = (typeKey) => {
  //   setRendering((prevRendering) => {
  //     if (!prevRendering.find((tab) => tab.typeKey === typeKey)) {
  //       return [...prevRendering, typeKey];
  //     }
  //     return prevRendering;
  //   });
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsloading(true);
      const sendDataToDb = await axios.post("http://localhost:3000/api/test", {
        ...testQuestions,
        headingAnswer: tags,
        infoAnswers: matchingInformationValues,
      });

      // console.log(sendDataToDb?.data?.success)
      if (sendDataToDb?.data?.success) {
        toast.success("Test Upload Successfully");
      }
    } catch (error) {
      console.log(error);
      if (error?.response?.data?.message) {
        toast.error(error?.response?.data?.message);
      }
    } finally {
      setIsloading(false);
    }
  };

  return (
    <>
      <Toaster />
      <div className="border border-red-300 p-6">
        <form onSubmit={handleSubmit} className=" max-w-[700px] p-4 m-auto">
          <div className="border-3 border-black mb-2 flex flex-col flex-1 gap-2">
            <label htmlFor="title">Title</label>
            <input
              id="title"
              className="border border-gray-500"
              type="text"
              value={testQuestions.title}
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

          {/* ADDING THE TABS FOR THE RENDERING CONDITIONS----------------------------------------------------- */}

          {/* <div className="  my-5 flex justify-center items-center ">
          {selectTypeRendering?.map((v, i) => (
            <div key={i} className=" ">
              <button
                className="   border text-white bg-indigo-500 text-sm shadow-lg px-2 py-1 rounded-sm"
                onClick={() => handleTabClick(v.typeKey)}
              >
                {v.lable}
              </button>
            </div>
          ))}
        </div> */}

          {/* FORM HANDLING FOR THE ARRAYS IN THE USESTATES ---------------------------------------------------------------------------------------------------------------------------------- */}

          {/* mcqs------------------------------------------------------------------------------------------------- */}
          <div className="my-7 p-7 border border-green-500">
            <h3>MULTIPLE CHOICE QUESTIONS</h3>

            {testQuestions?.multipleChoice?.map((v, i) => (
              <div key={i}>
                <div className=" border border-yellow-600 my-6 p-3  relative">
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
                  <div className=" border rounded-sm p-2 my-5">
                    {v?.choices?.map((opt, j) => (
                      <div key={j}>
                        <div className=" flex gap-7  bg-gray-300  my-3 p-3 relative">
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
                            <label htmlFor="readingParaThird">
                              option title
                            </label>

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
                            <label htmlFor="readingParaThird">
                              option value
                            </label>
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

                        <div className="flex items-center">
                          <label
                            htmlFor={`checkbox-${i}-${j}`}
                            className="mr-2"
                          >
                            Set as Correct
                          </label>
                          <input
                            id={`checkbox-${i}-${j}`}
                            type="checkbox"
                            checked={j === v.correctChoiceIndex}
                            onChange={() => handleCheckboxChange(i, j)}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                  <button
                    className="border bg-blue-300 p-1 rounded-sm text-white"
                    onClick={(e) => addMoreOpt(e, i)}
                  >
                    Add More Option
                  </button>
                </div>
              </div>
            ))}
            <button
              className="border bg-blue-300 p-1 rounded-sm text-white"
              onClick={(e) => addMorefaq(e)}
            >
              Add More Question
            </button>
          </div>

          {/* matching headings inputs her---------------------------------------e */}
          <div className=" border border-red-400 my-8 p-7">
            <h1 className=" mb-5">MATCH THE HEADING QUESTIONS </h1>
            <div className="  mb-3">
              <label
                className="text-sm text-gray-500 tracking-wider"
                htmlFor="tags"
              >
                Answer Options
              </label>

              <div className="input">
                <div className="inputbox">
                  <input
                    id="tags"
                    value={data}
                    type="text"
                    placeholder="Add Tags"
                    onKeyDown={handlekeydown}
                    onChange={(e) => setdata(e.target.value)}
                    className=" border p-2 w-full rounded-md mt-1 text-gray-400 focus:text-gray-500 placeholder:text-gray-300 outline-none focus:ring-2"
                  />
                </div>
              </div>

              {tags?.length >= 1 && (
                <div className="border border-gray-400 my-3 p-2">
                  {tags.map((v, i) => (
                    <div key={i}>
                      <div className="flex items-center gap-3">
                        <span>{alphabetsArray[i]}</span> {" - "}
                        <span>{v}</span>
                        <span
                          className=" text-sm text-red-800 cursor-pointer"
                          onClick={() => handleDel(i)}
                        >
                          x
                        </span>
                        <i className="fa-solid fa-x"></i>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div>
              {testQuestions?.matchingHeading?.map((v, i) => (
                <div key={i}>
                  <div className=" border border-blue-400 my-3 p-5 relative">
                    <span
                      onClick={() => deleteMatchHeadingQuestions(i)}
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
                        name={"matchingHeadingQuesTitle"}
                        onChange={(e) => handleChange(e, i)}
                        value={
                          testQuestions?.matchingHeading[i]
                            ?.matchingHeadingQuesTitle
                        }
                        id={"questionText"}
                        className="border border-gray-500"
                      />
                    </div>

                    {tags.length > 0 && (
                      <div className="border-3 border-black mb-2 flex flex-col flex-1 gap-2">
                        <label htmlFor="readingParaThird">
                          Correct Answer Index
                        </label>
                        <select
                          className=" border w-full border-gray-500"
                          onChange={(e) => handleChange(e, i)}
                          value={
                            testQuestions.matchingHeading[i]
                              ?.matchingHeadingAnswerIndex
                          }
                          name={"matchingHeadingAnswerIndex"}
                          type="number"
                          id="correctChoiceIndex"
                          defaultValue={"DEFAULT"}
                        >
                          <option value="DEFAULT" disabled></option>
                          {tags?.map((v, tIndex) => (
                            <option key={tIndex} value={tIndex}>
                              {alphabetsArray[tIndex]}
                            </option>
                          ))}
                        </select>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <button
              className="border bg-blue-300 p-1 rounded-sm text-white"
              onClick={(e) => addMoreMatchHeadings(e)}
            >
              Add More Questions
            </button>
          </div>

          {/* true False Form ------------------------------------------------------------------------------------*/}
          <div className=" border border-red-400 my-7 p-4 ">
            <h1>TRUE FALSE</h1>
            {testQuestions?.trueFalse?.map((v, i) => (
              <div key={i}>
                <div className=" flex items-center border border-yellow-400 my-4 p-5 relative">
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
                    <div className=" flex-1  mb-2 flex flex-col gap-2   ">
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

                    <div className=" flex-2 border-3 border-black mb-2 flex flex-col gap-2">
                      <label htmlFor="readingParaThird" className=" invisible">
                        Correct Answer Index
                      </label>

                      <select
                        className=" border border-gray-500 py-[1.1px]"
                        onChange={(e) => handleChange(e, i)}
                        value={testQuestions.trueFalse[i].trueFalseCorrectIndex}
                        name={"trueFalseCorrectIndex"}
                        type="number"
                        id="trueFalseCorrectIndex"
                        defaultValue={"DEFAULT"}
                      >
                        <option value={"DEFAULT"}>Select the index....</option>
                        <option value={1}>YES</option>
                        <option value={0}>NO</option>
                        <option value={2}>NOT GIVEN</option>
                      </select>
                    </div>
                  </>
                </div>
              </div>
            ))}

            <button
              className="border bg-blue-300 p-1 rounded-sm text-white"
              onClick={(e) => addMoreTrueFalse(e)}
            >
              Add More True False Questions
            </button>
          </div>

          {/* MATCHING THE INFORMATION FORM-------------------------------------------------------------- */}
          <div className="border border-red-400 my-7 p-4">
            <h1>MATCH THE INFORMATON QUESTIONS</h1>

            <div className="my-5">
              <label
                className="text-sm text-gray-500 tracking-wider"
                htmlFor="tags"
              >
                Answer Options
              </label>

              <div className="input">
                <div className="inputbox">
                  <input
                    id="tags"
                    value={infoData}
                    type="text"
                    placeholder="Add Tags"
                    onKeyDown={handleEnterDown}
                    onChange={(e) => setInfoData(e.target.value)}
                    className=" border p-2 w-full rounded-md mt-1 text-gray-400 focus:text-gray-500 placeholder:text-gray-300 outline-none focus:ring-2"
                  />
                </div>
              </div>

              {matchingInformationValues?.length >= 1 && (
                <div className="border border-gray-400 my-3 p-2">
                  {matchingInformationValues?.map((v, i) => (
                    <div className="flex items-center gap-3" key={i}>
                      <span>{alphabetsArray[i]}</span> {" - "}
                      <span>{v}</span>
                      <span
                        className=" text-sm text-red-800 cursor-pointer"
                        onClick={() => handleInfoAnsDel(i)}
                      >
                        x
                      </span>
                      <i className="fa-solid fa-x"></i>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div>
              {testQuestions?.matchingInformation?.map((v, i) => (
                <div key={i}>
                  <div className=" border border-blue-400 my-3 p-5 relative">
                    <span
                      onClick={() => deleteMatchInfoQuestions(i)}
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
                        name={"matchingInfoQuesTitle"}
                        onChange={(e) => handleChange(e, i)}
                        value={
                          testQuestions?.matchingInformation[i]
                            ?.matchingInfoQuesTitle
                        }
                        id={"questionText"}
                        className="border border-gray-500"
                      />
                    </div>

                    {matchingInformationValues.length > 0 && (
                      <div className="border-3 border-black mb-2 flex flex-col flex-1 gap-2">
                        <label htmlFor="readingParaThird">
                          Correct Answer Index
                        </label>
                        <select
                          className=" border w-full border-gray-500"
                          onChange={(e) => handleChange(e, i)}
                          value={
                            testQuestions.matchingInformation[i]
                              ?.matchingInfoAnswersIndex
                          }
                          name={"matchingInfoAnswersIndex"}
                          type="number"
                          id="correctChoiceIndex"
                          defaultValue={"DEFAULT"}
                        >
                          <option value="DEFAULT" disabled>
                            Select the index.....
                          </option>
                          {matchingInformationValues?.map((v, mIndex) => (
                            <option key={mIndex} value={mIndex}>
                              {alphabetsArray[mIndex]}
                            </option>
                          ))}
                        </select>
                      </div>
                    )}
                  </div>
                </div>
              ))}

              <button
                onClick={(e) => addMoreMatchInfoQuestions(e)}
                className="border bg-blue-300 p-1 rounded-sm text-white"
              >
                Add More Information Questions
              </button>
            </div>
          </div>

          <div className=" border-3 border-red-300 ">
            <button
              type="submit"
              className=" rounded-sm shadow-lg bg-indigo-500 text-white text-md px-5 py-1"
              disabled={isLoading}
            >
              {isLoading ? "Processing...." : "Submit"}
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Page;
