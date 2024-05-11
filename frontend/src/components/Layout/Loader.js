import React from "react";
import { css } from "@emotion/react";
import { ClipLoader } from "react-spinners";

function Loader() {
  const override = css`
    display: block;
    margin: 0 auto;
    border-color: red;
  `;

  return (
    <div
      className="sweet-loading"
      style={{
        width: "100vw",
        height: "100vh",
        display: "flex",

        justifyContent: "center",

        alignItems: "center",
      }}
    >
      <ClipLoader color={"#123abc"} loading={true} css={override} size={150} />
    </div>
  );
}

export default Loader;
