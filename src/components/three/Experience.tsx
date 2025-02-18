import { CustomCanvas } from ".";

export const Experience = () => {
  return (
    <div className="h-full">
      <CustomCanvas>
        <mesh>
          <sphereBufferGeometry args={[100, 32, 32]} />
          <meshStandardMaterial color="red" />
        </mesh>
      </CustomCanvas>
    </div>
  );
};
