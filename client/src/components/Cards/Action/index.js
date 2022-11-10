import { useState } from 'react';
import * as S from './style';
import { BasicInput, Textarea } from '../../Inputs';
import * as T from '../../Typography';
import TipInput from './TipInput';
import TextWithIcon from '../../TextWithIcon';

const Action = ({ topic, topicIndex, setTopics }) => {
  const [expanded, setExpanded] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [tips, setTips] = useState([
    { content: '', key: Math.random() * 1000 },
  ]);

  return (
    <S.Wrapper>
      <T.H2 mb="4" color="neutralMain">
        Topic {1 + topicIndex}
      </T.H2>
      <S.Section mb="3">
        <S.TopSection>
          <BasicInput
            name="title"
            placeholder="Type title here..."
            label="Title"
            value={title}
            handleChange={setTitle}
          />

          {!expanded && (
            <TextWithIcon
              text={expanded ? 'See less' : 'See more'}
              icon="circleArrow"
              isButton
              mt="4"
              color="neutralDark"
              iconColor="neutralDark"
              direction={expanded ? 'up' : 'down'}
              handleClick={() => setExpanded(!expanded)}
              mb={'5'}
              ml="6"
            />
          )}
        </S.TopSection>
        {expanded && (
          <S.CollapseContent>
            <Textarea
              label="Description"
              value={description}
              handleChange={setDescription}
            />
            {tips.map((t, index) => {
              return (
                <TipInput
                  key={t + index}
                  tip={t}
                  setTips={setTips}
                  index={index}
                />
              );
            })}
            <TextWithIcon
              text="Add another tip"
              icon="add"
              isButton
              mt="4"
              iconColor="primaryMain"
              handleClick={() => setTips((old) => [...old, { content: '' }])}
              mb={'5'}
            />
          </S.CollapseContent>
        )}
      </S.Section>
      <TextWithIcon
        text="Remove"
        icon="close"
        isButton
        mt="4"
        iconColor="primaryMain"
        handleClick={() =>
          setTopics((old) => {
            return old.filter((topic, idx) => {
              return idx !== topicIndex;
            });
          })
        }
        mb={'5'}
        ml="5"
        ai="left"
      />
    </S.Wrapper>
  );
};

export default Action;
