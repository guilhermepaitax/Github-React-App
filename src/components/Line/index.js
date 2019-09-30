import styled from 'styled-components';

export const Line = styled.div`
  height: 17px;
  width: ${props => props.width || '70%'};
  margin-left: ${props => props.marginLeft || '0'};
  margin-top: ${props => props.marginTop || '15px'};
  border-radius: 4px;
`;

export const Circle = styled.div`
  width: ${props => props.size || '110px'};
  height: ${props => props.size || '110px'};
  border-radius: 50%;
  margin-top: 20px;
`;
