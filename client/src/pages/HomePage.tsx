import React from "react";
import TechnicList from "../components/TechnicList";
import styles from "./HomePage.module.scss";
import { Paper } from "@mui/material";

const advantages = [
  {
    image: "homePage/24h.png",
    desc: "Работаем без выходных и гарантируем сроки поставки",
  },
  {
    image: "homePage/fast.png",
    desc: "Доставим заказанную технику на объект в согласованные сроки",
  },
  {
    image: "homePage/driver.png",
    desc: "Техника с опытными машинистами и водителями",
  },
  {
    image: "homePage/fuel.png",
    desc: "Заправка - наша забота! Вы платите только за аренду",
  },
  {
    image: "homePage/state.png",
    desc: "Спецтехника сдается заправленная в исправном состоянии",
  },
  {
    image: "homePage/payment.png",
    desc: "Принимаем все виды оплаты – наличный и безналичный расчет",
  },
];

const HomePage: React.FC = () => {
  return (
    <>
      <div className={styles.ImageWrapper}>
        <img src="home.jpg" alt="Technic_Image" width="100%" height="100%" />
        <div className={styles.Content}>
          <h1>Аренда спецтехники</h1>
          <p>
            От 11 000 руб. Собственная техника, профессиональные машинисты.
            Быстрая доставка на ваш объект.
          </p>
        </div>
      </div>
      <Paper elevation={3} sx={{ p: 3, mt: 3 }} className={styles.About}>
        <h1>&#171;Rinaz Technic&#187; - аренда спецтехники</h1>
        <p>
          Наша компания располагает автопарком строительной техники самого
          разного функционального назначения, которую держит на балансе
          предприятия. Мы обладаем собственной ремонтной базой, что гарантирует
          отличное техническое состояние спецтехники.
        </p>
        <div className={styles.advantages}>
          {advantages.map((el) => (
            <div key={el.image} className={styles.advantage}>
              <img src={el.image} width="64px" height="64px" alt="advantage" />
              <div>{el.desc}</div>
            </div>
          ))}
        </div>
      </Paper>
      <TechnicList />
    </>
  );
};

export default HomePage;
