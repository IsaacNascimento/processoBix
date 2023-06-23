import React, { useEffect, useState } from "react";

export const BadgerComponent = ({ status }) => {
  const [badge, setBadge] = useState("");

  useEffect(() => {
    switch (status) {
      case "Confirmado":
        setBadge("success");
        break;
      case "Cancelado":
        setBadge("danger");
        break;
      case "Esperando":
        setBadge("warning");
        break;
      default:
        break;
    }
  }, [status]);

  return (
    <>
      <span className={`badge bg-${badge}`}>{status}</span>
    </>
  );
};
