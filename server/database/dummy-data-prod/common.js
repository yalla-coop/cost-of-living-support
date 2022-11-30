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
        goBack: 'Go back',
        stuckTalkToSomeOne: 'Stuck? Talk to someone',
        accessibility: 'Accessibility',
        decreaseTextSize: '- Decrease text size',
        increaseTextSize: '+ Increase text size',
      },
      heading: {
        costOfLivingHelper: 'Cost of Living Helper',
        shareThisPage: 'Share this page',
        helpfulResources: 'Helpful resources',
      },
      section: {
        subSection: {
          description:
            'So we can show you the best information, which one of these best describes you?',
        },
        changeLanguage: {
          title: 'Change language',
          placeholder: 'Search',
        },
        worriedAbout: {
          title: 'I’m worried about...',
          description:
            'If you are worried about money there is a lot of help out there. Knowing where to start can be tricky, but in this tool you will find advice and handy tips about what you can do. You can also bookmark actions as you look through.',
        },
        helpMe: {
          title: 'Help!',
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
        accessibility: {
          title: 'Accessibility',
          description1:
            'Accessibility on this website is guided by government standards and the Web Content Accessibility Guidelines WCAG are widely accepted as the international standard for accessibility on the web.',
          description2:
            'Whilst we aim to make this website accessible to all users and achieve a conformance level ‘AAA’; we continually work with stakeholders to ensure that conformance level ‘A’ is adhered to as a minimum.',
          tip1: 'Tip! If you experience any accessibility issue on this site or have any comment, please',
          tip2: 'Tip! Click increase text size by 25% (e.g. 16px to 20px)',
          contactUs: 'contact us',
          adjustTextSize: 'Adjust Text Size',
        },
        stillNeedHelp: {
          title: 'Still need help?',
          subtitle: 'If you’d like to talk to someone, call ',
        },
        budgeting: {
          title: '**Budgeting**',
          tip: 'Tip!',
          description:
            'Doing a budget to work out how much money you have coming in and going out is a great place to start. There are many budgeting tools available to help you do this, however a debt advisor or a money advisor will be able to help you if you find it difficult to do on your own.',
          tipTitle: 'Here are our top tips',
          tip1P1:
            'When doing your budget be as honest and accurate as possible.',
          tip1P2:
            'Put down what you actually spend, as opposed to what you think you should or could spend.',
          tip1P3:
            'By creating an accurate budget you get the best possible starting point for making the most of your money, talking to creditors, or getting money or debt advice.',
          tip2P1:
            'Most budgets are done for a calendar month; keep this in mind when adding your income and outgoings. For example, to work out the monthly sum for something you pay weekly you will need to multiply the sum by 52 (weeks), then divide by 12 (months).',
          tip2P2: 'A budget tool will do this for you automatically.',
        },
        mentalHealthSupport: {
          title: '**Mental Health Support**',
          description1:
            "Worrying about money can affect your mental health. Taking action, like using this tool, is a good first step. However if you're feeling overwhelmed, support is out there. Many people are feeling the same way.",
          description2:
            ' If you feel you need to speak to someone right now the Samaritans offer a free 24h confidential listening service. You can talk to them about anything that is upsetting or worrying you.',
          samaritansHelpline: 'Samaritans Helpline:',
          samaritansHours: '(Monday to Sunday at any time)',
        },
      },
    },
  });

  return {
    common,
  };
};

export default addCommon;
