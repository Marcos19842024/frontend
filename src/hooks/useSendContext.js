import { createContext, useState, useContext } from "react";

export const sendingContext = createContext();
export const SendingContextProvider = sendingContext.Provider;
export const useSendingContext = () => useContext(sendingContext);

export const SendingProvider = ({ children }) => {
  const [sending, setSending] = useState([]);
  const [notsending, setNotSending] = useState([]);
  const addNewSend = (send) => setSending((prevState) => [...prevState, send]);
  const addNewNotSend = (send) => setNotSending((prevState) => [...prevState, send]);

  return (
    <SendingContextProvider value={{sending,notsending,addNewSend,addNewNotSend}}>{children}</SendingContextProvider>
  );
};
