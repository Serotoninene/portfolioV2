import { Link } from "react-router-dom";

const experimentsData = [
  {
    title: "Portal",
    description: "This is a description of the experiments page.",
    img: "https://via.placeholder.com/500",
  },
  {
    title: "Experiments",
    description: "This is a description of the experiments page.",
    img: "https://via.placeholder.com/500",
  },
  {
    title: "Experiments",
    description: "This is a description of the experiments page.",
    img: "https://via.placeholder.com/500",
  },
  {
    title: "Experiments",
    description: "This is a description of the experiments page.",
    img: "https://via.placeholder.com/500",
  },
  {
    title: "Experiments",
    description: "This is a description of the experiments page.",
    img: "https://via.placeholder.com/500",
  },
];

const Experiments = () => {
  return (
    <div className="relative min-h-[--fullScreen] z-20 text-black pt-10">
      <h1>Experiments</h1>

      {experimentsData.map((experiment, idx) => (
        <div key={idx}>
          <Link to="/experiments/portal">{experiment.title}</Link>
          <p>{experiment.description}</p>
          <img src={experiment.img} alt={experiment.title} />
        </div>
      ))}
    </div>
  );
};

export default Experiments;
