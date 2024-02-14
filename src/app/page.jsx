"use client";
import { useState } from "react";
import React from "react";

const page = () => {
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
  });



  console.log(testQuestions)


  // const handleChange = (e) => {
  //   setTestQuestions({ ...testQuestions, [e.target.value]: e.target.name });
  // };

  const handleChange = (e) => {
    const name = e.target.name;
    const newTestQuestions = { ...testQuestions };
  
    if (name.includes('.')) { // Nested property update
      const [parent, child] = name.split('.');
      newTestQuestions[parent][child] = e.target.value;
    } else {
      newTestQuestions[name] = e.target.value;
    }
  
    setTestQuestions(newTestQuestions);
  };
  

  return (
    <div className="border border-red-300 p-6">
      <form
        className=" max-w-[700px] border border-green-400 p-4 m-auto"
      >
        <div className="border-3 border-black mb-2 flex flex-col gap-2">
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

        <div className="border-3 border-black mb-2 flex flex-col gap-2">
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

        <div className="border-3 border-black mb-2 flex flex-col gap-2">
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

        <div className="border-3 border-black mb-2 flex flex-col gap-2">
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







        {/* mcqs */}
        <div className=" border-2 border-yellow-600 my-7">
          {testQuestions?.multipleChoice?.map((v, i) => (
            <>
              <div className="border-3 border-black mb-2 flex flex-col gap-2">
                <label htmlFor="readingParaThird">Question Text</label>
                <input
                  className=" border border-gray-500"
                  onChange={handleChange}
                  value={testQuestions?.multipleChoice[i].questionText}
                  type="text"
                  name={`multipleChoice.${i}.questionText`}
                  id={`questionText${i}`}
                />
              </div>
              <div className="border-3 border-black mb-2 flex flex-col gap-2">
                <label htmlFor="readingParaThird">Correct Answer Index</label>
                <input
                  className=" border border-gray-500"
                  onChange={handleChange}
                  value={v[i]?.correctChoiceIndex}
                  name={v[i]?.correctChoiceIndex}
                  type="number"
                  id="correctChoiceIndex"
                />
              </div>

              {v?.choices?.map((opt, i) => (
                <>
                  <div className="border-3 border-black mb-2 flex flex-col gap-2">
                    <label htmlFor="readingParaThird">option title</label>
                    <input
                      className=" border border-gray-500"
                      onChange={handleChange}
                      value={opt[i]?.optionTitle}
                      name={opt[i]?.optionTitle}
                      type="text"
                      id="correctChoiceIndex"
                    />
                  </div>

                  <div className="border-3 border-black mb-2 flex flex-col gap-2">
                    <label htmlFor="readingParaThird">option value</label>
                    <input
                      className=" border border-gray-500"
                      onChange={handleChange}
                      value={opt[i]?.optionValue}
                      name={opt[i]?.optionValue}
                      type="text"
                      id="correctChoiceIndex"
                    />
                  </div>
                </>
              ))}
            </>
          ))}
















        </div>
      </form>
    </div>
  );
};

export default page;
