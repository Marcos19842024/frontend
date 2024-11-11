import { createContext, useState, useContext } from "react";

export const sendingContext = createContext();
export const SendingContextProvider = sendingContext.Provider;
export const useSendingContext = () => useContext(sendingContext);

export const SendingProvider = ({ children }) => {
  const [viewpdf, setView] = useState(false);
  const [sending, setSending] = useState([]);
  const [notsending, setNotSending] = useState([]);
  const ViewPdf = (view) => setView(view);
  const addNewSend = (send) => setSending((prevState) => [...prevState, send]);
  const addNewNotSend = (send) => setNotSending((prevState) => [...prevState, send]);

  return (
    <SendingContextProvider value={{viewpdf,sending,notsending,ViewPdf,addNewSend,addNewNotSend}}>{children}</SendingContextProvider>
  );
};