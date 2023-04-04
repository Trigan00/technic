import axios from "axios";
import { useState } from "react";
import { setAlert } from "../store/slices/alertSlice";
import { useTypedDispatch } from "../store/hooks/useTypedDispatch";
import { useAuth } from "./useAuth";

export type OrderType = {
  id: number;
  userid: number;
  technicid: number;
  dates: string;
  status: string;
};

const useQuery = () => {
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

  // const createOrder = async (technicId: number, datesList: string[]) => {
  //   try {
  //     setIsLoading(true);
  //     const res = await axios.post(
  //       `${process.env.REACT_APP_SERVERURL}/api/user/order`,
  //       {
  //         technicId: technicId,
  //         dates: datesList,
  //       },
  //       { headers: { authorization: "Bearer " + token } }
  //     );
  //     dispatch(
  //       setAlert({
  //         severity: "success",
  //         message: res.data.message,
  //       })
  //     );
  //     setIsLoading(false);
  //   } catch (error: any) {
  //     CatchFunction(error);
  //   }
  // };
  const getBusyDays = async (technicId: number) => {
    try {
      setIsLoading(true);
      const res = await axios.get(
        `${process.env.REACT_APP_SERVERURL}/api/user/busyDays/${technicId}`,

        { headers: { authorization: "Bearer " + token } }
      );
      setIsLoading(false);
      return res.data.busyDaysArr;
    } catch (error: any) {
      CatchFunction(error);
    }
  };

  // const getOrders = async (type: "current" | "all"): Promise<OrderType[]> => {
  //   try {
  //     setIsLoading(true);
  //     const res = await axios.get(
  //       `${process.env.REACT_APP_SERVERURL}/api/user/myOrders/${type}`,

  //       { headers: { authorization: "Bearer " + token } }
  //     );
  //     setIsLoading(false);
  //     return res.data.orders;
  //   } catch (error: any) {
  //     CatchFunction(error);
  //     throw error;
  //   }
  // };

  // const deleteOrder = async (id: number) => {
  //   try {
  //     setIsLoading(true);
  //     const res = await axios.delete(
  //       `${process.env.REACT_APP_SERVERURL}/api/user/deleteOrder/${id}`,
  //       { headers: { authorization: "Bearer " + token } }
  //     );
  //     setIsLoading(false);
  //     dispatch(
  //       setAlert({
  //         severity: "success",
  //         message: res.data.message,
  //       })
  //     );
  //   } catch (error: any) {
  //     CatchFunction(error);
  //     throw error;
  //   }
  // };

  return {
    isLoading,
    // createOrder,
    getBusyDays,
    // getOrders,
    // deleteOrder,
  };
};

export default useQuery;
