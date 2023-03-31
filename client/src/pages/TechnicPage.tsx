import { Box, Button, Tab, Tabs, useTheme } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Calendar from "../components/calendar/Calendar";
// import Calendar from "../components/calendar/Calendar";
import Sanitize from "../helpers/Sanitize";
import { useTypedSelector } from "../store/hooks/useTypedSelector";
import { TechnicState } from "../store/slices/technicSlice";
import Loader from "../UI/Loader";
import styles from "./TechnicPage.module.scss";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <div>{children}</div>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const TechnicPage: React.FC = () => {
  const { id } = useParams();
  const { technicList, status } = useTypedSelector((state) => state.technic);
  const theme = useTheme();
  const [technicInfo, setTechnicInfo] = useState<TechnicState>();
  const [value, setValue] = useState(0);
  const [isCalendar, setIsCalendar] = useState(false);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  useEffect(() => {
    const index = technicList.findIndex((el) => el.id.toString() === id);
    setTechnicInfo(technicList[index]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status]);

  if (!technicInfo) return <Loader />;

  return (
    <div>
      <div className={styles.OrderWrapper}>
        <div className={styles.shortDescriptionContainer}>
          <div className={styles.Image}>
            <img
              src={`${process.env.REACT_APP_SERVERURL}/${technicInfo.imgFileDescription}`}
              alt="TechnicImage"
            />
          </div>
          <div className={styles.shortDescription}>
            <h1>Аренда {technicInfo.name}</h1>
            <Sanitize html={technicInfo.shortDescription} />
            <div className={styles.Order}>
              <div
                style={{
                  // display: "flex",
                  // alignItems: "center",
                  marginTop: "10px",
                }}
              >
                <span
                  className={styles.Price}
                  style={{ color: theme.palette.primary.main }}
                >
                  {technicInfo.price}
                </span>
                <span>руб/смена</span>
              </div>
              <Button
                variant="contained"
                size="large"
                sx={{ mt: 3 }}
                onClick={() => setIsCalendar(true)}
              >
                Заказать
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.MainContentWrapper}>
        <Box sx={{ width: "100%" }}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="basic tabs example"
            >
              <Tab label="ОБЩЕЕ ОПИСАНИЕ" {...a11yProps(0)} />
              <Tab label="ХАРАКТЕРИСТИКИ" {...a11yProps(1)} />
            </Tabs>
          </Box>
          <TabPanel value={value} index={0}>
            <Sanitize html={technicInfo.fullDescription} />
          </TabPanel>
          <TabPanel value={value} index={1}>
            <Sanitize html={technicInfo.characteristic} />
          </TabPanel>
        </Box>
        <div className={styles.RightContent}>
          <img src="/dostavka.svg" alt="delivery" />
          <h3>Доставка тралом</h3>
          <div>
            <span> В пределах Казани</span>
            <span style={{ textAlign: "right" }}> 11 000 руб.</span>
          </div>
        </div>
      </div>
      <Calendar isModal={isCalendar} setIsModal={setIsCalendar} />
    </div>
  );
};

export default TechnicPage;
