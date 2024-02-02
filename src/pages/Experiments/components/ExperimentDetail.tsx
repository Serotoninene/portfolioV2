import React from "react";
import { Portal } from ".";
import { useParams } from "react-router-dom";

const componentMapping = {
  portal: Portal,
  // Add other mappings here
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
