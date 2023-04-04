import axios from "axios";
import { useState } from "react";
import { useTypedDispatch } from "../store/hooks/useTypedDispatch";
import { setAlert } from "../store/slices/alertSlice";
import { fetchTechnic } from "../store/slices/technicSlice";
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
      dispatch(fetchTechnic());
      setIsLoading(false);
    } catch (error: any) {
      CatchFunction(error);
    }
  };

  type updateTechnicProps = {
    name?: string;
    fullDescription?: string;
    shortDescription?: string;
    characteristic?: string;
    price?: string;
    files?: File[];
  };

  interface IStringIndex extends Record<string, any> {}
  type MyObject = IStringIndex & updateTechnicProps;

  const updateTechnic = async (id: number, dataToUpdate: MyObject) => {
    const data = new FormData();
    for (const key in dataToUpdate) {
      data.append(key, dataToUpdate[key]);
    }

    try {
      setIsLoading(true);
      const res = await axios.put(
        `${process.env.REACT_APP_SERVERURL}/api/admin/updateTechnic/${id}`,
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
      dispatch(fetchTechnic());
      setIsLoading(false);
    } catch (error: any) {
      CatchFunction(error);
    }
  };
  const deleteTechnic = async (id: number) => {
    try {
      setIsLoading(true);
      const res = await axios.delete(
        `${process.env.REACT_APP_SERVERURL}/api/admin/deleteTechnic/${id}`,
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
      dispatch(fetchTechnic());
      setIsLoading(false);
    } catch (error: any) {
      CatchFunction(error);
    }
  };

  const getOrders = async () => {
    try {
      setIsLoading(true);
      const res = await axios.get(
        `${process.env.REACT_APP_SERVERURL}/api/admin/getOrders`,
        {
          headers: {
            authorization: "Bearer " + token,
          },
        }
      );
      setIsLoading(false);
      return res.data.orders;
    } catch (error: any) {
      CatchFunction(error);
    }
  };

  const deleteOrder = async (id: number) => {
    try {
      setIsLoading(true);
      const res = await axios.delete(
        `${process.env.REACT_APP_SERVERURL}/api/admin/deleteOrder/${id}`,
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

  const updateStatus = async (id: number, status: string) => {
    try {
      setIsLoading(true);
      const res = await axios.put(
        `${process.env.REACT_APP_SERVERURL}/api/admin/updateStatus/${id}`,
        { status },
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
      dispatch(fetchTechnic());
      setIsLoading(false);
    } catch (error: any) {
      CatchFunction(error);
    }
  };

  return {
    isLoading,
    addTechnic,
    deleteTechnic,
    updateTechnic,
    getOrders,
    deleteOrder,
    updateStatus,
  };
};

export default useAdmin;
