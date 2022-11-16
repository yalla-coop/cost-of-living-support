import { Row, Col } from '../../Grid';
import SingleTip from './SingleTip';

const colorArray = [
  {
    bg: 'secondaryMain',
    border: 'white',
    text: 'white',
    icon: 'white',
  },
  {
    bg: 'secondaryLight',
    border: 'secondaryMain',
    text: 'secondaryMain',
    icon: 'secondaryMain',
  },
  {
    bg: 'primaryLight',
    border: 'primaryMain',
    text: 'neutralMain',
    icon: 'primaryMain',
  },
  {
    bg: 'neutralSurface',
    border: 'neutralMid',
    text: 'neutralMain',
    icon: 'neutralDark',
  },
];

// create function that programmatically cycles through the colorArray in order
const getColor = (index, startingColor) => {
  const _index = (index + startingColor) % colorArray.length;
  return colorArray[_index];
};

const Tips = ({ tips = [], startingColor = 0, cols, inner, ...props }) => {
  return (
    <Row {...props} inner={inner}>
      {tips
        .filter((t) => !!t)
        .map((tip, index) => (
          <Col w={cols || [4, 12, 12]} key={index} inner>
            <SingleTip
              bgColor={getColor(index, startingColor).bg}
              borderColor={getColor(index, startingColor).border}
              icon={'bulb'}
              iconColor={getColor(index, startingColor).icon}
              tip={tip}
              textColor={getColor(index, startingColor).text}
              mb="3"
            />
          </Col>
        ))}
    </Row>
  );
};

export { SingleTip };

export default Tips;
