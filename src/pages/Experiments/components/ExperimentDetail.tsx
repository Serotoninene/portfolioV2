import { useParams } from "react-router-dom";
import { DrawingCanvas, InstancedBlocks, Portal } from ".";

const componentMapping = {
  portal: Portal,
  instancedblocks: InstancedBlocks,
  drawing_canvas: DrawingCanvas,
};

const ExperimentDetail = () => {
  const { id } = useParams();
  const ComponentToRender = id && componentMapping[id];

  return (
    <div className="h-screen">{ComponentToRender && <ComponentToRender />}</div>
  );
};

export default ExperimentDetail;
