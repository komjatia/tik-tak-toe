import React, { FC} from "react";
import styled from "styled-components";
import { TextField } from "@material-ui/core";
import InputAdornment from "@material-ui/core/InputAdornment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle } from "@fortawesome/free-regular-svg-icons";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

const StyledStartScreen = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  h3 {
    margin-left: 1rem;
  }
`;

const StyledFormContainer = styled.div`
  margin: 0 0 1rem 0;
  width: 100%;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
`;

const StyledButtonContainer = styled.div`
  width: 100%;
  margin-bottom: 3rem;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
`;

type StartScreenProp = {
  onStart(): void;
  onSizeChange(e: React.ChangeEvent<HTMLInputElement>): void;
  handleChange(e: React.ChangeEvent<HTMLInputElement>): void;
  player1: string;
  player2: string
};


const StartScreen: FC<StartScreenProp> = ({ onStart, onSizeChange, handleChange, player1, player2 }) => {

  return (
    <StyledStartScreen>
      <StyledFormContainer>
        <TextField
          name="o"
          type="text"
          placeholder={player1}
          required
          onChange={handleChange}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <FontAwesomeIcon icon={faCircle} />
              </InputAdornment>
            ),
          }}
        />
        <TextField
          name="x"
          type="text"
          placeholder={player2}
          required
          onChange={handleChange}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <FontAwesomeIcon icon={faTimes} />
              </InputAdornment>
            ),
          }}
        />
      </StyledFormContainer>
      <h3>Palya merete:</h3>
      <StyledButtonContainer>
        <div>
          <input
            type="radio"
            name="size"
            value="3x3"
            onChange={onSizeChange}
            required
          />
          <label  htmlFor="size">
            3x3
          </label>
        </div>
        <div>
          <input
            type="radio"
            name="size"
            value="4x4"
            onChange={onSizeChange}
            required
          />
          <label  htmlFor="size">
            4x4
          </label>
        </div>
        <div>
          <input
            type="radio"
            name="size"
            value="5x5"
            onChange={onSizeChange}
            required
          />
          <label  htmlFor="size">
            5x5
          </label>
        </div>
        <div>
          <input
            type="radio"
            name="size"
            value="6x6"
            onChange={onSizeChange}
            required
          />
          <label  htmlFor="size">
            6x6
          </label>
        </div>
        <div>
          <input
            type="radio"
            name="size"
            value="7x7"
            onChange={onSizeChange}
            required
          />
          <label  htmlFor="size">
            7x7
          </label>
        </div>
        <div>
          <input
            type="radio"
            name="size"
            value="8x8"
            onChange={onSizeChange}
            required
          />
          <label  htmlFor="size">
            8x8
          </label>
        </div>
        <div>
          <input
            type="radio"
            name="size"
            value="9x9"
            onChange={onSizeChange}
            required
          />
          <label  htmlFor="size">
            9x9
          </label>
        </div>
      </StyledButtonContainer>
      <button onClick={onStart}>Kezd</button>
    </StyledStartScreen>
  );
};

export default StartScreen;
