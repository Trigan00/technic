import { Paper } from "@mui/material";
import React from "react";
import styles from "./AdminNav.module.scss";

interface AdminNavProps {
  setPage: React.Dispatch<React.SetStateAction<string>>;
  pages: any;
}

const AdminNav: React.FC<AdminNavProps> = ({ setPage, pages }) => {
  const arr: any = Object.values(pages);

  return (
    <Paper elevation={3} className={styles.AdminNav}>
      {arr.map(
        ({ name, componentName }: { name: string; componentName: string }) => (
          <div key={componentName} onClick={() => setPage(componentName)}>
            {name}
          </div>
        )
      )}
    </Paper>
  );
};

export default AdminNav;
