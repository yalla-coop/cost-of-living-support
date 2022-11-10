import { Textarea } from '../../Inputs';
import Icon from '../../Icon';

import * as S from './style';

const TipInput = ({ setTips, index, tip }) => {
  return (
    <S.TipInputWrapper>
      <Textarea
        label="Tips"
        optional
        value={tip.content}
        handleChange={(value) =>
          setTips((old) =>
            old.map((t, idx) => (idx === index ? { ...t, content: value } : t))
          )
        }
      />
      <S.CloseTipButton
        type="button"
        onClick={() => setTips((old) => old.filter((t, idx) => idx !== index))}
      >
        <Icon icon="close" color="primaryMain" />
      </S.CloseTipButton>
    </S.TipInputWrapper>
  );
};

export default TipInput;
