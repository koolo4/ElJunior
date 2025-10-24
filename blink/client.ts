import { createClient } from '@blinkdotnew/sdk';

export const blink = createClient({
  projectId: 'eljunior-mobile-app-8wlb2z3p',
  auth: { mode: 'headless' }
});
