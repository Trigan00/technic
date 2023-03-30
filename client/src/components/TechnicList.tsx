import React from "react";
import { useNavigate } from "react-router-dom";
import Sanitize from "../helpers/Sanitize";
import { useTypedSelector } from "../store/hooks/useTypedSelector";
import Loader from "../UI/Loader";
import { consts } from "../utils/routsConsts";
import styles from "./TechnicList.module.scss";

const TechnicList: React.FC = () => {
  const { technicList, status } = useTypedSelector((state) => state.technic);
  const navigate = useNavigate();
  if (status === "pending") return <Loader />;

  if (!technicList.length)
    return (
      <div className={styles.technicWrapper}>
        <p>Список техники пуст</p>
      </div>
    );

  return (
    <div className={styles.technicWrapper}>
      {technicList.map(({ id, name, shortDescription, imgname, price }) => (
        <div
          key={id}
          className={styles.TechnicCard}
          onClick={() => navigate(consts.TECHNIC_ROUTE + "/" + id.toString())}
        >
          <h3>{name}</h3>
          <img
            width="225px"
            height="120px"
            style={{
              display: "block",
              objectFit: "cover",
            }}
            src={`${process.env.REACT_APP_SERVERURL}/${imgname}`}
            alt="technicImage"
          />
          <div className={styles.Description}>
            {<Sanitize html={shortDescription} />}
          </div>
          <div className={styles.Price}>
            <div className={styles.line} />
            <span>Стоимость за смену 8ч.</span>
            {price} &#x20bd;
          </div>
        </div>
      ))}
    </div>
  );
};

export default TechnicList;
