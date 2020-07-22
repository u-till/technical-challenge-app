import { rem } from "polished";
import styled from "styled-components";

export const BaseButton = styled.button`
  padding: 8px 20px 8px 20px;
  border-radius: 40px;
  border: none;
  color: #ffffff;
  cursor: pointer;
`;

export const RedButton = styled(BaseButton)`
  background-color: #ef485c;
  :hover {
    background-color: #f37786;
  }
`;

export const BlueButton = styled(BaseButton)`
  background-color: #00bae5;
  :hover {
    background-color: #05d0ff;
  }
`;

export const EditButton = styled.div`
  width: ${rem('30px')};
  height: ${rem('30px')};
  border-radius: 50%;
  background-color: #dbdbdb;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
`;

export const RoundGreyButton = styled.div`
  width: ${rem('30px')};
  height: ${rem('30px')};
  border-radius: 50%;
  background-color: #dbdbdb;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  cursor: pointer;
  :hover {
    background-color: #bdbdbd;
  }
`;

export const StartButton = styled.button`
  width: ${rem('230px')};
  height: ${rem('80.01px')};
  background: #ef485c;
  border-radius: 40px;
  color: #ffffff;
`;

export const BigRedButton = styled(RedButton)`
  padding: 13px 40px 13px 40px;
  width: ${rem('200px')};
  height: ${rem('60px')};
  font-size: ${rem('18px')};
`;
