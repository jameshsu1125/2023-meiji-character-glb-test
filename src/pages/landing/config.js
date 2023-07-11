import { createContext } from 'react';

export const LandingSteps = { unset: 0 };
export const LandingState = { steps: LandingSteps.unset };
export const LandingContext = createContext(LandingState);
