import EnterFrame from 'lesca-enterframe';
import GlbLoader from 'lesca-glb-loader';
import Webgl from 'lesca-webgl-threejs';
import { memo, useContext, useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { LandingContext, LandingSteps, config } from './config';
import Avatar1 from './glb/Combine_v3.glb';
import Mushroom from './glb/Mushroom_pack.glb';
import Bamboo from './glb/bamboo_pack.glb';
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
	const [loadModelIndex, setLoadModelIndex] = useState(0);

	useEffect(() => {
		indexRef.current = index;
	}, [index]);

	useEffect(() => {
		if (mixer.length !== 0 && loadModelIndex === 2) {
			EnterFrame.add(() => {
				const delta = webglRef.current.clock.getDelta();
				mixer[indexRef.current].update(delta);
				webglRef.current.stats.end();
			});
			setContext({ type: ACTION.LoadingProcess, state: { enabled: false } });
		}
	}, [mixer, loadModelIndex]);

	useEffect(() => {
		setContext({ type: ACTION.LoadingProcess, state: { enabled: true } });
		const webgl = new Webgl(config);
		ref.current.appendChild(webgl.render.domElement);
		webglRef.current = webgl;

		webgl.render.setClearColor(0x000000, 0);

		const material = new THREE.MeshStandardMaterial();
		material.metalness = 0;
		material.roughness = 0.4;

		const plane = new THREE.BoxGeometry(100, 0.1, 100);
		const planeMesh = new THREE.Mesh(plane, material);
		planeMesh.receiveShadow = true;
		planeMesh.position.y = -1.23;
		// webgl.scene.add(planeMesh);

		const glbs = [Avatar1, Mushroom, Bamboo];
		Promise.all(glbs.map((e) => GlbLoader(e))).then((items) => {
			items.forEach((e, idx) => {
				const { model, mixers, gltf } = e;
				model.scale.set(scale, scale, scale);

				if (idx === 0) webgl.scene.add(model);
				model.position.y = positionY;
				const offsetX = [0, -1.2, 1];
				model.position.x = offsetX[idx];
				// model.castShadow = true;
				gltf.scene.traverse((child) => {
					const mesh = child;
					if (mesh.isMesh) mesh.castShadow = true;
				});
				if (mixers.length > 0) setMixer(mixers);
				setLoadModelIndex(idx);
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
				<button
					className='w-full border hover:bg-gray-700'
					type='button'
					onClick={() => {
						const canvas = webglRef.current.render.domElement;
						const base64 = canvas.toDataURL('image/png', 1.0);

						const link = document.createElement('a');
						link.download = 'demo.png';
						link.href = base64;
						link.target = '_blank';
						link.click();
					}}
				>
					截圖
				</button>
			</div>
		</LandingContext.Provider>
	);
});
export default Landing;
