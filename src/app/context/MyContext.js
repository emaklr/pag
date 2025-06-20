import React, { createContext, useState } from "react";

export const MyContext = createContext(null);

export const MyProvider = ({ children }) => {
  const [isButtonClicked, setIsButtonClicked] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isReserveClicked, setIsReserveClicked] = useState(false);

  const handleButtonClick = () => setIsButtonClicked(true);
  const handleCancel = () => setIsButtonClicked(false);
  const handleReserve = () => {
    setIsReserveClicked(true);
    setIsButtonClicked(false);
  };

  const handleLoading = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 1000);
  };

  return (
    <MyContext.Provider
      value={{
        isButtonClicked,
        handleButtonClick,
        handleCancel,
        handleReserve,
        loading,
        handleLoading,
        isReserveClicked,
      }}
    >
      {children}
    </MyContext.Provider>
  );
};
