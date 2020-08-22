import React from "react";
import styled from "styled-components";

const Spinner = () => {
  return (
    <Wrapper>
      <div class="lds-ring">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </Wrapper>
  );
};

export default Spinner;

const Wrapper = styled.div`
  position: absolute;
  z-index: 99;
  width: 100%;
  height: 100%;
  background: #fff;

  .lds-ring {
    display: inline-block;
    position: relative;
    width: 80px;
    height: 80px;
    top: 50%;
    left: 50%;
  }
  .lds-ring div {
    box-sizing: border-box;
    display: block;
    position: absolute;
    width: 64px;
    height: 64px;
    margin: 8px;
    border: 8px solid #bababa;
    border-radius: 50%;
    animation: lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
    border-color: #bababa transparent transparent transparent;
  }
  .lds-ring div:nth-child(1) {
    animation-delay: -0.45s;
  }
  .lds-ring div:nth-child(2) {
    animation-delay: -0.3s;
  }
  .lds-ring div:nth-child(3) {
    animation-delay: -0.15s;
  }
  @keyframes lds-ring {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;
