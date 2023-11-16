import React from "react";

const Loading = () => {
  const animation = {
    animation: "rotation 2s linear infinite",
    border: "6px solid #f3f3f3",
    borderTop: "6px solid #e6b400",
    borderRadius: "50%",
    width: "50px",
    height: "50px",
  };

  const loadingWrapperStyle = {
    position: "fixed",
    top: "0",
    right: "0",
    left: "0",
    bottom: "0",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    opacity: "0.5",
    zIndex: "10000",
    background: "grey",
  };

  return (
    <div style={loadingWrapperStyle}>
      <style>
        {`
        @keyframes rotation {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}
      </style>
      <div style={animation}></div>
    </div>
  );
};

export default Loading;
