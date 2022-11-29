import { query } from '../connect';

const createCommon = async ({ content }) => {
  const sql = `INSERT INTO common (
    content
  ) VALUES (
    $1
  ) RETURNING *`;
  const res = await query(sql, [content]);
  return res.rows[0];
};

const addCommon = async () => {
  const common = await createCommon({
    content: {
      buttons: {
        readMore: 'Read more',
        seeAdvice: 'See advice',
        stuckTalkToSomeOne: 'Stuck? Talk to someone',
      },
      heading: {
        costOfLivingHelper: 'Cost of Living Helper',
        payingForHousing: 'Cost of Living Helper',
        payingForMyBills: 'Cost of Living Helper',
        payingForEssentials: 'Cost of Living Helper',
        dealingWithDebts: 'Cost of Living Helper',
        maximiseIncome: 'Cost of Living Helper',
      },
      section: {
        worriedAbout: {
          title: 'I’m worried about...',
          description:
            'If you are worried about money there is a lot of help out there. Knowing where to start can be tricky, but in this tool you will find advice and handy tips about what you can do. You can also bookmark actions as you look through.',
        },
        helpMe: {
          title: 'Help me!',
          subtitle: 'Help is here!',
          description:
            'We all need to speak to someone sometimes! Use any of the contact details below to find a person to chat with.',
          govHelpline: 'Goverment Helpline',
          govOpeningTimes: 'Monday to Friday, 8am to 6pm',
          govPhone: '0800 328 5644 (choose Option 3)',
        },
        helpBudget: {
          title: 'Need help with budgeting?',
          description:
            'You know how much is going in and out but if you need a hand, we can help you work it out.',
        },
        stressedOrOverwhelmed: {
          title: 'Feeling stressed or overwhelmed',
        },
      },
    },
  });

  return {
    common,
  };
};

export default addCommon;
