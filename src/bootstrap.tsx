import React from 'react';
import {createRoot, hydrateRoot} from 'react-dom/client';
import ApplicationShell from './ApplicationShell';

export function mountApplication() {
  return new Promise<void>(resolve => {
    const root = document.getElementById('root')!;
    const isPrerendered = root.dataset.prerendered === 'true';
    const application = <ApplicationShell initialLanguage={isPrerendered ? 'de' : undefined} onReady={resolve} />;
    if (isPrerendered) hydrateRoot(root, application);
    else createRoot(root).render(application);
  });
}
