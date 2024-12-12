import "../styles/App.css";
import "../styles/Attachment.css";
import arrow from "../assets/arrow.svg";
import React, { useState } from "react";
import { useModal } from "../hooks/useModal";
import { useSendingContext } from "../hooks/useSendContext";
import Message from "../components/Message";
import Loader from "../components/Loader";
import Formulario1 from "./Formulario1";
import Formulario2 from "./Formulario2";
import Formulario3 from "./Formulario3";
import Modal from "../components/Modal";
import ResultsTable from "./ResultsTable";

function App() {
  const [isOpenForm, openModalForm, closeModalForm] = useModal(false);
  const {url, viewpdf, Url, ViewPdf} = useSendingContext();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [libre, setLibre] = useState(true);
  const [notificacion, setNotificacion] = useState(false);
  const [recordatorios, setRecordatorios] = useState(false);
  
  React.useEffect(() => {
    async function fetchData() {
      setLoading(true);
      const label = document.getElementById("login");
      await fetch(url + "status", {
        method: 'GET'
      }).then(res => res.json()).then((res) => {
        if(!res.err) {
          label.innerHTML = res.statusText + " to Animalia";
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
  },[url]);

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
                  className="menu__link">
                  <span
                    className="fa fa-whatsapp fa-2x"
                    id="logo"
                    aria-hidden="true"
                    style={{color: "#30E400", margin: "10px"}}
                  />
                  <h2 id="titulo">Envío de mensajes.</h2>
                </label>
              </li>
            </ul>
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
                  {libre && <Formulario1/>}
                  {notificacion && <Formulario2/>}
                  {recordatorios && <Formulario3/>}
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
                    <h4>Tipo de envío</h4>
                    <hr/>
                    <label
                      className="s1"
                      htmlFor="t1">
                      <input
                        className="cb1"
                        id="t1"
                        type="checkbox"
                        name="t1"
                        defaultChecked
                        onClick={(e) => {
                          e.target.checked=true
                          setLibre(true)
                          document.getElementById("t2").checked=false
                          setNotificacion(false)
                          document.getElementById("t3").checked=false
                          setRecordatorios(false)
                        }}
                      />Libre
                    </label>
                    <label
                      className="s2"
                      htmlFor="t2">
                      <input
                        className="cb2"
                        id="t2"
                        type="checkbox"
                        name="t2"
                        onClick={(e) => {
                          e.target.checked=true
                          setNotificacion(true)
                          document.getElementById("t1").checked=false
                          setLibre(false)
                          document.getElementById("t3").checked=false
                          setRecordatorios(false)
                        }}
                      />Notificación
                    </label>
                    <label
                      className="s3"
                      htmlFor="t3">
                      <input
                        className="cb3"
                        id="t3"
                        type="checkbox"
                        name="t3"
                        onClick={(e) => {
                          e.target.checked=true
                          setRecordatorios(true)
                          document.getElementById("t1").checked=false
                          setLibre(false)
                          document.getElementById("t2").checked=false
                          setNotificacion(false)
                        }}
                      />Recordatorios
                    </label>
                  </div>
                </ul>
              </li>
              <li
                className="menu__item menu__item--show"
                id="Configuracion">
                  <label
                    className="menu__link"
                    id="login">Check connection...
                    <img
                      src={arrow}
                      className="menu__arrow"
                      alt="arrow"
                    />
                  </label>
                  <ul className="menu__nesting">
                  <div className="configuracion">
                    <h4>Ip del servidor</h4>
                    <div
                      className="showfilebox">
                      <div className="left">
                        <label
                          className="s4"
                          htmlFor="t4">
                          <input
                            className="cb4"
                            id="t4"
                            type="text"
                            name="t4"
                            placeholder="52.14.97.220"
                            style={{width: "100px"}}
                          />
                          <button
                            class="fa fa-exchange"
                            onClick={() => {
                              let input = document.getElementById("t4")
                              Url("http://" + input.value + "/")
                            }}>
                          </button>
                        </label>
                      </div>
                    </div>
                  </div>
                </ul>
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
    </>
  );
}

export default App;