import styled from "styled-components";
import { rem } from "polished";

export const BaseInput = styled.input`
  background: #ffffff;
  border: 1px solid #dbdbdb;
  box-sizing: border-box;
  border-radius: 5px;
  padding: ${rem("18px")};
  font-size: ${rem("20px")};
  line-height: ${rem("20px")};

  &:focus {
    outline: none;
  }
`;

export const BaseTextArea = styled.textarea`
  background: #ffffff;
  border: 1px solid #dbdbdb;
  box-sizing: border-box;
  border-radius: 5px;
  padding: ${rem("18px")};
  font-size: ${rem("20px")};
  line-height: ${rem("20px")};

  &:focus {
    outline: none;
  }
`;

export const SearchInput = styled(BaseInput)``;
