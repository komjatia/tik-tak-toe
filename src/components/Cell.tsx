import React, { FC } from "react";

import styled from "styled-components";

type CellProps = {
  value: CellValue;
  toggle(index: number): void;
  index: number;
};

export type CellValue = "x" | "o" | undefined;

//styles
const StyledCellContainer = styled.div`
  background: #fff;
  cursor: pointer;
  border: none;
  display: flex;
  justify-content: center;
  align-items: center;
  outline: none;
`;

export const Cell: FC<CellProps> = ({ value, toggle, index }) => {
  return (
    <StyledCellContainer onClick={() => toggle(index)}>
      {value === "x" ? "X" : value ? "o" : null}
    </StyledCellContainer>
  );
};
