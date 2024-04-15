import React, { useState } from "react";

const MCQQuestion = ({ index, onQuestionChange }) => {
  const [question, setQuestion] = useState({
    prompt: "",
    options: ["", "", "", ""],
    correctOption: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setQuestion((prevQuestion) => ({
      ...prevQuestion,
      [name]: value,
    }));
    onQuestionChange(index, { ...question, [name]: value });
  };

  const handleOptionChange = (optionIndex, event) => {
    const { value } = event.target;
    setQuestion((prevQuestion) => {
      const updatedOptions = [...prevQuestion.options];
      updatedOptions[optionIndex] = value;
      return {
        ...prevQuestion,
        options: updatedOptions,
      };
    });
    onQuestionChange(index, { ...question, options: [...question.options.slice(0, optionIndex), value, ...question.options.slice(optionIndex + 1)] });
  };

  return (
    <div className="mb-4">
      <label className="block mb-2 font-semibold">Question {index + 1}</label>
      <input
        type="text"
        name="prompt"
        value={question.prompt}
        onChange={handleInputChange}
        placeholder="Question prompt"
        className="rounded-md p-2 focus:outline-none w-full mb-2"
      />
      {question.options.map((option, optionIndex) => (
        <input
          key={optionIndex}
          type="text"
          name={`option${optionIndex + 1}`}
          value={option}
          onChange={(e) => handleOptionChange(optionIndex, e)}
          placeholder={`Option ${optionIndex + 1}`}
          className="rounded-md p-2 focus:outline-none w-full mb-2"
        />
      ))}
      <label className="block mb-2 font-semibold">Correct Option</label>
      <select
        value={question.correctOption}
        onChange={handleInputChange}
        name="correctOption"
        className="rounded-md p-2 focus:outline-none w-full"
      >
        <option value="">Select correct option</option>
        {question.options.map((option, optionIndex) => (
          <option key={optionIndex} value={`option${optionIndex + 1}`}>
            Option {optionIndex + 1}
          </option>
        ))}
      </select>
    </div>
  );
};

export default MCQQuestion;
