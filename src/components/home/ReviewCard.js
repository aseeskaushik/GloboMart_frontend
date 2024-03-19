import ReactStars from "react-rating-stars-component";
import profilePhoto from "../../images/Profile.png";

import "./ReviewCard.css";

const ReviewCard = (props) => {
  const options = {
    edit: false,
    color: "rgba(20,20,20,0.2)",
    activeColor: "#67727D",
    size: window.innerWidth < 600 ? 25 : 20,
    value: props.review.rating,
    isHalf: true,
  };
  return (
    <div className="review-card">
      <img
        src={
          props.review.user.avatar && props.review.user.avatar.url
            ? props.review.user.avatar.url
            : profilePhoto
        }
        alt="User"
      />
      <p>{props.review.name}</p>
      <ReactStars {...options} />
      <span>{props.review.comment}</span>
    </div>
  );
};
export default ReviewCard;
