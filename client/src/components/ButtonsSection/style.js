import styled from '@emotion/styled';
import setMargin from '../../helpers/set-margin';
import theme from '../../theme';

export const Wrapper = styled.div`
  width: 100%;
  max-width: 624px;
  border-radius: 4px;
`;

export const buttonStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  width: '100%',
  minHeight: 52,
  color: theme.colors.neutralMain,
  backgroundColor: theme.colors.white,
  border: `2px solid ${theme.colors.primaryMain}`,
  borderRadius: 12,
  fontSize: '1rem',
  fontWeight: 'bold',
  padding: `0 ${theme.spacings[3]}`,
  cursor: 'pointer',
};

export const ButtonWrapper = styled.div`
  display: flex;
  width: 100%;
  cursor: ${({ cursor }) => cursor || 'pointer'};
`;
export const IconsWrapper = styled.div`
  display: flex;
  min-width: 96px;
`;
export const ButtonContent = styled.div`
  background: ${({ theme }) => theme.colors.neutralSurface};
  display: flex;
  justify-content: space-between;
  border-radius: 8px;
  padding: 24px;
  margin-bottom: 8px;
  width: 100%;
`;

export const HideWrapper = styled.div`
  ${setMargin};
  display: flex;
  min-width: 72px;
`;

export const MenuButton = styled.button`
  background: none;
  border: none;
  outline: none;
  cursor: pointer;
  margin-left: ${({ theme }) => theme.spacings[3]};
`;
