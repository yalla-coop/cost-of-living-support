import { useAuth } from '../../context/auth';
import userRoles from '../../constants/roles';
import { Textarea } from '../Inputs';
import MDEditor from '../MDEditor';
import Icon from '../Icon';

import * as S from './style';

const TipInput = ({ content, id, setTip, removeTip }) => {
  const { user } = useAuth();
  return (
    <S.TipInputWrapper>
      {user.role === userRoles.SUPER_ADMIN ? (
        <MDEditor
          label="Tips"
          optional
          rows="3"
          value={content}
          onChange={(value) => setTip(value, id)}
        />
      ) : (
        <Textarea
          label="Tips"
          optional
          rows="3"
          value={content}
          handleChange={(value) => setTip(value, id)}
        />
      )}
      <S.CloseTipButton type="button" onClick={() => removeTip(id)}>
        <Icon icon="close" pointer color="primaryDark" />
      </S.CloseTipButton>
    </S.TipInputWrapper>
  );
};

export default TipInput;
