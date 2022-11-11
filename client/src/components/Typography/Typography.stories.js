import React from 'react';

import { H0, H1, H2, H3, P, Link } from '.';

export default {
  title: 'Common Components/Typography',
  component: H1,
  argTypes: {
    color: 'pink',
    bold: {
      name: 'bold',
      defaultValue: true,
      type: { name: 'boolean', required: false },
    },
    caps: {
      name: 'caps',
      defaultValue: false,
      type: { name: 'boolean', required: false },
    },
    underline: {
      name: 'underline',
      defaultValue: false,
      type: { name: 'boolean', required: false },
    },
    mark: {
      name: 'mark',
      defaultValue: false,
      type: { name: 'boolean', required: false },
    },
    keyboard: {
      name: 'keyboard',
      defaultValue: false,
      type: { name: 'boolean', required: false },
    },
    ellipsis: {
      name: 'ellipsis',
      defaultValue: false,
      type: { name: 'boolean', required: false },
    },
    code: {
      name: 'code',
      defaultValue: false,
      type: { name: 'boolean', required: false },
    },
    m: {
      name: 'margin',
      defaultValue: '0',
      type: { name: 'string', required: false },
    },
    mx: {
      name: 'margin-x',
      defaultValue: '0',
      type: { name: 'string', required: false },
    },
    my: {
      name: 'margin-y',
      defaultValue: '0',
      type: { name: 'string', required: false },
    },
    mt: {
      name: 'margin-top',
      defaultValue: '0',
      type: { name: 'string', required: false },
    },
    mb: {
      name: 'margin-bottom',
      defaultValue: '0',
      type: { name: 'string', required: false },
    },
    ml: {
      name: 'margin-left',
      defaultValue: '0',
      type: { name: 'string', required: false },
    },
    mr: {
      name: 'margin-right',
      defaultValue: '0',
      type: { name: 'string', required: false },
    },
  },
};

const Heading0 = (args) => <H0 {...args}>Heading 0</H0>;

export const h0 = Heading0.bind({});
h0.args = {
  color: 'black',
};
export const h0Italic = Heading0.bind({});
h0Italic.args = {
  color: 'black',
  weight: 'regular',
  italic: true,
};

const Heading1 = (args) => <H1 {...args}>Heading 1</H1>;

export const h1 = Heading1.bind({});
h1.args = {
  color: 'black',
};

export const h1Italic = Heading1.bind({});
h1Italic.args = {
  color: 'black',
  weight: 'regular',
  italic: true,
};

const Heading2 = (args) => <H2 {...args}>Heading 2</H2>;

export const h2 = Heading2.bind({});
h2.args = {
  color: 'black',
};

export const h2Italic = Heading2.bind({});
h2Italic.args = {
  color: 'black',
  weight: 'regular',
  italic: true,
};

const Heading3 = (args) => <H3 {...args}>Heading 3</H3>;

export const h3 = Heading3.bind({});
h3.args = {
  color: 'black',
};
export const h3Italic = Heading3.bind({});
h3Italic.args = {
  color: 'black',
  weight: 'regular',
  italic: true,
};

const bodyTemplate = (args) => <P {...args}>Display/body large</P>;

export const BodyText = bodyTemplate.bind({});
BodyText.args = {
  color: 'black',
};

export const BodyTextBold = bodyTemplate.bind({});
BodyTextBold.args = {
  color: 'black',
  weight: 'bold',
};

export const BodyTextSmall = bodyTemplate.bind({});
BodyTextSmall.args = {
  color: 'black',
  isSmall: true,
};

const LinkTemplate = (args) => <Link {...args}>Display/regular</Link>;

export const LinkText = LinkTemplate.bind({});
LinkText.args = {
  color: 'black',
  underline: true,
  to: '/',
};

export const LinkTextExternal = LinkTemplate.bind({});
LinkTextExternal.args = {
  color: 'black',
  underline: true,
  external: true,
  to: 'https://www.youtube.com/',
};
