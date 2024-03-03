import AppStoreImage from "../../../images/Appstore.png";
import PlayStoreImage from "../../../images/playstore.png";
import "./Footer.css";
const Footer = () => {
  return (
    <div className="footer">
      <h1>Ecommerce</h1>
      <div>
        <div className="left-footer">
          <h4>Download our app</h4>
          {/* <p>Download app for Android and ios mobile phone</p> */}
          <img src={AppStoreImage} alt="" />
          <img src={PlayStoreImage} alt="" />
        </div>
        <div className="mid-footer">
          {/* <h1>Ecommerce</h1> */}
          <p>High quality is our first priority</p>
          <p>Copyright 2023 @ Ritik Agarwal</p>
        </div>
        <div className="right-footer">
          <h4>Follow us</h4>
          <a
            href="https://www.linkedin.com/in/ritik-agarwal-04986a257/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Linkedin
          </a>
          <a
            href="https://github.com/ritikvr"
            target="_blank"
            rel="noopener noreferrer"
          >
            Github
          </a>
        </div>
      </div>
    </div>
  );
};
export default Footer;
