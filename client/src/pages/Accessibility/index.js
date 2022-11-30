import GeneralPaddingSection from '../../components/Layout/GeneralPaddingSection';
import { Typography as T, Grid, Cards as C, Button } from '../../components';
import { navRoutes as R } from '../../constants';
import { useAccessibility } from '../../context/accessibility';
import * as S from './style';
import { useTranslation } from 'react-i18next';
import { common } from '../../constants';

const { Col, Row } = Grid;

const Accessibility = () => {
  const { t } = useTranslation();
  const { isFontLarge, setIsFontLarge } = useAccessibility();

  const increaseTextSize = t(
    'common.buttons.increaseTextSize',
    common.buttons.increaseTextSize
  );
  const decreaseTextSize = t(
    'common.buttons.decreaseTextSize',
    common.buttons.decreaseTextSize
  );

  return (
    <GeneralPaddingSection>
      <Row jc="space-between">
        <Col w={[4, 12, 6]} dir="column" ai="flex-start">
          <T.H1 mtM="5">
            {t(
              'common.section.accessibility.title',
              common.section.accessibility.title
            )}
          </T.H1>
          <T.P mt="5">
            {t(
              'common.section.accessibility.description1',
              common.section.accessibility.description1
            )}
          </T.P>
          <T.P mt="5" mtM="0">
            {t(
              'common.section.accessibility.description2',
              common.section.accessibility.description2
            )}
          </T.P>
          <C.Tips
            mt="5"
            mtM="4"
            style={{ width: '300px' }}
            tips={[
              <T.H3 color="white">
                {t(
                  'common.section.accessibility.tip1',
                  common.section.accessibility.tip1
                )}{' '}
                <T.Link
                  to={`mailto:${R.EXTERNAL.HYDE_EMAIL}`}
                  color="white"
                  external
                  underline
                  weight="semi"
                >
                  {t(
                    'common.section.accessibility.contactUs',
                    common.section.accessibility.contactUs
                  )}
                </T.Link>{' '}
                .
              </T.H3>,
            ]}
            startingColor={0}
            mb="0"
          />
          <T.H2 mt="8" mtM="6">
            {t(
              'common.section.accessibility.adjustTextSize',
              common.section.accessibility.adjustTextSize
            )}
          </T.H2>
          <S.ButtonWrapper>
            <Button
              handleClick={() => {
                if (!isFontLarge) {
                  document.getElementsByTagName('html')[0].style.fontSize =
                    '1.25rem';
                  localStorage.setItem('isFontLarge', 'true');
                  setIsFontLarge(true);
                } else {
                  document.getElementsByTagName('html')[0].style.fontSize =
                    '1rem';
                  localStorage.removeItem('isFontLarge');
                  setIsFontLarge(false);
                }
              }}
              variant="primary"
              disabled={false}
              text={isFontLarge ? decreaseTextSize : increaseTextSize}
              type="submit"
              mt={4}
              w="300px"
            />
            <C.Tips
              mlM="0"
              mt="4"
              mtM="0"
              style={{ width: '300px' }}
              tips={[
                <T.P color="neutralMain" weight="semi">
                  {t(
                    'common.section.accessibility.tip2',
                    common.section.accessibility.tip2
                  )}
                </T.P>,
              ]}
              startingColor={3}
              mb="0"
            />
          </S.ButtonWrapper>
        </Col>
      </Row>
    </GeneralPaddingSection>
  );
};
export default Accessibility;
