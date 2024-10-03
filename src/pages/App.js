import "../styles/App.css";
import arrow from "../assets/arrow.svg";
import React, { useState } from "react";
import { useModal } from "../hooks/useModal";
import { SendingProvider } from "../hooks/useSendContext";
import Message from "../components/Message";
import Loader from "../components/Loader";
import Formulario from "./Formulario";
import Modal from "../components/Modal";
import ResultsTable from "./ResultsTable";

function App() {
  const [isOpenForm, openModalForm, closeModalForm] = useModal(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [checkbox, setCheckbox] = useState(false);
  const [smo, setSmo] = useState(false);
  const [imo, setImo] = useState(false);
  const [ia, setIa] = useState(false);
  const [msjo, setMsjo] = useState("");
  let qr = "http://localhost/terminal/";
  let status = "http://localhost:3001/status";
  
  React.useEffect(() => {
    async function fetchData() {
      setLoading(true);
      const label = document.getElementById("login");
      await fetch(status, {
        method: 'GET'
      }).then(res => res.json()).then((res) => {
        if(!res.err) {
          label.innerHTML = res.statusText;
        } else {
          label.innerHTML = "Desconectado";
          setError(`Error ${res.status}: ${res.statusText}`);
        }
      }).catch((err) => {
        label.innerHTML = "Desconectado";
        setError(`Error ${err}`);
      });
      setTimeout(() => setError(null),5000);
      setLoading(false);
    }
    fetchData();
  },[qr, status]);

  React.useEffect(() => {
    if (smo || imo) {
      setCheckbox(true);
    }
    else {
      setCheckbox(false);
    }
  },[imo, smo]);
  
  return (
    <>
      <SendingProvider>
        <div className="lista1">
          <nav className="menu">
            <section 
              id="menucontainer"
              className="menu__container">
              <h2 className="menu__logo">Envío de recordatorios.</h2>
              <ul className="menu__links">
                <li className="menu__item">
                  <label
                    className="menu__link"
                    id="Inicio"
                    onClick={openModalForm}>Iniciar envíos
                  </label>
                  <Modal
                    isOpen={isOpenForm}
                    closeModal={closeModalForm}>
                    <Formulario
                      smo={smo}
                      imo={imo}
                      ia={ia}
                      msjo={msjo}
                    />
                  </Modal>
                </li>
                <li
                  className="menu__item menu__item--show"
                  id="Configuracion">
                  <label
                    className="menu__link">Configuracion
                    <img
                      src={arrow}
                      className="menu__arrow"
                      alt="arrow"
                    />
                  </label>
                  <ul className="menu__nesting">
                    <div className="configuracion">
                      <label
                        className="s1"
                        htmlFor="Smo">
                        <input
                          className="cb1"
                          id="Smo"
                          type="checkbox"
                          name="Smo"
                          onChange={(e) => {
                            setSmo(e.target.checked)
                            document.getElementById("Imo").checked=false
                            setImo(false)
                          }}
                        />Solo msj. opcional
                      </label>
                      <label
                        className="s2"
                        htmlFor="Imo">
                        <input
                          className="cb2"
                          id="Imo"
                          type="checkbox"
                          name="Imo"
                          onChange={(e) => {
                            setImo(e.target.checked)
                            document.getElementById("Smo").checked=false
                            setSmo(false)
                          }}
                        />Incluir msj. opcional
                      </label>
                      <label
                        className="s3"
                        htmlFor="Ia">
                        <input
                          className="cb3"
                          id="Ia"
                          type="checkbox"
                          name="Ia"
                          onChange={(e) => {
                            setIa(e.target.checked)
                          }}
                        />Incluir adjuntos
                        </label>
                      {checkbox && (
                        <textarea
                          className="txt"
                          name="Mo"
                          id="Mo"
                          value={msjo}
                          onChange={(e) => {
                            setMsjo(e.target.value)
                          }}
                          autoComplete="on"
                          autoCorrect="on"
                        />
                      )}
                    </div>
                  </ul>
                </li>
                <li className="menu__item">
                  <label
                    className="menu__link"
                    id="login"
                    onClick={(e) => {
                      window.open(qr,'_blank','width=1000,height=1000')
                    }}>Check connection...
                  </label>
                </li>
              </ul>
            </section>
          </nav>
          <ResultsTable />
          <div className="loader1">
            {loading && <Loader />}
          </div>
          <div className="error1">
            {error &&
              <Message
                msg={error}
                bgColor="#dc3545"
              />
            }
          </div>
        </div>
      </SendingProvider>
    </>
  );
}

export default App;