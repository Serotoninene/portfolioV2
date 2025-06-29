import { useParams } from "react-router-dom";

import { experimentsData } from "./experimentsData";
import { AnimLink } from "../../components/atoms";

const BackButton = () => {
  return (
    <div className="fixed bottom-5 left-5 z-50 overflow-hidden font-bold bg-black text-white px-2">
      <AnimLink href="/experiments">Back</AnimLink>
    </div>
  );
};

const ExperimentLayout = () => {
  const { id } = useParams<{ id: string }>();
  console.log(id);

  if (!id || !experimentsData[id]) {
    return (
      <>
        <BackButton />
        <div>Experiment not found</div>
      </>
    );
  }

  const ExperimentComponent = experimentsData[id].component;

  return (
    <div className="h-screen relative">
      <BackButton />
      <ExperimentComponent />
    </div>
  );
};

export default ExperimentLayout;
