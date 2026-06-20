import "./StatCard.css";

const StatCard = ({ title, count }) => {
  return (
    <div className="stat-card">
      <h3>{title}</h3>
      <h2>{count}</h2>
    </div>
  );
};

export default StatCard;