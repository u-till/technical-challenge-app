import React from "react";
import styled from "styled-components";
import { Controlled as CodeMirror } from "react-codemirror2";
import "codemirror/lib/codemirror.css";
import "codemirror/theme/material.css";
import "codemirror/mode/javascript/javascript.js";

//////////
// STYLE
//////////

const StyledCodeMirror = styled(CodeMirror)`
  * {
    font-size: 18px;
    font-family: "Courier New", Courier, monospace !important;
  }
  height: 100%;
  box-shadow: 0 1px 10px rgba(0, 0, 0, 0.4);
  > div {
    height: 100%;
  }
`;

const CodeMirrorWrapper = styled.div`
  height: 100%;
  border-radius: 5px;
  box-shadow: 0 1px 10px rgba(0, 0, 0, 0.1);
`;

//////////
// REACT
//////////

const LargeCodeMirror = ({
  codeData,
  progressValue,
  challengeId,
  score,
  setCodeData,
}) => {
  //Used to set display options of the CodeMirror Interface
  const options = {
    mode: "javascript",
    theme: "material",
    lineNumbers: true,
  };

  return (
    <CodeMirrorWrapper>
      <StyledCodeMirror
        value={codeData[progressValue].code}
        options={options}
        onBeforeChange={(editor, data, value) => {
          setCodeData({
            ...codeData,
            [progressValue]: {
              ...codeData[progressValue],
              code: value,
            },
          });
        }}
        onChange={(editor, data, value) => {
          localStorage.setItem(
            "challenge",
            JSON.stringify({
              challenge: challengeId,
              content: codeData,
              score: score,
            })
          );
        }}
      />
    </CodeMirrorWrapper>
  );
};

export default LargeCodeMirror;
