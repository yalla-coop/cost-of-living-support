import TextWithIcon from '../TextWithIcon';

import * as S from './style';

const HelpfulResources = ({ resources = [], ...props }) => {
  return (
    <S.Wrapper {...props}>
      <TextWithIcon
        iconColor="primaryMain"
        icon="discover"
        text="Helpful resources"
        mb="3"
        ai="flex-start"
      />

      {resources.map((r, index) => (
        <S.LinkWrapper key={r.label + index}>
          <TextWithIcon
            iconColor="primaryMain"
            icon="open"
            text={r.label}
            to={r.link}
            external
            underline
          />
        </S.LinkWrapper>
      ))}
    </S.Wrapper>
  );
};

export default HelpfulResources;
