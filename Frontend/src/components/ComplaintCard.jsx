import "./ComplaintCard.css";

const ComplaintCard = ({
  title,
  status
}) => {
  return (
    <div className="complaint-card">
      <h3>{title}</h3>

      <p>
        Status:
        <strong> {status}</strong>
      </p>
    </div>
  );
};

export default ComplaintCard;