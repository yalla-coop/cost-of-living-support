import styled from '@emotion/styled';

export const IconDropdownItem = styled.div`
  height: 50px;
  width: 100%;
  background-color: ${({ theme, bg }) => theme.colors[bg]};
  display: flex;
  align-items: center;
  justify-content: center;
`;
