import * as path from 'path';

import express from 'express';
import * as React from 'react';
import * as ReactDOMServer from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import * as styled from 'styled-components';
import ReactHelmet from 'react-helmet';
import { Provider } from 'react-redux';
import { createStore, Action } from 'redux';

import { renderFullPage } from 'server/renderFullPage';
import { Sample } from 'presentations/components/SampleComponent';

function counter(state = { count: 1 }, action: Action) {
  switch (action.type) {
    case 'INCREMENT': {
      state.count + 1;
    }
    case 'DECREMENT': {
      state.count - 1;
    }
    default: {
      return state;
    }
    return state;
  }
}

export function get(req: express.Request, res: express.Response) {
  const context = {};
  const store = createStore(counter);

  const sheet = new styled.ServerStyleSheet();

  const assets = [''];
  const body = ReactDOMServer.renderToString(
    sheet.collectStyles(
      <StaticRouter
        location={req.url}
        context={context}
      >
        <Provider store={store}>
          <Sample />
        </Provider>
      </StaticRouter>
    )
  );
  const preloadedState = store.getState();
  const helmetContent = ReactHelmet.renderStatic();
  const meta = `
      ${helmetContent.meta.toString()}
      ${helmetContent.title.toString()}
      ${helmetContent.link.toString()}
    `.trim();
  const style = sheet.getStyleTags();
  const scripts = `<script src="/public/index.bundle.js"></script>`;

  res.send(renderFullPage({
    meta,
    assets,
    body,
    style,
    scripts,
    preloadedState: JSON.stringify(preloadedState),
  }));
}
