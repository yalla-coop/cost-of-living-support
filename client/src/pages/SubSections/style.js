import styled from '@emotion/styled';
import * as T from '../../components/Typography';

export const PageContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-top: ${({ theme }) => theme.spacings[4]};
  padding-left: 37.5px;
  padding-right: 37.5px;
`;

export const ButtonWrapper = styled(T.Link)`
  border: none;
  outline: none;
  background: none;
  cursor: pointer;
  width: 100%;
  border: 1px solid red;
`;
