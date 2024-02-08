import { useParams } from "react-router-dom";
import { InstancedBlocks, Portal } from ".";

const componentMapping = {
  portal: Portal,
  instancedblocks: InstancedBlocks,
};

const ExperimentDetail = () => {
  const { id } = useParams();
  const ComponentToRender = id && componentMapping[id];

  return (
    <div className="h-screen">{ComponentToRender && <ComponentToRender />}</div>
  );
};

export default ExperimentDetail;
