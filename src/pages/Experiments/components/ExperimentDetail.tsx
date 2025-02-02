import { useParams } from "react-router-dom";
import { experimentsData } from "..";

const ExperimentDetail = () => {
  const { id } = useParams<{ id: string }>();
  console.log(id);

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
