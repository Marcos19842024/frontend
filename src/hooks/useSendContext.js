import { createContext, useState, useContext } from "react";

export const sendingContext = createContext();
export const SendingContextProvider = sendingContext.Provider;
export const useSendingContext = () => useContext(sendingContext);

export const SendingProvider = ({ children }) => {
  const [center, setCenter] = useState("");
  const [start, setStart] = useState(true);
  const [viewpdf, setView] = useState(false);
  const [url, setUrl] = useState("");
  const [sending, setSending] = useState([]);
  const [notsending, setNotSending] = useState([]);
  const Center = (vet) => setCenter(vet);
  const Start = (answer) => setStart(answer);
  const ViewPdf = (view) => setView(view);
  const Url = (ip) => setUrl(ip);
  const addNewSend = (send) => setSending((prevState) => [...prevState, send]);
  const addNewNotSend = (send) => setNotSending((prevState) => [...prevState, send]);

  return (
    <SendingContextProvider value={{center,start,url,viewpdf,sending,notsending,Center,Start,Url,ViewPdf,addNewSend,addNewNotSend}}>{children}</SendingContextProvider>
  );
};