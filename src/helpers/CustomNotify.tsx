import React from "react";

export default function CustomNotify({
  alertMessage,
  alertClass,
}: {
  alertMessage: string;
  alertClass: string;
}) {
  return (
    <>{alertMessage && <div className={`alert ${alertClass}`}>{alertMessage}</div>}</>
  );
}
