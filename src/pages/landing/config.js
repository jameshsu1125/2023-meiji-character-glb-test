import { createContext } from 'react';

export const LandingSteps = { unset: 0 };
export const LandingState = { steps: LandingSteps.unset };
export const LandingContext = createContext(LandingState);

export const config = {
	camera: { fov: 40, far: 200 },
	sky: {
		enabled: true,
		turbidity: 0,
		rayleigh: 0.079,
		mieCoefficient: 0.023,
		mieDirectionalG: 0.226,
		inclination: 70,
		azimuth: -102.7,
	},
	controls: {
		distance: { min: 30, max: 100 },
		polar: { min: 5, max: 60 },
		azimuth: { min: -Infinity, max: Infinity },
		offsetAzimuth: 0,
		enabled: true,
		panEasing: 100,
	},
	light: {
		ambient: {
			color: 0x5289d2,
			intensity: 0.6,
		},
		spot: {
			color: 0xffffff,
			intensity: 5,
			far: 50,
			position: { x: 10, y: 10, z: 0 },
		},
		shadowMapSize: 1024,
	},
	renderer: { alpha: false, shadowType: 0, exposure: 0.5 },
	physics: false,
	stats: true,
};
