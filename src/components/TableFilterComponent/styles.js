import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;
  height: 50vh;
  align-items: center;
  justify-content: center;
`;

export const Form = styled.form`
  background: #ffffff;
  padding: 20px;
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 1%;
  align-items: center;

  input {
    height: 20px;
    flex: 1;
    padding: 0.5rem;
    color: #000000;
    border: 1px solid #000000;
    border-radius: 4px;
    margin-bottom: 10px;
    &:focus {
      outline: none;
      border-color: #00b4d8;
    }

    font-size: 20px;
    width: 100%;

    &::placeholder {
      color: #999;
    }
  }
`;
