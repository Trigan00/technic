import React from "react";
import styles from "./Footer.module.scss";
import { Container } from "@mui/material";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import EmailIcon from "@mui/icons-material/Email";
import PlaceIcon from "@mui/icons-material/Place";

const Footer: React.FC = () => {
  return (
    <div className={styles.Wrapper}>
      <Container className={styles.Content}>
        <div>
          <WhatsAppIcon fontSize="medium" className={styles.Icon} />
          +7 (960) 031-94-17
        </div>
        <div>
          <EmailIcon fontSize="medium" className={styles.Icon} />
          rinaz@mail.ru
        </div>
        <div>
          <PlaceIcon fontSize="medium" className={styles.Icon} />
          Казань, Большая красная, 55
        </div>
      </Container>
    </div>
  );
};

export default Footer;
