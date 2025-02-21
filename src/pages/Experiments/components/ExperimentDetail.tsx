import { useParams } from "react-router-dom";
import { experimentsData } from "../experimentsData";

const ExperimentDetail = () => {
  const { id } = useParams<{ id: string }>();

  if (!id || !experimentsData[id]) {
    return <div>Experiment not found</div>;
  }

  const ExperimentComponent = experimentsData[id].component;

  return (
    <div className="h-screen">
      <ExperimentComponent />
    </div>
  );
};

export default ExperimentDetail;
