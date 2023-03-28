import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useTypedSelector } from "../store/hooks/useTypedSelector";
import { TechnicState } from "../store/slices/technicSlice";
import Loader from "../UI/Loader";
import styles from "./TechnicPage.module.scss";

const TechnicPage: React.FC = () => {
  const { id } = useParams();
  const { technicList, status } = useTypedSelector((state) => state.technic);
  const [technicInfo, setTechnicInfo] = useState<TechnicState>();

  useEffect(() => {
    const index = technicList.findIndex((el) => el.id.toString() === id);
    setTechnicInfo(technicList[index]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status]);

  if (!technicInfo) return <Loader />;

  return (
    <div>
      <div className={styles.OrderWrapper}>
        <div className={styles.Image}>
          <img
            src={`${process.env.REACT_APP_SERVERURL}/${technicInfo.imgFileDescription}`}
            alt="TechnicImage"
          />
        </div>
      </div>
    </div>
  );
};

export default TechnicPage;
