import { useParams } from 'react-router-dom';

import {
  CallUsLink,
  Modal,
  Icon,
  Typography as T,
  Button,
  Inputs,
  Grid,
} from '../../components';
import { useSteps } from '../../context/steps';
import { useLang } from '../../context/lang';
import { t } from '../../helpers';
import { navRoutes as n } from '../../constants';

import * as S from './style';

const { Checkbox } = Inputs;
const { Row, Col } = Grid;

function Step() {
  const params = useParams();
  const { lang } = useLang();
  const { steps, checkUncheckItem, setJustCompletedId } = useSteps();

  const step = steps.find((s) => s.id === params.id);

  return (
    <Modal>
      <S.Container>
        <Row>
          <Col w={[4, 12, 12]}>
            <S.PageHead>
              <T.H2 weight="bold">
                {t(`${step.name}.secondaryTitle`, lang)}
              </T.H2>
              <S.Link to="/">
                <Icon icon="close" />
              </S.Link>
            </S.PageHead>
          </Col>
        </Row>
        <Row style={{ flex: 1 }}>
          <Col w={[4, 12, 6]}>
            <div style={{ width: '100%' }}>
              {step.externalButtonLink && (
                <Button
                  variant="primary"
                  text={t(`${step.name}.externalButtonTitle`, lang)}
                  to={n.EXTERNAL[step.externalButtonLink]}
                  target="_blank"
                  rel="noopener noreferrer"
                  external
                />
              )}
              <T.P isSmall weight="bold" mt="7" mb="5">
                {t('informationYouWillNeed', lang)}
              </T.P>
              {step.checkListItems.map((item) => (
                <Checkbox
                  key={item.value}
                  checked={item.isChecked}
                  handleChange={() => checkUncheckItem(step.name, item.value)}
                  label={t(`${step.name}.checkListItems.${item.value}`, lang)}
                  mb="5"
                />
              ))}
            </div>
            <div
              style={{ width: '100%', height: '58px', alignSelf: 'flex-end' }}
            >
              {step.isCompleted && (
                <Button
                  variant="secondary"
                  text={t('nextStep', lang)}
                  to={n.GENERAL.HOME}
                  handleClick={() => {
                    setJustCompletedId(step.id);
                  }}
                />
              )}
              {!step.isCompleted && step.externalLink && (
                <CallUsLink
                  text={t('callUsLinkText', lang)}
                  href={n.EXTERNAL.CALL_US}
                  target="_blank"
                  rel="noopener noreferrer"
                />
              )}
            </div>
          </Col>
        </Row>
      </S.Container>
    </Modal>
  );
}

export default Step;
