import { useState } from 'react';
import ActionCard from '.';

export default {
  title: 'Common Components/ActionCard',
  argTypes: {},
};

const ActionCardExamples = (args) => {
  const [topic, setTopic] = useState({
    title: '',
    description: '',
    tips: [{ content: '', key: Math.random() * 1000 }],
  });

  return (
    <div style={{ width: '300px', margin: '20px' }}>
      <ActionCard {...args} m="2" topic={topic} setTopic={setTopic} />
    </div>
  );
};

export const actionCard = ActionCardExamples.bind({});
actionCard.args = {};
