import { Paper, useTheme } from "@mui/material";
import React from "react";
import styles from "./AdminNav.module.scss";

interface AdminNavProps {
  currnetPage: string;
  setPage: React.Dispatch<React.SetStateAction<string>>;
  pages: any;
}

const AdminNav: React.FC<AdminNavProps> = ({ setPage, pages, currnetPage }) => {
  const theme = useTheme();
  const arr: any = Object.values(pages);

  return (
    <Paper elevation={3} className={styles.AdminNav}>
      {arr.map(
        (
          { name, componentName }: { name: string; componentName: string },
          i: number
        ) => (
          <div key={componentName}>
            <div
              style={{
                transition: "0.3s",
                color:
                  componentName === currnetPage
                    ? theme.palette.primary.main
                    : "",
              }}
              onClick={() => setPage(componentName)}
            >
              {name}
            </div>
            <div
              style={{
                transition: "0.3s",
                borderBottom:
                  componentName === currnetPage
                    ? `1px solid ${theme.palette.primary.main}`
                    : "1px solid gray",
              }}
            />
          </div>
        )
      )}
    </Paper>
  );
};

export default AdminNav;
