import { createContext } from 'react';

export const LandingSteps = { unset: 0 };
export const LandingState = { steps: LandingSteps.unset };
export const LandingContext = createContext(LandingState);

export const config = {
	camera: { fov: 10, far: 200 },
	sky: {
		enabled: false,
		turbidity: 0,
		rayleigh: 0.079,
		mieCoefficient: 0.023,
		mieDirectionalG: 0.226,
		inclination: 70,
		azimuth: -102.7,
	},
	controls: {
		distance: { min: 30, max: 200 },
		polar: { min: 5, max: 60 },
		azimuth: { min: -Infinity, max: Infinity },
		offsetAzimuth: 0,
		enabled: true,
		panEasing: 100,
	},
	light: {
		ambient: {
			color: 0x5289d2,
			intensity: 3,
		},
		spot: {
			color: 0xffffff,
			intensity: 1,
			far: 50,
			position: { x: 0, y: 10, z: 10 },
		},
		shadowMapSize: 512,
	},
	renderer: { alpha: false, shadowType: 0, exposure: 1, preserveDrawingBuffer: true },
	physics: false,
	stats: true,
};
