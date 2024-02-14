// /* eslint-disable react-hooks/exhaustive-deps */
import { React, useEffect } from "react";
import { useState } from "react";
// import {
//   Box,
//   Container,
//   Stack,
//   Typography,
//   ThemeProvider,
//   Button,
// } from "@mui/material";

import { Link, useSearchParams } from "react-router-dom";

// // import theme from "../../HomlyTheme";
// // import "./UserStyle.css";

// // import errEmailImg from '../../Assets/images/error-email.jpg'
// // import verifiedEmailImg from '../../Assets/images/verified-email.jpg'

const EmailVerified = () => {
  const [queryParameters] = useSearchParams();
  const [details, setDetails] = useState({
    message: "",
    verified: "",
  });

  useEffect(() => {
    setDetails({
      ...details,
      message: queryParameters.get("message"),
      verified: queryParameters.get("verified"),
    });
  }, []);

  return (
      <div>
        <div>{details.message}</div>
        <div>{details.verified}</div>
      </div>

  );
};

export default EmailVerified;
