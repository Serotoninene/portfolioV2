import { useParams } from "react-router-dom";
import { Portal } from ".";

const componentMapping = {
  portal: Portal,
};

const ExperimentDetail = () => {
  const { id } = useParams();

  const ComponentToRender = id && componentMapping[id];

  return (
    <div className="h-screen pt-12 px-5">
      <h1 className="text-4xl font-medium">{id}</h1>
      <div className="border border-dark rounded h-full">
        {ComponentToRender && <ComponentToRender />}
      </div>
    </div>
  );
};

export default ExperimentDetail;
