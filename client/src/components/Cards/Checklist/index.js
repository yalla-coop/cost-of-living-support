import { useState } from 'react';
import * as S from './style';
import * as T from '../../Typography';
import { Checkbox } from '../../Inputs';
import TextWithIcon from '../../TextWithIcon';
import Tips from '../Tips';
import { useTranslation } from 'react-i18next';
import { common } from '../../../constants';

const Checklist = ({
  title,
  name,
  description,
  thisCanInclude,
  tips,
  handleChange,
  completed,
}) => {
  const [expanded, setExpanded] = useState(false);
  const { t } = useTranslation();

  const seeMore = t('common.buttons.seeMore', common.buttons.seeMore);
  const seeLess = t('common.buttons.seeLess', common.buttons.seeLess);
  const seeMoreOrLess = expanded ? seeLess : seeMore;

  return (
    <>
      <S.Section mb="3">
        <S.TopSection>
          <Checkbox
            label={
              <T.H3 mt="2" ml="1" color="neutralMain">
                {title}
              </T.H3>
            }
            handleChange={handleChange}
            name={name}
            checked={completed}
            m={{ mb: '5' }}
          />
          {(description || thisCanInclude?.length > 0 || tips?.length > 0) && (
            <TextWithIcon
              text={seeMoreOrLess}
              isButton
              mt="4"
              color="neutralDark"
              iconProps={{
                color: 'neutralDark',
                icon: 'circleArrow',
                direction: expanded ? 'up' : 'down',
              }}
              handleClick={() => setExpanded(!expanded)}
              mb={'5'}
              ml="6"
            />
          )}
        </S.TopSection>
        {expanded &&
          (description || thisCanInclude?.filter((e) => !!e)?.length > 0) && (
            <S.ExtraDetails>
              {description && (
                <T.P color="neutralDark" mb="4">
                  {description}
                </T.P>
              )}
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
      {expanded && tips && <Tips tips={tips} mb="3" inner />}
    </>
  );
};

export default Checklist;
