import { useState } from 'react';
import { Tips, Checklist, Action, SectionCard, TopicCard } from '.';
import * as T from '../Typography';

export default {
  title: 'Common Components/Cards',
  argTypes: {},
};

const TipsExample = (args) => (
  <div style={{ width: '300px' }}>
    <Tips {...args} m="2" />
  </div>
);

export const tips = TipsExample.bind({});
tips.args = {
  tips: ['tip 1', 'tip 2', 'tip 3', 'tip 4', 'tip 5'],
  startingColor: 0,
};

const TipsExample2 = (args) => (
  <div style={{ width: '300px' }}>
    <Tips {...args} m="2" />
  </div>
);

export const tips2 = TipsExample2.bind({});
tips2.args = {
  tips: [
    <a href="mailto:ucdigital@hyde-housing.co.uk">
      <T.H3 color="neutralMain">
        Interested in specific statistics? Get in touch with
        ucdigital@hyde-housing.co.uk
      </T.H3>
    </a>,
  ],
  startingColor: 3,
};

const ChecklistExamples = (args) => {
  const [checked, setChecked] = useState(false);

  return (
    <div style={{ width: '300px', margin: '20px' }}>
      <Checklist
        {...args}
        m="2"
        handleChange={() => setChecked(!checked)}
        completed={checked}
      />
    </div>
  );
};

export const checklist = ChecklistExamples.bind({});
checklist.args = {
  title: 'Income details',
  name: 'incomeDetails',
  description: 'Some extra description can go here from CMS',
  things: [
    'Salaries from an employer or self-employment',
    'Other Benefits you and/or your partner already receive',
    'Private pensions',
  ],
  tips: [
    'Please be mindful of accessibility and testing your colours work. You can find more information here',
    'Tips 2',
  ],
};

const ActionExamples = (args) => {
  const [checked, setChecked] = useState(false);

  return (
    <div style={{ width: '300px', margin: '20px' }}>
      <Action
        {...args}
        m="2"
        handleChange={() => setChecked(!checked)}
        completed={checked}
      />
    </div>
  );
};
const SectionCardExample = (args) => {
  return (
    <div style={{ width: '300px', margin: '20px' }}>
      <SectionCard {...args} m="2" />
    </div>
  );
};

export const actionCard = ActionExamples.bind({});
actionCard.args = {};
export const sectionCard = SectionCardExample.bind({});
export const sectionCard2 = SectionCardExample.bind({});
export const sectionCard3 = SectionCardExample.bind({});
export const sectionCard4 = SectionCardExample.bind({});
export const sectionCard5 = SectionCardExample.bind({});

sectionCard.args = {
  cardId: 1,
  to: '/',
  text: 'Paying for housing',
};
sectionCard2.args = {
  cardId: 2,
  to: '/',
  text: 'Paying for my bills',
};
sectionCard3.args = {
  cardId: 3,
  to: '/',
  text: 'Paying for essentials (Food, transport, medication)',
};

sectionCard4.args = {
  cardId: 4,
  to: '/',
  text: 'Dealing with debts',
};

sectionCard5.args = {
  cardId: 5,
  to: '/',
  text: 'How to maximise my income',
};

const TopicCardExamples = (args) => {
  const [marked, setMarked] = useState(false);

  return (
    <div style={{ width: '300px', margin: '20px' }}>
      <TopicCard {...args} m="2" handleChange={setMarked} marked={marked} />
    </div>
  );
};

export const topicCard = TopicCardExamples.bind({});
topicCard.args = {
  title: 'Income details',
  startingColor: 5,
  description: 'Some extra description can go here from CMS',
  things: [
    'Salaries from an employer or self-employment',
    'Other Benefits you and/or your partner already receive',
    'Private pensions',
  ],
  tips: [
    'Please be mindful of accessibility and testing your colours work. You can find more information here',
    'Please be mindful of accessibility and testing your colours work. You can find more information here',
  ],
  resources: [
    { label: 'Money Helper Budget Planner', link: 'https://www.figma.com/' },
    { label: 'Money Helper Budget Planner2', link: 'https://www.figma.com/' },
  ],
};
