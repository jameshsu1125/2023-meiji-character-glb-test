import { memo, useContext, useState } from 'react';
import { Context } from '../../settings/config';
import { ACTION } from '../../settings/constant';
import { LandingContext, LandingSteps } from './config';

const Landing = memo(({ children }) => {
	const value = useState(LandingSteps);
	const [, setContext] = useContext(Context);

	return (
		<LandingContext.Provider value={value}>
			<div className='Landing'>{children}</div>
			<button
				className='rounded bg-blue-500 p-2 font-bold text-white hover:bg-blue-700'
				type='button'
				onClick={() => {
					setContext({
						type: ACTION.LoadingProcess,
						state: { enabled: true },
					});
					setTimeout(() => {
						setContext({
							type: ACTION.LoadingProcess,
							state: { enabled: false },
						});
					}, 2000);
				}}
			>
				UPLOAD
			</button>
		</LandingContext.Provider>
	);
});
export default Landing;
