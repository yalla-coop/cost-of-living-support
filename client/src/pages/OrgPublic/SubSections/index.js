import { useState, useEffect } from 'react';
import { message } from 'antd';
import { useParams, generatePath } from 'react-router-dom';
import { Sections } from '../../../api-calls';
import { Typography as T, TextWithIcon, Grid } from '../../../components';
import PageHeader from '../../../components/PageHeader';
import GeneralPaddingSection from '../../../components/Layout/GeneralPaddingSection';
import { navRoutes } from '../../../constants';
import { usePublicOrg } from '../../../context/public-org';
import SocialBanner from '../../../components/SocialBanner';

import * as S from './style';
const { Col, Row } = Grid;

const SubSections = () => {
  const [data, setData] = useState({});
  const { publicOrg } = usePublicOrg();

  const { id } = useParams();

  useEffect(() => {
    let mounted = true;
    async function fetchData() {
      const hideMessage = message.loading('Loading...');
      const { data: _data, error } = await Sections.getSubSections({
        id,
        forPublic: true,
      });
      if (mounted) {
        if (error) {
          message.error('Something went wrong, please try again later');
        } else {
          setData(_data);
        }
        hideMessage();
      }
    }

    fetchData();
    return () => {
      mounted = false;
    };
  }, [id]);
  const colorArr = [
    'primaryMain',
    'secondaryMain',
    'tertiaryMain',
    'neutralMain',
  ];
  return (
    <S.Container>
      <PageHeader title={data.title} />
      <GeneralPaddingSection>
        <Row jc="center" mb="4">
          <Col w={[4, 8, 6]}>
            <T.H2>
              So we can show you the best information, which one of these best
              describes you?
            </T.H2>
          </Col>
        </Row>
        {data?.childrenSections?.map((item, index) => (
          <Row jc="center" mb="2">
            <Col w={[4, 8, 6]}>
              <S.ButtonWrapper
                to={generatePath(navRoutes.PUBLIC_ORG.SECTION, {
                  id: item.id,
                  uniqueSlug: publicOrg?.uniqueSlug,
                })}
              >
                <TextWithIcon
                  size="large"
                  bgColor="neutralSurface"
                  text={item.title}
                  icon="forwardArrow"
                  iconColor={colorArr[index % colorArr.length]}
                  jc="center"
                  jcT="flex-start"
                  mr="6px"
                  isText
                />
              </S.ButtonWrapper>
            </Col>
          </Row>
        ))}
      </GeneralPaddingSection>
      <SocialBanner title={data.title} />
    </S.Container>
  );
};

export default SubSections;
