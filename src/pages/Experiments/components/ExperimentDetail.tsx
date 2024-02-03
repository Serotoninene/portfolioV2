import { useParams } from "react-router-dom";
import { Portal } from ".";

const componentMapping = {
  portal: Portal,
};

const ExperimentDetail = () => {
  const { id } = useParams();

  const ComponentToRender = id && componentMapping[id];

  return (
    <div className="h-screen">{ComponentToRender && <ComponentToRender />}</div>
  );
};

export default ExperimentDetail;
