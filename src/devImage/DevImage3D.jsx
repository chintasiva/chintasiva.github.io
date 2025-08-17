import { useFrame, useLoader } from "@react-three/fiber";
import * as THREE from "three";
import { useRef } from "react";
import reactImg from "../assets/react.svg"


function DevImage3D() {
    const texture = useLoader(THREE.TextureLoader, reactImg);
    const meshRef = useRef();

    useFrame(() => {
        if (meshRef.current) {
            meshRef.current.rotation.y += 0.003; // smooth rotation
        }
    });

    return (
        <mesh ref={meshRef}>
            <sphereGeometry args={[1.5, 64, 64]} />

            {/* Sphere with your image only on the front side */}
            <meshStandardMaterial map={texture} />

            {/* To avoid stretching -> add this */}
            <meshStandardMaterial
                map={texture}
                transparent
                side={THREE.FrontSide}
            />
        </mesh>
    );
}

export default DevImage3D;