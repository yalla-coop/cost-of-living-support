import { Textarea } from '../../Inputs';
import Icon from '../../Icon';

import * as S from './style';

const TipInput = ({ setTips, tips, index, tip }) => {
  return (
    <S.TipInputWrapper>
      <Textarea
        label="Tips"
        optional
        value={tip.content}
        handleChange={(value) => {
          const newTips = tips.map((t, idx) =>
            idx === index ? { ...t, content: value } : t
          );
          setTips(newTips);
        }}
      />
      <S.CloseTipButton
        type="button"
        onClick={() => {
          const newTips = tips.filter((t, idx) => idx !== index);
          setTips(newTips);
        }}
      >
        <Icon icon="close" color="primaryMain" />
      </S.CloseTipButton>
    </S.TipInputWrapper>
  );
};

export default TipInput;
