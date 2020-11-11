import React from 'react';
import styled from 'styled-components';

const Styles = styled.div`
  .footer {
    position: fixed;
    bottom: 0px;
    opacity: .9;
    font-size: 11px;
    max-width: unset;
    background-color: white;
    z-index: 5;
    border: 1px lightgrey solid;
  }
`;

export default function Footer() {
  return (
    <Styles>
      <span fluid='true' className='float-left'>
        © {new Date().getFullYear()} Copyright: <a href='http://localhost:3000/'>AdveNew.com</a>
      </span>
      <span role='button' onClick={() => window.location.href = 'mailto:customercare@advenew.com?subject=Hello AdveNew'}>Contact AdvenNew</span>
    </Styles>
  );
}
