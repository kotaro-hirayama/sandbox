import * as React from 'react';
import { Route, Link } from 'react-router-dom';
import loadable from '@loadable/component';
import * as styled from 'styled-components';
import { IntlProvider, FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';

import { ResetStyle, GlobalStyle } from 'presentations/components/Styles';
import { chooseLocale } from 'presentations/components/SampleComponent.locale';
import { Home } from 'presentations/components/Home';

// const LoadableHome = loadable((): any => import(/* webpackChunkName: "home" */'presentations/components/Home').then(({ Home }) => Home));
const LoadableAbout = loadable((): any => import(/* webpackChunkName: "about" */'presentations/components/About').then(({ About }) => About));
const LoadableUsers = loadable((): any => import(/* webpackChunkName: "users" */'presentations/components/Users').then(({ Users }) => Users));

const mapDispatchToProps = (dispatch: any) => {
  return {
    onCountUpClick: () => {
      dispatch({ type: 'INCREMENT' });
    },
    onCountDownClick: () => {
      dispatch({ type: 'DECREMENT' });
    }
  }
}

const mapStateToProps = (state: any) => {
  return {
    count: state,
  }
}

export function SampleComponent(props: any) {
  const locale: string = 'ja';

  return (
    <IntlProvider locale={locale} messages={chooseLocale(locale)}>
      <>
        <ResetStyle />
        <GlobalStyle />
        <div>
          <FormattedMessage
            id="SampleComponent.Hello"
            values={{name: 'khirayama'}}
          />
          <nav>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/about/">About</Link>
              </li>
              <li>
                <Link to="/users/">Users</Link>
              </li>
            </ul>
          </nav>
          <div onClick={props.onCountUpClick}>COUNT UP</div>
          <div onClick={props.onCountDownClick}>COUNT DOWN</div>
          <div>{props.count}</div>

          <Route exact path="/" component={Home} />
          <Route exact path="/about/" component={LoadableAbout} />
          <Route exact path="/users/" component={LoadableUsers} />
        </div>
      </>
    </IntlProvider>
  );
}

export const Sample = connect(
  mapStateToProps,
  mapDispatchToProps
)(SampleComponent)