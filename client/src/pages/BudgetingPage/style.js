import styled from '@emotion/styled';
import setMargin from '../../helpers/set-margin';

export const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

export const Title = styled.div`
  display: flex;
  margin-bottom: ${({ theme }) => theme.spacings[3]};
`;

export const TipList = styled.ul`
  ${setMargin};
  color: ${({ color, theme }) => theme.colors[color] || color || 'white'};
`;
