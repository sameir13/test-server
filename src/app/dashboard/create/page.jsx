"use client";
import axios from "axios";
import { useState, useEffect } from "react";
import { Editor } from "@tinymce/tinymce-react";
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

      <form onSubmit={handleSubmit} className=" max-w-[700px] p-4 m-auto">
        <h1 className="mb-6 font-semibold text-2xl text-indigo-600">
          Add New Test
        </h1>
        {/* -------------------- Title Here -------------------- */}
        <div className="mb-2 flex flex-col flex-1 gap-2 relative">
          <label htmlFor="title" className="text-sm text-slate-600">
            Title
          </label>
          <input
            id="title"
            type="text"
            name="title"
            onChange={handleChange}
            value={testQuestions.title}
            placeholder="Test Title"
            className=" w-full py-1.5 text-slate-500 focus:text-slate-600 placeholder:text-sm rounded-md px-3 border-gray-300 focus:outline-none focus:ring-2 ring-indigo-500 hover:ring-1 border"
          />
        </div>

        {/* -------------------- Para Here -------------------- */}
        <div className="mb-2 flex flex-col flex-1 gap-2">
          <label
            className="text-sm text-slate-600 mt-3"
            htmlFor="readingParaOne"
          >
            Para 01
          </label>

          <div className="">
            <Editor
              apiKey="6wwym50hu15el3wtfbs5l75ohsc40iytt3b5uos0iqrhnzle"
              value={testQuestions.readingParaOne}
              onEditorChange={(content) =>
                setTestQuestions({
                  ...testQuestions,
                  readingParaOne: content,
                })
              }
              init={{
                height: 300,
                menubar: false,
                plugins: [
                  "advlist",
                  "autolink",
                  "lists",
                  "link",
                  "image",
                  "charmap",
                  "preview",
                  "anchor",
                  "searchreplace",
                  "visualblocks",
                  "code",
                  "fullscreen",
                  "insertdatetime",
                  "media",
                  "table",
                  "code",
                  "help",
                  "wordcount",
                ],
                toolbar:
                  "undo redo blocks " +
                  "bullist numlist " +
                  "table image removeformat code fullscreen",
                content_style:
                  "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
              }}
            />
          </div>
        </div>

        {/* ----------------------- MCQ'S ------------------------------------------------------------------------------------------------- */}
        <div className="my-7 p-5 border rounded-lg">
          <h3 className=" font-semibold text-slate-700">
            MULTIPLE CHOICE QUESTIONS
          </h3>

          {testQuestions?.multipleChoice?.map((v, i) => (
            <div key={i}>
              <div className=" border rounded-lg bg-[#eeeeeeba] my-6 p-3  relative">
                <span
                  onClick={() => deleteMcqs(i)}
                  className={
                    i > 0
                      ? " rounded-[100%] p-1 cursor-pointer border border-red-400 bg-red-400 text-white absolute right-0 top-[-10px]"
                      : " hidden"
                  }
                >
                  Remove
                </span>
                <div className="  mb-2 flex flex-col gap-2 ">
                  <label
                    className="text-sm text-slate-600"
                    htmlFor="readingParaThird"
                  >
                    Question Text
                  </label>
                  <input
                    type="text"
                    name={"questionText"}
                    onChange={(e) => handleChange(e, i)}
                    value={testQuestions?.multipleChoice[i]?.questionText}
                    id={"questionText"}
                    className=" w-full py-1.5 text-slate-500 focus:text-slate-600 placeholder:text-sm rounded-md px-3 border-gray-300 focus:outline-none focus:ring-2 ring-indigo-500 hover:ring-1 border"
                  />
                </div>
                <div className=" border rounded-lg p-3 my-5 bg-[#ffffffa1]">
                  {v?.choices?.map((opt, j) => (
                    <div key={j} className=" mb-6 border-b pb-4">
                      <div className="flex gap-7 relative">
                        <span
                          className={
                            j > 0
                              ? "rounded-[100%] cursor-pointer absolute right-[-10px] top-[-10px]"
                              : "hidden"
                          }
                          onClick={() => deleteMulipleChoiceOpts(i, j)}
                        >
                          <i className="fa-solid fa-xmark absolute top-0 right-3 text-gray-400 hover:text-gray-500"></i>
                        </span>
                        <div className="mb-2 flex flex-col flex-1 gap-2">
                          <label
                            className="text-xs text-slate-600"
                            htmlFor="readingParaThird"
                          >
                            Otion Title
                          </label>

                          <input
                            type="text"
                            name={"optionTitle"}
                            id="correctChoiceIndex"
                            onChange={(e) => handleChange(e, i, j)}
                            value={
                              testQuestions?.multipleChoice[i].choices[j]
                                .optionTitle
                            }
                            className=" w-full py-1.5 text-slate-500 focus:text-slate-600 placeholder:text-sm rounded-md px-3 border-gray-300 focus:outline-none focus:ring-2 ring-indigo-500 hover:ring-1 border"
                          />
                        </div>

                        <div className="border-3 border-black mb-2 flex flex-col flex-1 gap-2">
                          <label
                            className="text-xs text-slate-600"
                            htmlFor="readingParaThird"
                          >
                            Option Value
                          </label>
                          <input
                            className=" w-full py-1.5 text-slate-500 focus:text-slate-600 placeholder:text-sm rounded-md px-3 border-gray-300 focus:outline-none focus:ring-2 ring-indigo-500 hover:ring-1 border"
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

                      <div className="flex gap-2 items-center py-2">
                        <input
                          type="checkbox"
                          className="rounded"
                          id={`checkbox-${i}-${j}`}
                          checked={j === v.correctChoiceIndex}
                          onChange={() => handleCheckboxChange(i, j)}
                        />
                        <label
                          htmlFor={`checkbox-${i}-${j}`}
                          className=" text-slate-700 text-sm"
                        >
                          Set as Correct
                        </label>
                      </div>
                    </div>
                  ))}
                </div>
                <button
                  onClick={(e) => addMoreOpt(e, i)}
                  className="border border-gray-300 text-sm px-3 py-2 my-1 rounded-md text-gray-500 hover:text-gray-600 transition duration-150"
                >
                  Add More
                </button>
              </div>
            </div>
          ))}
          <button
            onClick={(e) => addMorefaq(e)}
            className="bg-indigo-500 hover:bg-indigo-600 text-sm px-3 py-2 my-1 rounded-md text-white transition duration-150"
          >
            Add More Question
          </button>
        </div>

        {/* ----------------------- matching headings inputs her---------------------------------------e */}
        <div className=" my-7 p-5 border rounded-lg">
          <h1 className=" font-semibold text-slate-700">
            MATCH THE HEADING QUESTIONS{" "}
          </h1>
          <div className="border rounded-lg bg-[#eeeeeeba] my-6 p-3  relative">
            <label className="text-sm text-slate-600" htmlFor="tags">
              Answer Options
            </label>

            <div className="input my-3">
              <div className="inputbox">
                <input
                  id="tags"
                  type="text"
                  value={data}
                  placeholder="Add Tags"
                  onKeyDown={handlekeydown}
                  onChange={(e) => setdata(e.target.value)}
                  className=" w-full py-1.5 text-slate-500 focus:text-slate-600 placeholder:text-sm rounded-md px-3 border-gray-300 focus:outline-none focus:ring-2 ring-indigo-500 hover:ring-1 border"
                />
              </div>
            </div>

            {tags?.length >= 1 && (
              <div className="bg-white flex flex-wrap gap-2 rounded-lg my-3 px-2 py-3">
                {tags.map((v, i) => (
                  <div key={i}>
                    <div className="flex items-center gap-2 text-gray-600 bg-indigo-100 text-sm px-3 py-1.5 rounded-lg">
                      <span>{alphabetsArray[i]}</span> {" - "}
                      <span>{v}</span>
                      <span
                        onClick={() => handleDel(i)}
                        className=" text-sm cursor-pointer"
                      >
                        <i className="fa-solid fa-x text-xs text-gray-400 hover:text-gray-600"></i>
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div>
            {testQuestions?.matchingHeading?.map((v, i) => (
              <div key={i}>
                <div className="border rounded-lg my-3 p-5 relative bg-[#eeeeeeba]">
                  <span
                    onClick={() => deleteMatchHeadingQuestions(i)}
                    className={
                      i > 0
                        ? " cursor-pointer absolute right-5 top-1"
                        : " hidden"
                    }
                  >
                    <i className="fa-solid fa-x text-xs text-gray-400 hover:text-gray-600  hover:scale-110 transition-all duration-100"></i>
                  </span>
                  <div className="mb-2 flex flex-col gap-3">
                    <label
                      htmlFor="readingParaThird"
                      className="text-xs text-slate-600"
                    >
                      Question Text
                    </label>
                    <input
                      type="text"
                      name={"matchingHeadingQuesTitle"}
                      onChange={(e) => handleChange(e, i)}
                      value={
                        testQuestions?.matchingHeading[i]
                          ?.matchingHeadingQuesTitle
                      }
                      id={"questionText"}
                      placeholder="Test Question Text"
                      className=" w-full py-1.5 text-slate-500 focus:text-slate-600 placeholder:text-sm rounded-md px-3 border-gray-300 focus:outline-none focus:ring-2 ring-indigo-500 hover:ring-1 border"
                    />
                  </div>

                  {tags.length > 0 && (
                    <div className="border-3 border-black mb-2 flex flex-col flex-1 gap-2">
                      <label
                        className="text-xs text-slate-600 mt-3"
                        htmlFor="readingParaThird"
                      >
                        Correct Answer Index
                      </label>
                      <select
                        className=" w-full py-1.5 text-slate-500 focus:text-slate-600 placeholder:text-sm rounded-md px-3 border-gray-300 focus:outline-none focus:ring-2 ring-indigo-500 hover:ring-1 border"
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
            onClick={(e) => addMoreMatchHeadings(e)}
            className="bg-indigo-500 hover:bg-indigo-600 text-sm px-3 py-2 my-1 rounded-md text-white transition duration-150"
          >
            Add More Questions
          </button>
        </div>

        {/* ----------------------- true False Form ------------------------------------------------------------------------------------*/}
        <div className="my-7 p-5 border rounded-lg">
          <h3 className=" font-semibold text-slate-700">TRUE FALSE</h3>
          {testQuestions?.trueFalse?.map((v, i) => (
            <div key={i}>
              <div className=" flex items-center  border rounded-lg bg-[#eeeeeeba] my-6 p-3  relative">
                <>
                  <span
                    onClick={() => deleteTrueFalse(i)}
                    className={
                      i > 0
                        ? " rounded-[100%] p-1 cursor-pointer absolute right-2 top-1 hover:text-gray-600 hover:scale-110 transition duration-150"
                        : " hidden"
                    }
                  >
                    <i className="fa-solid fa-x text-xs text-gray-400 hover:text-gray-600"></i>
                  </span>
                  <div className=" flex-1 mb-2 flex flex-col gap-2">
                    <label
                      className="text-xs text-slate-600"
                      htmlFor="readingParaThird"
                    >
                      Question Text
                    </label>
                    <input
                      type="text"
                      onChange={(e) => handleChange(e, i)}
                      value={testQuestions?.trueFalse[i]?.trueFalseQuestion}
                      id={"trueFalseQuestion"}
                      name={"trueFalseQuestion"}
                      className="border z-10 mt-2 w-full py-1.5 text-slate-500 focus:text-slate-600 placeholder:text-sm rounded-md rounded-r-none px-3 border-gray-300 focus:outline-none focus:ring-2 ring-indigo-500 hover:ring-1"
                    />
                  </div>

                  <div className=" flex-2 border-3 border-black mb-2 flex flex-col gap-2">
                    <label htmlFor="readingParaThird" className="invisible">
                      Correct Answer Index
                    </label>

                    <select
                      type="number"
                      defaultValue={"DEFAULT"}
                      id="trueFalseCorrectIndex"
                      name={"trueFalseCorrectIndex"}
                      onChange={(e) => handleChange(e, i)}
                      value={testQuestions.trueFalse[i].trueFalseCorrectIndex}
                      className="border w-full py-1.5 text-slate-500 focus:text-slate-600 placeholder:text-sm rounded-md rounded-l-none px-3 border-gray-300 focus:outline-none focus:ring-2 ring-indigo-500 hover:ring-1"
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
            onClick={(e) => addMoreTrueFalse(e)}
            className="bg-indigo-500 hover:bg-indigo-600 text-sm px-3 py-2 my-1 rounded-md text-white transition duration-150"
          >
            Add More True False Questions
          </button>
        </div>

        {/* ----------------------- MATCHING THE INFORMATION FORM-------------------------------------------------------------- */}
        <div className="my-7 p-5 border rounded-lg">
          <h1 className=" font-semibold text-slate-700 mb-3">
            MATCH THE INFORMATON QUESTIONS
          </h1>

          <div className="py-5 px-4 border rounded-lg bg-[#eeeeeeba]">
            <label
              className="text-sm text-gray-500 tracking-wider"
              htmlFor="tags"
            >
              Answer Options
            </label>

            <div className="input mt-2">
              <div className="inputbox">
                <input
                  id="tags"
                  value={infoData}
                  type="text"
                  placeholder="Add Tags"
                  onKeyDown={handleEnterDown}
                  onChange={(e) => setInfoData(e.target.value)}
                  className=" w-full py-1.5 text-slate-500 focus:text-slate-600 placeholder:text-sm rounded-md px-3 border-gray-300 focus:outline-none focus:ring-2 ring-indigo-500 hover:ring-1 border"
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
                <div className="  border rounded-lg bg-[#eeeeeeba] my-3 p-5 relative">
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
                    <label
                      className="text-sm text-gray-500 tracking-wider"
                      htmlFor="readingParaThird"
                    >
                      Question Text
                    </label>
                    <input
                      type="text"
                      name={"matchingInfoQuesTitle"}
                      onChange={(e) => handleChange(e, i)}
                      value={
                        testQuestions?.matchingInformation[i]
                          ?.matchingInfoQuesTitle
                      }
                      id={"questionText"}
                      className=" w-full py-1.5 text-slate-500 focus:text-slate-600 placeholder:text-sm rounded-md px-3 border-gray-300 focus:outline-none focus:ring-2 ring-indigo-500 hover:ring-1 border"
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
              className="bg-indigo-500 hover:bg-indigo-600 text-sm px-3 py-2 my-1 rounded-md text-white transition duration-150"
            >
              Add More Information Questions
            </button>
          </div>
        </div>

        <div className=" border-3 border-red-300 ">
          <button
            type="submit"
            disabled={isLoading}
            className="bg-indigo-600 hover:bg-indigo-600 text-sm px-3 py-2 my-1 rounded-md text-white transition duration-150"
          >
            {isLoading ? "Processing...." : "Submit"}
          </button>
        </div>
      </form>
    </>
  );
};

export default Page;
