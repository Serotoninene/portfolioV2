import { useParams } from "react-router-dom";
import { Portal } from ".";

const componentMapping = {
  portal: Portal,
};

const ExperimentDetail = () => {
  const { id } = useParams();

  const ComponentToRender = id && componentMapping[id];

  return (
    <div className="min-h-screen">
      {" "}
      <h1>{id}</h1>
      {ComponentToRender && <ComponentToRender />}
    </div>
  );
};

export default ExperimentDetail;
