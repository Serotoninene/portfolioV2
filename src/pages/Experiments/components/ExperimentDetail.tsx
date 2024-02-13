import { useParams } from "react-router-dom";
import { DistortedRectangle, FallingPixel, InstancedBlocks, Portal } from ".";

const componentMapping = {
  portal: Portal,
  instancedblocks: InstancedBlocks,
  falling_pixel: FallingPixel,
  distorted_rectangle: DistortedRectangle,
};

const ExperimentDetail = () => {
  const { id } = useParams();
  const ComponentToRender = id && componentMapping[id];

  return (
    <div className="h-screen">{ComponentToRender && <ComponentToRender />}</div>
  );
};

export default ExperimentDetail;
