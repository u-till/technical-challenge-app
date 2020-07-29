import React from "react";
import ClipLoader from "react-spinners/ClipLoader";
import styled from "styled-components";

// Styling

const Center = styled.div`
  margin: 0 auto;
  display: flex;
  justify-content: center;
`;

const InLine = styled.div`
  padding-left: 24px;
  display: inline;
  justify-content: center;
`;

// Component - Displayed while data is being fetched

export const GenericSpinner = () => (
  <Center>
    <ClipLoader
      size={100}
      sizeUnit={"px"}
      color={"#00bae5"}
      css={"margin-top: 2rem"}
    />
  </Center>
);

export const GenericSpinnerSmall = () => (
  <InLine>
    <ClipLoader
      size={16}
      sizeUnit={"px"}
      color={"#fff"}
      css={"margin-right: -40px"}
    />
  </InLine>
);

export const GenericSpinnerSmallBtn = () => (
  <Center>
    <ClipLoader size={16} sizeUnit={"px"} color={"#fff"} />
  </Center>
);

export const GenericSpinnerSmallBtnBlk = () => (
  <Center>
    <ClipLoader size={16} sizeUnit={"px"} color={"#000"} />
  </Center>
);
