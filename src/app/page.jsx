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
  });


  // new change handler for the array forms
  const handleChange = (e, index, choiceIndex) => {
    const { name, value } = e.target;
    if (name.startsWith("multipleChoice.questionText")) {
      const updatedQuestions = [...testQuestions.multipleChoice];
      updatedQuestions[index].questionText = value;
      setTestQuestions((prev) => ({
        ...prev,
        multipleChoice: updatedQuestions,
      }));
    } else if (name.startsWith("multipleChoice.choices.optionTitle")) {
      const updatedQuestions = [...testQuestions.multipleChoice];
      updatedQuestions[index].choices[choiceIndex].optionTitle = value;
      setTestQuestions((prev) => ({
        ...prev,
        multipleChoice: updatedQuestions,
      }));
    } else if (name.startsWith("multipleChoice.choices.optionValue")) {
      const updatedQuestions = [...testQuestions.multipleChoice];
      updatedQuestions[index].choices[choiceIndex].optionValue = value;
      setTestQuestions((prev) => ({
        ...prev,
        multipleChoice: updatedQuestions,
      }));
    } else if (name === "multipleChoice.correctChoiceIndex") {
      const updatedQuestions = [...testQuestions.multipleChoice];
      updatedQuestions[index].correctChoiceIndex = value;
      setTestQuestions((prev) => ({
        ...prev,
        multipleChoice: updatedQuestions,
      }));
    } else {
      setTestQuestions({ ...testQuestions, [name]: value });
    }

    if(name.startsWith("multipleChoice.questionText") || name.startsWith("multipleChoice.correctChoiceIndex") || name.startsWith("multipleChoice.choices.optionValue") || name.startsWith("multipleChoice.choices.optionTitle")  ){
      const upadateTest = testQuestions.multipleChoice.map((v,i)=>{
        if(i === index){
          return {...v , [name] : value};
        }

        return v
      })
      setTestQuestions({...testQuestions , multipleChoice:upadateTest})
    }else{
      setTestQuestions({...testQuestions, [name]:value})
    }
  };












  // const handleInput = (e, id) => {
  //   if (e.target.name === "tabName" || e.target.name === "icon") {
  //     const UpdatedDestination = BlogData?.buttons?.map((v, i) => {
  //       if (i === id) {
  //         return { ...v, [e.target.name]: e.target.value };
  //       }
  //       return v;
  //     });
  //     setBlogData({ ...BlogData, buttons: UpdatedDestination });
  //   } else {
  //     setBlogData({ ...BlogData, [e.target.name]: e.target.value });
  //   }
  // };

  // adding more tabs to the destionations-------
  // const addMorefaq = () => {
  //   setTestQuestions({
  //     ...testQuestions,
  //     multipleChoice: [
  //       ...testQuestions.multipleChoice,
  //       {
  //         questionText: "",
  //         choices: [{ optionTitle: "", optionValue: "" }],
  //         correctChoiceIndex: 0,
  //       },
  //     ],
  //     return { ...prev, multipleChoice: updatedMultipleChoice };
  //   });
  // };



  // const addMorefaq = () => {
  //   setTestQuestions((prev) => {
  //     const updatedMultipleChoice = [
  //       ...prev.multipleChoice,
  //       {
  //         questionText: "",
  //         choices: [{ optionTitle: "", optionValue: "" }],
  //         correctChoiceIndex: 0,
  //       },
  //     ];
  
  //     return { ...prev, multipleChoice: updatedMultipleChoice };
  //   });
  // };









  const addMorefaq = (e) => {
    e.preventDefault(); // Prevent the default form submission behavior
  
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
  


















  // const handleChange = (e) => {
  //   const { name, value } = e.target;

  //   if (name.startsWith("multipleChoice.")) {
  //     const fieldName = name.substring(15);

  //     setTestQuestions((prev) => ({
  //       ...prev,
  //       multipleChoice: [
  //         {
  //           ...prev.multipleChoice,
  //           [fieldName]: value,
  //         },
  //       ],
  //     }));
  //   } else {
  //     setTestQuestions({ ...testQuestions, [name]: value });
  //   }
  // };

  return (
    <div className="border border-red-300 p-6">
      <form className=" max-w-[700px] border border-green-400 p-4 m-auto">
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

        {/* WORKING -________________ */}

        {/* mcqs */}
        <div className=" border-2 border-yellow-600 my-7">
          {testQuestions?.multipleChoice?.map((v, i) => (
            <div key={i}>
              <div className="border-3 border-black mb-2 flex flex-col gap-2">
                <label htmlFor="readingParaThird">Question Text</label>
                {/* <input
                  type="text"
                  id="questionText"
                  name="multipleChoice.questionText"
                  onChange={handleChange}
                  value={v[i]?.questionText}
                  className="border border-gray-500"
                /> */}

                <input
                  type="text"
                  id={`questionText-${i}`}
                  name={`multipleChoice.questionText`}
                  onChange={(e) => handleChange(e, i)}
                  value={v[i]?.questionText}
                  className="border border-gray-500"
                />
              </div>
              <div className="border-3 border-black mb-2 flex flex-col gap-2">
                <label htmlFor="readingParaThird">Correct Answer Index</label>
                <input
                  className=" border border-gray-500"
                  onChange={(e) => handleChange(e, i)}
                  value={v[i]?.correctChoiceIndex}
                  name={"multipleChoice.correctChoiceIndex"}
                  type="number"
                  id="correctChoiceIndex"
                />
              </div>

              {v?.choices?.map((opt, j) => (
                <div key={j}>
                  <div className="border-3 border-black mb-2 flex flex-col gap-2">
                    <label htmlFor="readingParaThird">option title</label>

                    <input
                      className=" border border-gray-500"
                      onChange={(e) => handleChange(e, i, j)}
                      value={opt[j]?.optionTitle}
                      name={"multipleChoice.choices.optionTitle"}
                      type="text"
                      id="correctChoiceIndex"
                    />
                  </div>

                  <div className="border-3 border-black mb-2 flex flex-col gap-2">
                    <label htmlFor="readingParaThird">option value</label>
                    <input
                      className=" border border-gray-500"
                      onChange={(e) => handleChange(e, i, j)}
                      value={opt[j]?.optionValue}
                      name={"multipleChoice.choices.optionValue"}
                      type="text"
                      id="optionValue"
                    />
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>



                <button onClick={addMorefaq}>Add more</button>


      </form>
    </div>
  );
};

export default Page;
