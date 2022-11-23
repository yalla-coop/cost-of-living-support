import {
  FacebookShareButton,
  WhatsappShareButton,
  EmailShareButton,
} from 'react-share';
import { message } from 'antd';

import FacebookIcon from '../assets/FacebookImg.png';
import WhatsappIcon from '../assets/WhatsappImg.png';
import EmailIcon from '../assets/EmailImg.png';
import CopyImg from '../assets/CopyImg.png';
import { Grid, Typography as T } from '..';

import * as S from './style';
const { Col, Row } = Grid;

const ShareBox = ({ title }) => {
  const url = window.location.href;
  return (
    <Row mt="6" mb="6">
      <Col w={[4, 12, 12]}>
        <S.Box>
          <T.P isSmall color="neutralMain" weight="semi" mr="2">
            Share this page
          </T.P>
          <S.SocialWrapper>
            <FacebookShareButton url={url} quote={`Advice for ${title}`}>
              <S.SocialImg alt="Facebook" src={FacebookIcon} />
            </FacebookShareButton>
            <WhatsappShareButton url={url} title={`Advice for ${title}`}>
              <S.SocialImg alt="whatsapp" src={WhatsappIcon} />
            </WhatsappShareButton>

            <EmailShareButton
              url={url}
              subject={`Advice for ${title}`}
              body={`Here is Advice for  ${title}`}
            >
              <S.SocialImg alt="email" src={EmailIcon} />
            </EmailShareButton>
            <S.SocialImg
              alt="copy"
              src={CopyImg}
              mr="0px"
              onClick={() => {
                navigator.clipboard.writeText(url);
                message.info(`Link copied to clipboard ${url}`);
              }}
            />
          </S.SocialWrapper>
        </S.Box>
      </Col>
    </Row>
  );
};

export default ShareBox;
