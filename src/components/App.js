import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import styled from "styled-components";
import Navigation from "./Navigation";
import GlobalStyles from "./GlobalStyles";
import MaxValue from "./MaxValue";
import Timer from "./Timer";
import Score from "./Score";
import ClockSvg from "./ClockSvg";
import EquationDiv from "./EquationDiv";

export default function App() {
  const [maxValue, setMaxValue] = useState(10);
  const [score, setScore] = useState(0);
  const [showTimer, toggleTimer] = useState(false);
  const [showScore, toggleScore] = useState(false);
  const [inProgress, toggleInProgress] = useState(false);
  const [isStarterActive, setIsStarterActive] = useState(false);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(15);
  const [starterStep, setStarterStep] = useState(0);
  const [view, setView] = useState("+");
  function addTime() {
    if (seconds === 45) {
      setMinutes((minutes) => minutes + 1);
      setSeconds(0);
    } else {
      setSeconds((seconds) => seconds + 15);
    }
  }

  function subtractTime() {
    if (seconds === 15 && minutes === 0) {
      return;
    }
    if (seconds === 0) {
      setSeconds(45);
      setMinutes((minutes) => minutes - 1);
    } else {
      setSeconds((seconds) => seconds - 15);
    }
  }

  return (
    <React.Fragment>
      <GlobalStyles />
      <AppContainer>
        <Header>
          <h1>Hello Mathematician!</h1>
        </Header>
        <Navigation inProgress={inProgress} view={view} setView={setView} />

        {!showTimer && !showScore && (
          <AnimatePresence exitBeforeEnter>
            <motion.div
              key={view}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              style={{ alignSelf: "start" }}
            >
              <EquationDiv
                view={view}
                maxValue={maxValue}
                setScore={setScore}
              />
            </motion.div>
          </AnimatePresence>
        )}

        {showTimer && (
          <Timer
            score={score}
            toggleTimer={toggleTimer}
            toggleInProgress={toggleInProgress}
            toggleScore={toggleScore}
            isStarterActive={isStarterActive}
            setIsStarterActive={setIsStarterActive}
            addTime={addTime}
            subtractTime={subtractTime}
            minutes={minutes}
            setMinutes={setMinutes}
            seconds={seconds}
            setSeconds={setSeconds}
            starterStep={starterStep}
            setStarterStep={setStarterStep}
          />
        )}
        {showScore && (
          <Score
            score={score}
            setScore={setScore}
            toggleScore={toggleScore}
            toggleTimer={toggleTimer}
          />
        )}
      </AppContainer>
    </React.Fragment>
  );
}

const AppContainer = styled.div`
  max-width: 600px;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 60px 60px 50px 1fr;
  /* grid-template-areas: "header" "nav" "main" "options"; */
  align-items: center;
  text-align: center;
  padding-top: 10px;
  margin: 0 auto;
  height: 100vh;
`;
const Header = styled.header`
  @media screen and (max-width: 370px) {
    font-size: 16px;
  }
`;

const OptionsContainer = styled(motion.div)`
  place-content: center;
  display: flex;
  justify-content: space-evenly;
`;

const ToggleTimerButton = styled.button`
  cursor: pointer;
  font-size: 20px;
  padding: 5px 10px;
  background: ${(props) => (props.active ? "var(--white)" : `none`)};
  color: ${(props) => (props.active ? "var(--dark)" : `var(--orange)`)};
  border: none;
  display: flex;
  align-items: center;
  justify-content: space-around;
  position: relative;
  border-radius: 50px;
  width: 48px;
  height: 48px;
  box-shadow: ${(props) =>
    props.active ? "0px 0px 2px 2px lightblue" : "none"};
  :focus {
    outline: none;
    box-shadow: 0px 0px 2px 2px lightblue;
  }
`;

// {!inProgress && !showScore && (
//   <OptionsContainer
//     animate={{ height: "auto" }}
//     showTimer={showTimer}
//     className="optionsContainer"
//   >
//     {/* {!inProgress && !showScore && !isStarterActive && ( */}
//     <MaxValue
//       maxValue={maxValue}
//       setMaxValue={setMaxValue}
//       inProgress={inProgress}
//     />
//     <ToggleTimerButton
//       title="Set Timer"
//       active={showTimer === true}
//       type="button"
//       onClick={() => toggleTimer(!showTimer)}
//     >
//       <ClockSvg />
//     </ToggleTimerButton>
//   </OptionsContainer>
// )}
