import * as React from 'react';
import * as styled from 'styled-components';
import { injectIntl } from 'react-intl';

import { Head } from 'client/components/head/Head';
import { Navigation } from 'client/components/common/Navigation';
import { Counter } from 'client/containers/Counter';

const Wrapper = styled.default.div`
  color: red;
`;

export const About = injectIntl(function(props) {
  const title: string = props.intl.formatMessage({ id: 'About.Title' });
  const description: string = props.intl.formatMessage({
    id: 'About.Description',
  });

  return (
    <>
      <Head title={title} description={description} />
      <Navigation />
      <Wrapper>
        <h2>About</h2>
        <Counter />
      </Wrapper>
    </>
  );
});