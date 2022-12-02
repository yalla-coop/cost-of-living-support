import styled from '@emotion/styled';

export const Wrapper = styled.div`
  & ul {
    margin-inline-start: 20px;
    color: ${({ theme, color }) => theme.colors[color]};
  }
  & div {
    color: ${({ theme, color }) => theme.colors[color]};
    font-family: ${({ theme }) =>
      theme.layoutFontFamily || "'new-hero', sans-serif"};
    font-size: 1rem !important;
    line-height: 24px !important;
    font-weight: 600 !important;
  }
`;
