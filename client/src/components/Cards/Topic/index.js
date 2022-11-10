import { useState } from 'react';
import * as S from './style';
import * as T from '../../Typography';
import TextWithIcon from '../../TextWithIcon';
import Tips from '../Tips';
import Icon from '../../Icon';
import HelpfulResources from '../../HelpfulResources';

const TopicCard = ({
  title,
  description,
  thisCanInclude,
  tips,
  resources,
  startingColor,
  marked,
  handleChange,
}) => {
  const [expanded, setExpanded] = useState(false);
  const handleClick = () => {
    if (marked) {
      return handleChange(false);
    } else {
      handleChange(true);
      if (expanded) {
        setExpanded(false);
      }
    }
  };
  return (
    <>
      <S.Section mb="3">
        <S.TopSection>
          <S.MarkButton onClick={handleClick}>
            <S.IconWrapper>
              <Icon
                color={marked ? 'secondaryMain' : 'secondaryLight'}
                icon="bookMark"
                pointer
                mr="6px"
              />
              <T.H3>{title}</T.H3>
            </S.IconWrapper>
          </S.MarkButton>

          {(description || thisCanInclude?.length > 0 || tips?.length > 0) && (
            <TextWithIcon
              text={expanded ? 'See less' : 'See more'}
              icon="circleArrow"
              isButton
              mt="4"
              color="neutralDark"
              iconColor="neutralDark"
              direction={expanded ? 'up' : 'down'}
              handleClick={() => setExpanded(!expanded)}
              mb={'5'}
              ml="6"
            />
          )}
        </S.TopSection>
        {expanded &&
          (description || thisCanInclude?.filter((e) => !!e)?.length > 0) && (
            <S.ExtraDetails>
              {description && <T.P color="neutralDark">{description}</T.P>}
              {thisCanInclude?.filter((v) => !!v)?.length > 0 && (
                <>
                  <T.H3 color="neutralDark" mb="3">
                    This can include things like:
                  </T.H3>
                  {thisCanInclude
                    .filter((v) => !!v)
                    .map((thing, index) => (
                      <TextWithIcon
                        key={index}
                        text={thing}
                        icon="bulletArrow"
                        iconColor="neutralDark"
                        color="neutralDark"
                        mb={index < thisCanInclude.length && '2'}
                        ai="flex-start"
                        isText
                      />
                    ))}
                </>
              )}
            </S.ExtraDetails>
          )}
      </S.Section>
      {expanded && tips?.length > 0 && (
        <Tips tips={tips} mb="5" inner startingColor={startingColor} />
      )}
      {expanded && resources?.length > 0 && (
        <HelpfulResources resources={resources} mb="5" />
      )}
    </>
  );
};

export default TopicCard;
