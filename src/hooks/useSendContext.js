import { createContext, useState, useContext } from "react";

export const sendingContext = createContext();
export const SendingContextProvider = sendingContext.Provider;
export const useSendingContext = () => useContext(sendingContext);

export const SendingProvider = ({ children }) => {
  const [viewpdf, setView] = useState(false);
  const [url, setUrl] = useState("http://52.14.97.220/");
  const [sending, setSending] = useState([]);
  const [notsending, setNotSending] = useState([]);
  const ViewPdf = (view) => setView(view);
  const Url = (ip) => setUrl(ip);
  const addNewSend = (send) => setSending((prevState) => [...prevState, send]);
  const addNewNotSend = (send) => setNotSending((prevState) => [...prevState, send]);

  return (
    <SendingContextProvider value={{url,viewpdf,sending,notsending,Url,ViewPdf,addNewSend,addNewNotSend}}>{children}</SendingContextProvider>
  );
};