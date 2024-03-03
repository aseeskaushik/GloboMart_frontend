import { Fragment, useEffect, useRef, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import FaceIcon from "@mui/icons-material/Face";
import Profile from "../../images/Profile.png";

import "./LoginSignUp.css";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, registerUser } from "../../store/user-actions";
import Loader from "../layout/loader/Loader";
import { toast } from "react-toastify";

const LoginSignUp = () => {
  const dispatch = useDispatch();
  const { loading, isAuthenticated } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [registerName, setRegisterName] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [avatar, setAvatar] = useState();
  const [avatarPreview, setAvatarPreview] = useState(Profile);

  const loginTab = useRef(null);
  const registerTab = useRef(null);
  const switcherTab = useRef(null);

  const switchTabHandler = (event, tab) => {
    if (tab === "login") {
      switcherTab.current.classList.add("shiftToNeutral");
      switcherTab.current.classList.remove("shiftToRight");

      registerTab.current.classList.add("initial");
      registerTab.current.classList.remove("shiftToRegisterLeft");
      loginTab.current.classList.remove("shiftToLoginLeft");
    }
    if (tab === "register") {
      switcherTab.current.classList.add("shiftToRight");
      switcherTab.current.classList.remove("shiftToNeutral");

      registerTab.current.classList.add("shiftToRegisterLeft");
      registerTab.current.classList.remove("initial");
      loginTab.current.classList.add("shiftToLoginLeft");
    }
  };

  const loginSubmitHandler = (event) => {
    event.preventDefault();
    if (loginEmail.replace(/[^\w\s]/gi, "") === "") {
      toast.error("Invalid Email");
      return;
    }
    if (loginPassword.length < 8) {
      toast.error("password should be 8 characters long");
      return;
    }
    dispatch(loginUser(loginEmail, loginPassword));
  };

  const signUpSubmitHandler = (event) => {
    event.preventDefault();
    if (
      registerName.replace(/[^\w\s]/gi, "") === "" ||
      registerEmail.replace(/[^\w\s]/gi, "") === ""
    ) {
      toast.error("Invalid Name or Email");
      return;
    }
    if (registerPassword.length < 8) {
      toast.error("password should be 8 characters long");
      return;
    }
    const userData = {
      name: registerName,
      email: registerEmail,
      password: registerPassword,
      avatar: avatar,
    };
    dispatch(registerUser(userData));
  };

  const [searchParams] = useSearchParams();
  let redirect = "/";
  if (searchParams.get("redirect")) {
    redirect = redirect + searchParams.get("redirect");
  }
  useEffect(() => {
    if (isAuthenticated) {
      navigate(redirect, {
        replace: true,
      });
    }
  }, [isAuthenticated, navigate, redirect]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <div className="loginSignup-container">
          <div className="loginSignup-box">
            <div>
              <div className="loginSignup-toggle">
                <p onClick={(event) => switchTabHandler(event, "login")}>
                  Login
                </p>
                <p onClick={(event) => switchTabHandler(event, "register")}>
                  Register
                </p>
              </div>
              <button ref={switcherTab}></button>
            </div>
            <form
              className="login-form"
              ref={loginTab}
              onSubmit={loginSubmitHandler}
            >
              <div className="login-email">
                <EmailOutlinedIcon />
                <input
                  type="email"
                  placeholder="Email"
                  required
                  value={loginEmail}
                  onChange={(event) => {
                    setLoginEmail(event.target.value);
                  }}
                />
              </div>
              <div className="login-password">
                <LockOpenOutlinedIcon />
                <input
                  type="password"
                  placeholder="Password"
                  required
                  value={loginPassword}
                  onChange={(event) => setLoginPassword(event.target.value)}
                />
              </div>
              <Link to="/password/forgot">Forgot Password ?</Link>
              <button type="submit">Login</button>
            </form>
            <form
              className="signup-form initial"
              ref={registerTab}
              onSubmit={signUpSubmitHandler}
              encType="multipart/form-data"
            >
              <div className="register-name">
                <FaceIcon />
                <input
                  type="name"
                  placeholder="Name"
                  required
                  value={registerName}
                  onChange={(event) => {
                    setRegisterName(event.target.value);
                  }}
                />
              </div>
              <div className="register-email">
                <EmailOutlinedIcon />
                <input
                  type="email"
                  placeholder="Email"
                  required
                  value={registerEmail}
                  onChange={(event) => {
                    setRegisterEmail(event.target.value);
                  }}
                />
              </div>
              <div className="register-password">
                <LockOpenOutlinedIcon />
                <input
                  type="password"
                  placeholder="Password"
                  required
                  value={registerPassword}
                  onChange={(event) => setRegisterPassword(event.target.value)}
                />
              </div>
              <div id="register-image">
                <img src={avatarPreview} alt="avatar preview" />
                <input
                  type="file"
                  name="avatar"
                  accept="image/*"
                  onChange={(event) => {
                    const reader = new FileReader();
                    reader.onload = () => {
                      if (reader.readyState === 2) {
                        setAvatarPreview(reader.result);
                        setAvatar(reader.result);
                      }
                    };
                    reader.readAsDataURL(event.target.files[0]);
                  }}
                />
              </div>
              <button type="submit">Sign Up</button>
            </form>
          </div>
        </div>
      )}
    </Fragment>
  );
};
export default LoginSignUp;
