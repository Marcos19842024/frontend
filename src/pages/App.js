import "../styles/Login.css";
import "../styles/App.css";
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
  const {start, center, cel, url, viewpdf, Center, Cel, Start, ViewPdf} = useSendingContext();
  const [error0, setError0] = useState(null);
  const [loading0, setLoading0] = useState(false);
  const [libre, setLibre] = useState(true);
  const [notificacion, setNotificacion] = useState(false);
  const [recordatorios, setRecordatorios] = useState(false);
  const [status, setStatus] = useState("Check connection...");

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading0(true);
    await fetch(`${url}status/${center}/${cel}`, {
      method: 'GET'
    }).then(res => res.json()).then((res) => {
      if(res.err) {
        setError0(`Error ${res.status}: ${res.statusText}`);
      } else {
        Start(false);
        setStatus(res.statusText);
      }
    }).catch((err) => {
      setError0(`Error ${err}`);
    });
    setTimeout(() => setError0(null),5000);
    setLoading0(false);
  };

  return (
    <>
      {start ? (
        <article className="style1">
          <div className='wrappers'>
            <form onSubmit={handleSubmit}>
              <h1>Login</h1>
              <div className='input-box'>
                <input
                  type='text'
                  placeholder='Clínica Veterinaria'
                  onChange={(e) => {Center(e.target.value)}}
                  required
                />
              </div>
              <div className='input-box'>
                <input
                  type='text'
                  placeholder='Teléfono'
                  onChange={(e) => {Cel(e.target.value)}}
                  required
                />
              </div>
              <button type='submit'>Login</button>
              <p><a href={`${url}qr.png`}>Ver qr?</a></p>
            </form>
            <div className="loader">
              {loading0 && <Loader />}
            </div>
            <div className="error">
              {error0 &&
                <Message
                  msg={error0}
                  bgColor="#dc3545"
                />
              }
            </div>
          </div>
        </article>) :
        <article className="style2">
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
                      {libre && <Formulario1 />}
                      {notificacion && <Formulario2 />}
                      {recordatorios && <Formulario3 />}
                    </Modal>
                  </li>
                  <li
                    className="menu__item menu__item--show"
                    id="Configuracion">
                    <label
                      className="menu__link">Tipo de envío
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
                      className="menu__link">{`${status}`}
                    </label>
                  </li>
                </ul>
              </section>
            </nav>
            <ResultsTable />
            <div className="loader1">
              {loading0 && <Loader />}
            </div>
            <div className="error1">
              {error0 &&
                <Message
                  msg={error0}
                  bgColor="#dc3545"
                />
              }
            </div>
          </div>
        </article>
      }
    </>
  );
}

export default App;