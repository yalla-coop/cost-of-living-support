import { Icon, TextWithIcon } from '../../components';
import * as S from './style';

const SingleButton = ({
  title,
  iconColor,
  showMenuIcon,
  handleEdit,
  handleHide,
  hidden,
  ...props
}) => {
  return (
    <S.ButtonWrapper {...props}>
      <S.ButtonContent>
        <TextWithIcon
          icon="forwardArrow"
          iconColor={iconColor}
          text={title.replace(/\*/g, '')}
          isText
        />
        {(showMenuIcon || handleEdit) && (
          <S.ButtonWrapper>
            {handleEdit && (
              <TextWithIcon
                icon="edit"
                iconColor="primaryDark"
                pointer
                isButton
                text="Edit"
                mr="1"
              />
            )}
            {showMenuIcon && (
              <S.MenuButton>
                <Icon icon="menu2" />
              </S.MenuButton>
            )}
          </S.ButtonWrapper>
        )}
      </S.ButtonContent>
      {handleHide && (
        <S.HideWrapper ml="2" mb="2">
          <TextWithIcon
            icon="hide"
            iconColor="primaryDark"
            isButton
            pointer
            text={hidden ? 'Show' : 'Hide'}
            handleClick={handleHide}
            mr="1"
          />
        </S.HideWrapper>
      )}
    </S.ButtonWrapper>
  );
};

export default SingleButton;
