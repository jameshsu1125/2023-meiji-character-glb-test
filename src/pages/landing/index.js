import EnterFrame from 'lesca-enterframe';
import GlbLoader from 'lesca-glb-loader';
import Webgl from 'lesca-webgl-threejs';
import { memo, useContext, useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { LandingContext, LandingSteps, config } from './config';
import Avatar1 from './glb/Combine_v2.glb';
import { Context } from '../../settings/config';
import { ACTION } from '../../settings/constant';

const scale = 1;
const positionY = -1.2;

const Landing = memo(() => {
	const [, setContext] = useContext(Context);
	const webglRef = useRef();
	const indexRef = useRef(0);
	const ref = useRef();
	const value = useState(LandingSteps);
	const [index, setIndex] = useState(indexRef.current);
	const [mixer, setMixer] = useState([]);

	useEffect(() => {
		indexRef.current = index;
	}, [index]);

	useEffect(() => {
		if (mixer.length !== 0) {
			EnterFrame.add(() => {
				const delta = webglRef.current.clock.getDelta();
				mixer[indexRef.current].update(delta);
				webglRef.current.stats.end();
			});
			setContext({ type: ACTION.LoadingProcess, state: { enabled: false } });
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

		const glbs = [Avatar1];
		Promise.all(glbs.map((e) => GlbLoader(e))).then((items) => {
			items.forEach((e) => {
				const { model, mixers, gltf } = e;
				model.scale.set(scale, scale, scale);
				webgl.scene.add(model);
				model.position.y = positionY;
				model.castShadow = true;
				gltf.scene.traverse((child) => {
					const mesh = child;
					if (mesh.isMesh) mesh.castShadow = true;
				});
				setMixer(mixers);
			});
		});
	}, []);

	return (
		<LandingContext.Provider value={value}>
			<div ref={ref} className='Landing' />
			<div className='absolute right-0 top-0 flex w-40 flex-col justify-center bg-black'>
				<button
					className='w-full border hover:bg-gray-700'
					type='button'
					onClick={() => setIndex(0)}
				>
					掉落
				</button>
				<button
					className='w-full border hover:bg-gray-700'
					type='button'
					onClick={() => setIndex(1)}
				>
					跑步
				</button>
				<button
					className='w-full border hover:bg-gray-700'
					type='button'
					onClick={() => setIndex(2)}
				>
					揮手
				</button>
			</div>
		</LandingContext.Provider>
	);
});
export default Landing;
