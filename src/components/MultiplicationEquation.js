import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { pageVariants } from "../utils/pageTransitions";
import Equation from "../styles/Equation";
import GhostOperand from "../styles/GhostOperand";
import NumberInput from "../styles/NumberInput";
import OperandContainer from "../styles/OperandContainer";
import Operand from "./Operand";
import Right from "./Right";
import Wrong from "./Wrong";
import SubmitPillButton from "./SubmitPillButton";
import Operator from "../styles/Operator";

const initialInput = "";

function getRandom(maxValue) {
  return Math.floor(Math.random() * maxValue);
}

export default function MultiplicationEquation({
  maxValue = 20,
  setScore,
  visible
}) {
  const [answer, setAnswer] = useState(initialInput);
  const [digit1, setDigit1] = useState();
  const [digit2, setDigit2] = useState();
  const [isCorrect, setIsCorrect] = useState();

  const inputEl = useRef(null);
  const correctAudio = useRef(null);
  const wrongAudio = useRef(null);

  useEffect(() => {
    setDigit1(getRandom(maxValue));
    setDigit2(getRandom(maxValue));
    inputEl.current.focus();
  }, [maxValue]);

  function nextProblem() {
    setAnswer(initialInput);
    setDigit1(getRandom(maxValue));
    setDigit2(getRandom(maxValue));
    setIsCorrect();
  }

  function checkAnswer(e, answer, digit1, digit2) {
    e.preventDefault();
    const correctAnswer = digit1 * digit2;
    if (parseInt(answer, 10) === correctAnswer) {
      correctAudio.current.play();
      setScore(score => score + 1);
    } else {
      wrongAudio.current.play();
    }
    setIsCorrect(parseInt(answer, 10) === correctAnswer);
    setTimeout(() => nextProblem(), 300);
  }

  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <Equation visible={visible}>
        <OperandContainer>
          <GhostOperand>{digit1}</GhostOperand>
          <Operand digit={digit1} />
        </OperandContainer>
        <Operator>x</Operator>
        <OperandContainer>
          <GhostOperand>{digit2}</GhostOperand>
          <Operand digit={digit2} />
        </OperandContainer>
        <p>=</p>
        <NumberInput
          id="numberInput"
          visible={visible}
          method="POST"
          onSubmit={e => checkAnswer(e, answer, digit1, digit2)}
        >
          <input
            type="number"
            pattern="[0-9]*"
            ref={inputEl}
            value={answer}
            name="answer"
            onChange={e => setAnswer(e.target.value, 10)}
          />
        </NumberInput>
        {visible && (
          <SubmitPillButton form="numberInput" type="submit">
            Submit
          </SubmitPillButton>
        )}
      </Equation>
      {isCorrect === true && <Right />}
      {isCorrect === false && <Wrong />}
      <audio
        ref={correctAudio}
        preload="true"
        src="https://res.cloudinary.com/coreytesting/video/upload/v1584720407/sounds/wooYeah.wav"
      />
      <audio
        ref={wrongAudio}
        src="https://res.cloudinary.com/coreytesting/video/upload/v1584721830/sounds/wrongSoft.mp3"
      />
    </motion.div>
  );
}