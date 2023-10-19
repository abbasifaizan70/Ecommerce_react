import React, { useEffect } from "react";
import { TransactionList } from "../../Components";
import { useDispatch } from "react-redux";
import { fetchTransactions } from "../../Redux/userSlice";
import { getItems } from "../../Redux/appSlice";

const Transaction = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getItems());
    dispatch(fetchTransactions());
  }, [dispatch]);

  return (
    <>
      <TransactionList />
    </>
  );
};

export default Transaction;
