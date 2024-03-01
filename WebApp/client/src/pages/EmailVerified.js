// /* eslint-disable react-hooks/exhaustive-deps */
import { React, useEffect } from "react";
import { useState } from "react";
import {
  Box,
  Container,
  Stack,
  Typography,
  ThemeProvider,
  Button,
} from "@mui/material";

import { Link, useSearchParams } from "react-router-dom";

// // import theme from "../../HomlyTheme";
// import "./UserStyle.css";

// import errEmailImg from '../../Assets/images/error-email.jpg'
// import verifiedEmailImg from '../../Assets/images/verified-email.jpg'

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
    <Box
      // className="main_container"
      sx={{
        width: "100%",
        overflow: "hidden",
      }}
    >
      <Typography
        variant="h6"
        sx={{
          textAlign: "center",
          color: "text.primary",
          fontWeight: "bold",
          fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
          lineHeight: 1.5,
          letterSpacing: "0.00938em",
          position: "relative", // Add this line
          top: "40px",
        }}
      >
        {details.message}
      </Typography>{" "}
      <Container maxWidth="xl" sx={{ padding: 0 }}>
        <Container
          maxWidth="lg"
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "90vh",
          }}
        >
          <Stack
            direction="column"
            sx={{ justifyContent: "center", alignItems: "center" }}
          >
            <Box
              component="img"
              src={
                details.verified === "true"
                  ? "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRMO33rtb-JUsiG0xMiYX9viv4TpfWUrKrkVQ&usqp=CAU"
                  : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ6RRwce-lkHMNvSoRlucALLFE-8zY_z_e7bQ&usqp=CAU"
              }
              sx={{
                filter: "drop-shadow(5px 13px 10px  rgba(0,0,0,0.62))",
                width: "300px",
                height: "350px",
                position: "relative", // Add this line
                top: "-70px",
              }}
            />

            <Button
              style={{ position: "absolue", marginTop: "-20px" }}
              variant="outlined"
              component={Link}
              to={details.verified === "true" ? "/" : "/Registration"}
            >
              {details.verified === "true" ? "Login Now" : "Register Again"}
            </Button>
          </Stack>
        </Container>
      </Container>
    </Box>
  );
};

export default EmailVerified;
