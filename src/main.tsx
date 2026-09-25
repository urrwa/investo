import './index.css';
import './decorative-motion.css';
import { mountApplication } from './bootstrap';

// The production HTML already contains the homepage. Hydrate immediately so
// React can attach controls and replay interactions during hydration.
void mountApplication();