import { useTheme } from "@mui/material";
import React from "react";
import "./Loader.scss";

interface loaderProps {
  color?: string;
}

const Loader: React.FC<loaderProps> = ({ color }) => {
  const theme = useTheme();

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <div className="lds-ellipsis" style={{ margin: "0 auto" }}>
        <div
          style={{ backgroundColor: theme.palette.primary.main || color }}
        ></div>
        <div
          style={{ backgroundColor: theme.palette.primary.main || color }}
        ></div>
        <div
          style={{ backgroundColor: theme.palette.primary.main || color }}
        ></div>
        <div
          style={{ backgroundColor: theme.palette.primary.main || color }}
        ></div>
      </div>
    </div>
  );
};

export default Loader;
