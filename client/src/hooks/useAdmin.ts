import axios from "axios";
import { useState } from "react";
import { useTypedDispatch } from "../store/hooks/useTypedDispatch";
import { setAlert } from "../store/slices/alertSlice";
import { useAuth } from "./useAuth";

const useAdmin = () => {
  const { token } = useAuth();
  const dispatch = useTypedDispatch();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const CatchFunction = (error: any) => {
    setIsLoading(false);
    console.log(error);
    dispatch(
      setAlert({
        severity: "error",
        message: error.response.data.message,
      })
    );
  };

  const addTechnic = async (
    imgFile: File,
    imgFileDescription: File,
    name: string,
    fullDescription: string,
    shortDescription: string,
    characteristic: string,
    price: string
  ) => {
    const data = new FormData();
    data.append("name", name);
    data.append("fullDescription", fullDescription);
    data.append("shortDescription", shortDescription);
    data.append("characteristic", characteristic);
    data.append("price", price);
    data.append("files", imgFile);
    data.append("files", imgFileDescription);
    try {
      setIsLoading(true);
      const res = await axios.post(
        `${process.env.REACT_APP_SERVERURL}/api/admin/addTechnic`,
        data,
        {
          headers: {
            authorization: "Bearer " + token,
          },
        }
      );
      dispatch(
        setAlert({
          severity: "success",
          message: res.data.message,
        })
      );
      setIsLoading(false);
    } catch (error: any) {
      CatchFunction(error);
    }
  };

  return {
    isLoading,
    addTechnic,
  };
};

export default useAdmin;
