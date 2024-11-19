import "../styles/App.css";
import arrow from "../assets/arrow.svg";
import React, { useState } from "react";
import { useModal } from "../hooks/useModal";
import { useSendingContext } from "../hooks/useSendContext";
import Message from "../components/Message";
import Loader from "../components/Loader";
import Formulario1 from "./Formulario1";
import Formulario2 from "./Formulario2";
import QrCreate from "./QrCreate";
import Modal from "../components/Modal";
import ResultsTable from "./ResultsTable";

function App() {
  const [isOpenForm, openModalForm, closeModalForm] = useModal(false);
  const {viewpdf, ViewPdf} = useSendingContext();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [checkbox, setCheckbox] = useState(false);
  const [createqr, setCreateQr] = useState(true);
  const [ml, setMl] = useState(false);
  const [ia, setIa] = useState(false);
  const [smo, setSmo] = useState(false);
  const [imo, setImo] = useState(false);
  const [msjo, setMsjo] = useState("");
  const URL = process.env.REACT_APP_URL;
  let status = URL + "status";

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
  },[status]);

  React.useEffect(() => {
    if (smo || imo) {
      setCheckbox(true);
    }
    else {
      setCheckbox(false);
    }
  },[imo, smo, viewpdf]);

  return (
    <>
      <div className="lista1">
        <nav className="menu">
          <section 
            id="menucontainer"
            className="menu__container">
            <ul className="menu__links">
              <li className="menu__item">
                <label
                  className="menu__link"
                  onClick={() => {
                    setCreateQr(!createqr);
                  }}>
                  <span
                    className={createqr ? "fa fa-whatsapp fa-2x" : "fa fa-qrcode fa-2x"}
                    id="logo"
                    aria-hidden="true"
                    style={createqr ? {color: "#30E400", margin: "10px"} : {color: "#f54193", margin: "10px"}}
                  />
                  <h2 id="titulo"> {createqr ? "Envío de recordatorios." : "Crear Qr."}</h2>
                </label>
              </li>
            </ul>
            {createqr && (
              <ul className="menu__links">
                <li className="menu__item">
                  <label
                    className="menu__link"
                    onClick={() => {
                      ViewPdf(!viewpdf);
                    }}>
                    <span
                      className={viewpdf ? "fa fa-table" : "fa fa-download"}
                      id="download"
                      aria-hidden="true"
                    />
                  </label>
                </li>
                <li className="menu__item">
                  <label
                    className="menu__link"
                    id="Inicio"
                    onClick={openModalForm}>Iniciar envíos
                  </label>
                  <Modal
                    isOpen={isOpenForm}
                    closeModal={closeModalForm}>
                    {ml ?
                      <Formulario2
                        ia={ia}
                      /> :
                      <Formulario1
                        smo={smo}
                        imo={imo}
                        ia={ia}
                        msjo={msjo}
                      />
                    }
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
                        htmlFor="Ml">
                        <input
                          className="cb1"
                          id="Ml"
                          type="checkbox"
                          name="Ml"
                          onChange={(e) => {
                            setMl(e.target.checked)
                          }}
                        />Mensaje libre
                      </label>
                      <label
                        className="s2"
                        htmlFor="Ia">
                        <input
                          className="cb2"
                          id="Ia"
                          type="checkbox"
                          name="Ia"
                          onChange={(e) => {
                            setIa(e.target.checked)
                          }}
                        />Incluir adjuntos
                      </label>
                      <label
                        className="s3"
                        htmlFor="Smo">
                        <input
                          className="cb3"
                          id="Smo"
                          type="checkbox"
                          name="Smo"
                          onChange={(e) => {
                            setSmo(e.target.checked)
                            document.getElementById("Imo").checked=false
                            setImo(false)
                          }}
                        />Solo mensaje opcional
                      </label>
                      <label
                        className="s4"
                        htmlFor="Imo">
                        <input
                          className="cb4"
                          id="Imo"
                          type="checkbox"
                          name="Imo"
                          onChange={(e) => {
                            setImo(e.target.checked)
                            document.getElementById("Smo").checked=false
                            setSmo(false)
                          }}
                        />Incluir mensaje opcional
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
                    id="login">Check connection...
                  </label>
                </li>
              </ul>
            )}
          </section>
        </nav>
        {createqr ? <ResultsTable /> : <QrCreate />}
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
    </>
  );
}

export default App;