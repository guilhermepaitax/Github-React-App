import styled from 'styled-components';

export const Line = styled.div`
  height: 17px;
  width: ${props => props.width || '70%'};
  margin-top: 15px;
  border-radius: 4px;
`;

export const Circle = styled.div`
  width: 110px;
  height: 110px;
  border-radius: 50%;
  margin-top: 20px;
`;
