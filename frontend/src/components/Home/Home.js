import AppLayout from "../Layout/AppLayout";
import { Box, Typography } from "@mui/material";
import logo from "../../images/logo.png";
const Home = () => {
  return (
    <div>
      <AppLayout>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
          }}
        >
          <img alt="" src={logo} style={{ width: "20rem" }} />
          <Typography variant="caption" fontSize={"2rem"}>
            Welcome to Digitalflake admin
          </Typography>
        </Box>
      </AppLayout>
    </div>
  );
};

export default Home;
