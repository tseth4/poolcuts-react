import React from "react";
import {
  useParams
} from "react-router-dom";

interface ParamTypes {
  sent: string;
}

export default function ConfirmationSent() {
  let { sent } = useParams<ParamTypes>();

  return (
    <div style={{ padding: "200px", color: "white" }}>
      Please check your email to confirm registration.
      <p>Email: {sent}</p>
    </div>
  );
}
