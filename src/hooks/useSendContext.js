import { createContext, useState, useContext } from "react";

export const sendingContext = createContext();
export const SendingContextProvider = sendingContext.Provider;
export const useSendingContext = () => useContext(sendingContext);

export const SendingProvider = ({ children }) => {
  const [center, setCenter] = useState("");
  const [cel, setCel] = useState("");
  const [start, setStart] = useState(true);
  const [viewpdf, setView] = useState(false);
  const [sending, setSending] = useState([]);
  const [notsending, setNotSending] = useState([]);
  const Center = (vet) => setCenter(vet);
  const Cel = (cel) => setCel(cel);
  const Start = (answer) => setStart(answer);
  const ViewPdf = (view) => setView(view);
  const addNewSend = (send) => setSending((prevState) => [...prevState, send]);
  const addNewNotSend = (send) => setNotSending((prevState) => [...prevState, send]);
  const url = "http://recordatorios.veterinariabaalak.com/";

  return (
    <SendingContextProvider value={{center,cel,start,url,viewpdf,sending,notsending,Center,Cel,Start,ViewPdf,addNewSend,addNewNotSend}}>{children}</SendingContextProvider>
  );
};