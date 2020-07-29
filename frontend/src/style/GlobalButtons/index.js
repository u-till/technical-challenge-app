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
  width: ${rem("30px")};
  height: ${rem("30px")};
  border-radius: 50%;
  background-color: #dbdbdb;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
`;

export const RoundGreyButton = styled.button`
  width: ${rem("30px")};
  height: ${rem("30px")};
  border-radius: 50%;
  background-color: transparent;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #767676;
  background-color: #fff;
  border: 1px solid #c4c4c4;
  font-size: ${rem("14px")};
  :hover {
    border: 1px solid #9a9a9a;
    color: #363636;
  }
  cursor: pointer;
  //color: black;
  //cursor: pointer;
  //border: 1px solid black;
  //:hover {
  //  background-color: #bdbdbd;
  //}
`;
//#dbdbdb
export const StartButton = styled.button`
  width: ${rem("230px")};
  height: ${rem("80.01px")};
  background: #ef485c;
  border-radius: 40px;
  color: #ffffff;
`;

export const BigRedButton = styled(RedButton)`
  padding: 13px 40px 13px 40px;
  width: ${rem("200px")};
  height: ${rem("60px")};
  font-size: ${rem("18px")};
`;
