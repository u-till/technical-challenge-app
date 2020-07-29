import React from "react";
import styled from "styled-components";
import { Controlled as CodeMirror } from "react-codemirror2";
import "codemirror/lib/codemirror.css";
import "codemirror/theme/material.css";
import "codemirror/mode/javascript/javascript.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { rem } from "polished";

//////////
// STYLE
//////////

const SmallCodeMirrorWrapper = styled.div`
  background-color: #263238;
  height: 100%;
  display: flex;
  justify-content: space-around;
  flex-direction: column;
  padding-right: 16px;
  overflow-x: hidden;
  div {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
`;

const StyledSmallCodeMirror = styled(CodeMirror)`
  .CodeMirror-scroll {
    overflow: hidden !important;
  }

  /* hide the scrollbars */
  .editor .CodeMirror-vscrollbar,
  .editor .CodeMirror-hscrollbar {
    display: none !important;
  }
  * {
    font-size: 16px;
    font-family: "Courier New", Courier, monospace !important;
  }
  height: ${rem("32px")};
  > div {
    height: 100%;
  }
`;

const FontAwesomeIconSuccess = styled(FontAwesomeIcon)`
  font-size: ${rem("22px")};
  color: #018601;
  border-radius: 50%;
  border: 1px solid white;
  background-color: white;
`;

const FontAwesomeIconFail = styled(FontAwesomeIcon)`
  font-size: ${rem("22px")};
  color: #ef485c;
  border-radius: 50%;
  border: 1px solid white;
  background-color: white;
`;

//////////
// REACT
//////////

const SmallCodeMirror = ({ targetChallenge, progressValue, codeData }) => {
  return (
    <SmallCodeMirrorWrapper>
      {targetChallenge.questions[progressValue].tests_for_question.map(
        (test, index) => (
          <div key={`test ${index}`}>
            <StyledSmallCodeMirror
              value={test}
              options={{
                mode: "javascript",
                theme: "material",
                lineNumbers: true,
                firstLineNumber: index + 1,
              }}
              onChange={(editor, data, value) => {}}
            />
            {codeData[progressValue].status[index] === null ? null : codeData[
                progressValue
              ].status[index] ? (
              <FontAwesomeIconSuccess icon={["fas", "check-circle"]} />
            ) : (
              <FontAwesomeIconFail icon={["fas", "times-circle"]} />
            )}
          </div>
        )
      )}
    </SmallCodeMirrorWrapper>
  );
};

export default SmallCodeMirror;
