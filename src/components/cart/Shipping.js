import { Fragment, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import HomeIcon from "@mui/icons-material/Home";
import LocationCityIcon from "@mui/icons-material/LocationCity";
import PinDropIcon from "@mui/icons-material/PinDrop";
import PhoneIcon from "@mui/icons-material/Phone";
import PublicIcon from "@mui/icons-material/Public";
import { Country, State } from "country-state-city";
import TransferWithinAStationIcon from "@mui/icons-material/TransferWithinAStation";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "./Shipping.css";
import MetaData from "../layout/MetaData";
import CheckoutSteps from "./CheckoutSteps";
import { saveShippingInfo } from "../../store/cart-actions";
import { useNavigate } from "react-router-dom";

const Shipping = () => {
  const dispatch = useDispatch();
  const { shippingInfo } = useSelector((state) => state.cart);
  const navigate = useNavigate();
  const [address, setAddress] = useState(
    !shippingInfo.address ? "" : shippingInfo.address
  );
  const [city, setCity] = useState(!shippingInfo.city ? "" : shippingInfo.city);
  const [state, setState] = useState(
    !shippingInfo.state ? "" : shippingInfo.state
  );
  const [country, setCountry] = useState(
    !shippingInfo.country ? "" : shippingInfo.country
  );
  const [pinCode, setPinCode] = useState(
    !shippingInfo.pinCode ? "" : shippingInfo.pinCode
  );
  const [phoneNo, setPhoneNo] = useState(
    !shippingInfo.phoneNo ? "" : shippingInfo.phoneNo
  );

  const submitHandler = (event) => {
    event.preventDefault();
    if (phoneNo.length < 10 || phoneNo.length > 10) {
      toast.error("phone number should be 10 digit long");
      return;
    }
    const shippingData = {
      address,
      city,
      state,
      country,
      pinCode,
      phoneNo,
    };
    dispatch(saveShippingInfo(shippingData));
    navigate("/order/confirm");
  };

  return (
    <Fragment>
      <MetaData title="shipping details" />
      <CheckoutSteps activeStep={0} />
      <div className="shipping-container">
        <div className="shipping-box">
          <h2 className="shipping-heading">Shipping Details</h2>
          <form className="shipping-form" onSubmit={submitHandler}>
            <div>
              <HomeIcon />
              <input
                type="text"
                placeholder="Address"
                required
                value={address}
                onChange={(event) => setAddress(event.target.value)}
              />
            </div>
            <div>
              <LocationCityIcon />
              <input
                type="text"
                placeholder="City"
                required
                value={city}
                onChange={(event) => setCity(event.target.value)}
              />
            </div>
            <div>
              <PinDropIcon />
              <input
                type="number"
                placeholder="Pin code"
                required
                value={pinCode}
                onChange={(event) => setPinCode(event.target.value)}
              />
            </div>
            <div>
              <PhoneIcon />
              <input
                type="number"
                placeholder="phone number"
                required
                size="10"
                value={phoneNo}
                onChange={(event) => setPhoneNo(event.target.value)}
              />
            </div>
            <div>
              <PublicIcon />
              <select
                value={country}
                required
                onChange={(event) => setCountry(event.target.value)}
              >
                <option value="">select country</option>
                {Country &&
                  Country.getAllCountries().map((c) => (
                    <option key={c.isoCode} value={c.isoCode}>
                      {c.name}
                    </option>
                  ))}
              </select>
            </div>
            {country && (
              <div>
                <TransferWithinAStationIcon />
                <select
                  value={state}
                  required
                  onChange={(event) => setState(event.target.value)}
                >
                  <option value="">select state</option>
                  {State &&
                    State.getStatesOfCountry(country).map((s) => (
                      <option key={s.isoCode} value={s.isoCode}>
                        {s.name}
                      </option>
                    ))}
                </select>
              </div>
            )}
            <button type="submit" disabled={state ? false : true}>
              Continue
            </button>
          </form>
        </div>
      </div>
    </Fragment>
  );
};
export default Shipping;
