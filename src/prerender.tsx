import React from 'react';
import { renderToString } from 'react-dom/server';
import ApplicationShell from './ApplicationShell';

export function renderHomepage() {
  return renderToString(<ApplicationShell initialLanguage="de" />);
}
