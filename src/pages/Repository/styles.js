import styled from 'styled-components';

export const Owner = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  a {
    align-self: flex-start;
    opacity: 0.2;
    border-radius: 6px;
    padding: 8px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  a:hover {
    opacity: 1;
    box-shadow: 0 2px 4px -1px rgba(0, 0, 0, 0.15);
    transform: scale(1.08) translateY(-1.5px);
    transition: all 0.2s ease;
  }

  img {
    width: 110px;
    border-radius: 50%;
    margin-top: 20px;
  }

  h1 {
    font-size: 24px;
    margin-top: 15px;
    font-weight: 500;
    text-transform: capitalize;
  }

  p {
    margin-top: 15px;
    font-size: 14px;
    color: #666;
    line-height: 1.4;
    text-align: center;
    max-width: 400px;
  }
`;
