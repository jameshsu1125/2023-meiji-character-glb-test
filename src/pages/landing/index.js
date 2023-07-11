import EnterFrame from 'lesca-enterframe';
import GlbLoader from 'lesca-glb-loader';
import Webgl from 'lesca-webgl-threejs';
import { memo, useContext, useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { LandingContext, LandingSteps, config } from './config';
import Avatar1 from './glb/0710_run.glb';
import Avatar2 from './glb/0710_down.glb';
import Avatar3 from './glb/0710_waveglb.glb';
import { Context } from '../../settings/config';
import { ACTION } from '../../settings/constant';

const scale = 1;
const positionY = -1.2;

const Landing = memo(() => {
	const [, setContext] = useContext(Context);
	const webglRef = useRef();
	const ref = useRef();
	const value = useState(LandingSteps);
	const [mixer, setMixer] = useState([]);
	const [playTargetIndex, setTargetIndex] = useState();

	useEffect(() => {
		if (playTargetIndex !== undefined) {
			mixer.forEach((e, index) => {
				if (index === playTargetIndex) e.model.visible = true;
				else e.model.visible = false;
			});
		}
	}, [playTargetIndex]);

	useEffect(() => {
		if (mixer.length === 3) {
			EnterFrame.add(() => {
				const delta = webglRef.current.clock.getDelta();
				mixer.forEach((e) => e.mixers[0].update(delta));
			});
			setContext({ type: ACTION.LoadingProcess, state: { enabled: false } });
			setTargetIndex(0);
		}
	}, [mixer]);

	useEffect(() => {
		setContext({ type: ACTION.LoadingProcess, state: { enabled: true } });
		const webgl = new Webgl(config);
		ref.current.appendChild(webgl.render.domElement);
		webglRef.current = webgl;

		const material = new THREE.MeshStandardMaterial();
		material.metalness = 0;
		material.roughness = 0.4;

		const plane = new THREE.BoxGeometry(100, 0.1, 100);
		const planeMesh = new THREE.Mesh(plane, material);
		planeMesh.receiveShadow = true;
		planeMesh.position.y = -1.23;
		webgl.scene.add(planeMesh);

		const glbs = [Avatar1, Avatar2, Avatar3];
		Promise.all(glbs.map((e) => GlbLoader(e))).then((items) => {
			items.forEach((e) => {
				const { model, gltf } = e;
				model.scale.set(scale, scale, scale);
				webgl.scene.add(model);
				model.position.y = positionY;
				model.castShadow = true;
				model.visible = false;
				gltf.scene.traverse((child) => {
					const mesh = child;
					if (mesh.isMesh) mesh.castShadow = true;
				});
			});
			setMixer(items);
		});
	}, []);

	return (
		<LandingContext.Provider value={value}>
			<div ref={ref} className='Landing' />
			<div className='absolute right-0 top-0 flex w-40 flex-col justify-center bg-black'>
				<button
					className='w-full border hover:bg-gray-700'
					type='button'
					onClick={() => setTargetIndex(0)}
				>
					跑步
				</button>
				<button
					className='w-full border hover:bg-gray-700'
					type='button'
					onClick={() => setTargetIndex(1)}
				>
					掉落
				</button>
				<button
					className='w-full border hover:bg-gray-700'
					type='button'
					onClick={() => setTargetIndex(2)}
				>
					揮手
				</button>
			</div>
		</LandingContext.Provider>
	);
});
export default Landing;
