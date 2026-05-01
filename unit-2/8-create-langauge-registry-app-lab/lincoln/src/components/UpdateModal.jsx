import { useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useRef } from "react";

const OverLay = (props) => {
  const nameRef = useRef();
  const queryClient = useQueryClient();
  const url = "http://localhost:5001";
  const updateUser = () => {
    const res = await;
  };
};

const UpdateModal = () => {
  return <div></div>;
};

export default UpdateModal;
