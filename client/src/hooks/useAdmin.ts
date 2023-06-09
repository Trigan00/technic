import axios from "axios";
import { useState } from "react";
import { useTypedDispatch } from "../store/hooks/useTypedDispatch";
import { setAlert } from "../store/slices/alertSlice";
import { fetchTechnic } from "../store/slices/technicSlice";
import { useAuth } from "./useAuth";
import { fetchOrders } from "../store/slices/orderSlice";

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
    price: string,
    type: string
  ) => {
    const data = new FormData();
    data.append("name", name);
    data.append("type", type);
    data.append("fullDescription", fullDescription);
    data.append("shortDescription", shortDescription);
    data.append("characteristic", characteristic);
    data.append("price", price);
    data.append("timestamp", "" + Date.now());
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

  // type updateTechnicProps = {
  //   name?: string;
  //   fullDescription?: string;
  //   shortDescription?: string;
  //   characteristic?: string;
  //   price?: string;
  //   files?: File[];
  // };

  // interface IStringIndex extends Record<string, any> {}
  // type MyObject = IStringIndex & updateTechnicProps;

  type updateProps = {
    name: string;
    fullDescription: string;
    shortDescription: string;
    characteristic: string;
    price: string;
    type: string;
  };

  const updateTechnic = async (
    /* id: number, dataToUpdate: MyObject */ id: number,
    data: updateProps
  ) => {
    // const data = new FormData();
    // for (const key in dataToUpdate) {
    //   data.append(key, dataToUpdate[key]);
    // }

    try {
      setIsLoading(true);
      const res = await axios.put(
        `${process.env.REACT_APP_SERVERURL}/api/admin/updateTechnic/${id}`,
        { ...data, price: +data.price },
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

  const updateImage = async (imgData: {
    technicId: number;
    type: "imgname" | "imgFileDescription";
    imgFile: File;
  }) => {
    const data = new FormData();
    data.append("technicId", "" + imgData.technicId);
    data.append("type", imgData.type);
    data.append("timestamp", "" + Date.now());
    data.append("file", imgData.imgFile);
    try {
      setIsLoading(true);
      const res = await axios.put(
        `${process.env.REACT_APP_SERVERURL}/api/admin/updateImages`,
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
      dispatch(fetchOrders(token || ""));
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
    updateImage,
  };
};

export default useAdmin;
