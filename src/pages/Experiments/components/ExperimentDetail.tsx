import { useParams } from "react-router-dom";
import { DistortedRectangle, FallingPixel, InstancedBlocks, Portal, DistortedText } from ".";

const componentMapping = {
  portal: Portal,
  instancedblocks: InstancedBlocks,
  falling_pixel: FallingPixel,
  distorted_rectangle: DistortedRectangle,
  distorted_text: DistortedText
};

const ExperimentDetail = () => {
  const { id } = useParams();
  const ComponentToRender = id && componentMapping[id];

  return (
    <div className="h-screen">{ComponentToRender && <ComponentToRender />}</div>
  );
};

export default ExperimentDetail;
