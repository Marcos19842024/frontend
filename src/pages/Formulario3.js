import "../styles/Formulario.css";
import "../styles/Attachment.css";
import React, { useState } from "react";
import { List } from "../components/List";
import { useSendingContext } from "../hooks/useSendContext";
import readXlsxFile from "read-excel-file";
import Message from "../components/Message";
import Loader from "../components/Loader";
import arrow from "../assets/arrow.svg";

const Formulario3 = () => {
  const [clientes, setClientes] = useState();
  const [index, setIndex] = useState(0);
  const [info, setInfo] = useState();
  const [error1, setError1] = useState(null);
  const [error2, setError2] = useState(null);
  const [error3, setError3] = useState(null);
  const [loading1, setLoading1] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const [loading3, setLoading3] = useState(false);
  const [archivos, setArchivos] = useState([]);
  const [showIb, setShowIb] = useState(true);
  const [imo, setImo] = useState(false);
  const [msjo, setMsjo] = useState("");
  const {url, addNewSend, addNewNotSend} = useSendingContext();
  const [send, setSend] = useState(url);
  const [upload, setUpload] = useState(url);
  const [del, setDel] = useState(url);

  React.useEffect(() => {
    setSend(`${url}send`);
    setUpload(`${url}upload`);
    setDel(`${url}delete/`);
    const input = document.getElementById('inputfile');
    setLoading1(true);
    try {
      input.addEventListener("change",async function() {
        const content = List(await readXlsxFile(input.files[0]))
        if (content[1].length  > 0) {
          setClientes(content[1]);
          setInfo(input.files[0].name);
          setShowIb(false);
        } else {
          setError1(content[0]);
          setClientes(null);
          input.value="";
          setTimeout(() => setError1(null),5000);
        }
      });
    } catch (err) {
      setError1(`Error ${err}`);
      setTimeout(() => setError1(null),5000);
    };
    setLoading1(false);
  },[showIb,url])

  const handleSubmit = async e => {
    e.preventDefault();
    let select = document.getElementById("Clientes");
    let submit = document.getElementById("submit");
    submit.disabled = true;
    setLoading2(true);
    let data = {
      "message": document.getElementById("mensaje").value,
      "phone": `521${clientes[index].Telefono}`,
      "pathtofiles": archivos,
    };
    await fetch(send, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-type':'application/json'
      }
    }).then((res) => {
      let datos = {
        "name": clientes[index].Nombre,
        "phone": clientes[index].Telefono
      };
      if(!res.erro) {
        addNewSend(datos);
      } else {
        addNewNotSend(datos);
        setError2(`Error ${res.status}: ${res.text}`);
      }
      getSelect(select);
    }).catch((err) => {
      setError2(`Error ${err}`);
    });
    setTimeout(() => setError2(null),5000);
    setLoading2(false);
    submit.disabled = false;
  }

  const handleUpload = (files) => {
    const formData = new FormData()

    setLoading3(true);
    for(let i = 0; i < files.length; i++) {
      formData.append('files', files[i]);
    }
    fetch(upload, {
      method: 'POST',
      body: formData
    }).then(res => res.json()).then(res => {
      if(!res.err) {
        setArchivos(res.statusText);
        for(let i = 0; i < res.statusText.length; i++) {
          let filename = res.statusText[i];
          let filetype = filename.split(".").pop();
          if(document.getElementById(filename) === null) {
            getFileShow(filename,getFileTypes(filetype));
          }
        }
      }
    }).catch((err) => {
      setError3(`Error ${err}`)
    });
    setTimeout(() => setError3(null),5000);
    setLoading3(false);
  }

  function getFileTypes(filetype) {
    switch(filetype) {
      case 'xlsx':
      case 'xls':
      case 'xlsm':
        return ['fa fa-file-excel-o','color:green'];
      case 'zip':
      case 'rar':
      case '7zip':
        return ['fa fa-file-archive-o','color:orange'];
      case 'doc':
      case 'docx':
        return ['fa fa-file-word-o','color:blue'];
      case 'pptx':
        return ['fa fa-file-powerpoint-o','color:red'];
      case 'mp3':
      case 'wav':
      case 'm4a':
        return ['fa fa-file-sound-o','color:blue'];
      case 'mp4':
      case 'mov':
      case 'avi':
      case 'wmv':
      case 'flv':
      case '3gp':
        return ['fa fa-file-video-o','color:blue'];
      case 'png':
      case 'jpg':
      case 'ico':
      case 'gif':
      case 'jpeg':
      case 'svg':
        return ['fa fa-file-picture-o','color:black'];
      case 'pdf':
        return ['fa fa-file-pdf-o','color:red'];
      case 'css':
      case 'html':
      case 'cs':
        return ['fa fa-file-code-o','color:black'];
      case 'txt':
        return ['fa fa-file-text-o','color:blue'];
      default:
        return ['fa fa-file','color:black'];
    }
  }

  function getFileShow(filename,filetype) {
    const filewrapper = document.getElementById("filewrapper");
    const showfileboxElem = document.createElement("div");
    showfileboxElem.classList.add("showfilebox");
    showfileboxElem.setAttribute("id", filename);
    const leftElem = document.createElement("div");
    leftElem.classList.add("left");
    const filetypeElem = document.createElement("span");
    filetypeElem.className = filetype[0];
    filetypeElem.style = filetype[1];
    leftElem.append(filetypeElem);
    const filetitleElem = document.createElement("h5");
    filetitleElem.innerHTML = filename;
    leftElem.append(filetitleElem);
    showfileboxElem.append(leftElem);
    const rightElem = document.createElement("div");
    rightElem.classList.add("right");
    showfileboxElem.append(rightElem);
    const crossElem = document.createElement("span");
    crossElem.innerHTML = "&#215;";
    crossElem.addEventListener("click",async () => {
      fetch(del + filename, {
        method: 'DELETE'
      }).then(res => res.json()).then(res => {
        if(res.err) {
          setError3(`Error ${res.status}: ${res.statusText}`);
        } else {
          setArchivos(res.statusText);
          filewrapper.removeChild(showfileboxElem);
        }
      }).catch((err) => {
        setError3(`Error ${err}`);
      });
      setTimeout(() => setError3(null),5000);
    })
    rightElem.append(crossElem);
    filewrapper.append(showfileboxElem);
  }

  function getSelect(select) {
    for(let i = 1;  index + i <= select.length - 1; i++) {
      if(!select.options[index + i].disabled) {
        select.options[index + i].selected = true;
        select.options[index].setAttribute("disabled","disabled");
        setIndex(index + i);
        return;
      }
    }
    for(let i = 1; index - i >= 0; i++) {
      if(!select.options[index - i].disabled) {
        select.options[index - i].selected = true;
        select.options[index].setAttribute("disabled","disabled");
        setIndex(index - i);
        return;
      }
    }
    select.options[index].setAttribute("disabled","disabled");
    let submit = document.getElementById("submit");
    submit.remove();
  }

  const sendMesage = () => {
    let msj

    if (imo) {
      msj = `Hola ${clientes[index].Nombre}.\n\nLa clínica veterinaria Baalak', le informa que ${clientes[index].Mensaje}\n\n${msjo}`;
    } else {
      msj = `Hola ${clientes[index].Nombre}.\n\nLa clínica veterinaria Baalak', le informa que ${clientes[index].Mensaje}`;
    }
    return msj
  }

  return (
    <>
      {showIb ?
        <div
          className="lista"
          id="divInput">
          <input
            type="file"
            id="inputfile"
            accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
            hidden
          />
          <label
            htmlFor="inputfile"
            className="uploadlabel">
            <span><i className="fa fa-cloud-upload fa-3x"></i></span>
            <p>Click To Upload List</p>
          </label>
          {loading1 && <Loader />}
          {error1 &&
            <Message
              msg={error1}
              bgColor="#dc3545"
            />
          }
        </div> :
        <div className="lista">
          {info && (
            <nav className="menuinfo">
              <section className="menuinfo__container">
                <ul className="menuinfo__links">
                  <li className="menuinfo__item">
                    <label className="menuinfo__link">
                      <span>
                        <i
                          className="fa fa-file-excel-o fa-1x"
                          style={{color:"green"}}>
                        </i>
                      </span>
                      <span
                        className="infolabel"
                        style={{width:"230px"}}>{`${info} (${clientes.length} Registros)`}
                      </span>
                    </label>
                  </li>
                  <li className="menuinfo__item menuinfo__item--show">
                    <label className="menuinfo__link">
                      <span>
                        <i
                          className="fa fa-folder-open"
                          style={{color:"#e4e00c"}}>
                        </i>
                      </span>
                      <img
                        className="menuinfo__arrow"
                        src={arrow}
                        alt="arrow"
                      />
                    </label>
                    <ul className="menuinfo__nesting">
                      <div className="lista">
                        <div className="wrapper">
                          <div className="box">
                            <div className="input-bx">
                              <input
                                type="file"
                                id="upload"
                                onChange={(e) => {
                                  handleUpload(e.target.files);
                                }}
                                hidden
                                multiple>
                              </input>
                              <label
                                htmlFor="upload"
                                className="uploadlabel">
                                <span><i className="fa fa-cloud-upload fa-3x"></i></span>
                                <p>Click To Upload Files</p>
                              </label>
                            </div>
                            {archivos && (
                              <h5 className="uploaded">{`Uploaded Files (${archivos.length})`}</h5>
                            )}
                            <div id="filewrapper"></div>
                          </div>
                        </div>
                        <div className="loader">
                          {loading3 && <Loader />}
                        </div>
                        <div className="error">
                          {error3 &&
                            <Message
                              msg={error3}
                              bgColor="#dc3545"
                            />
                          }
                        </div>
                      </div>
                    </ul>
                  </li>
                </ul>
              </section>
            </nav>
          )}
          {clientes && (
            <form onSubmit={handleSubmit}>
              <label
                htmlFor="Clientes">Clientes
              </label>
              <select
                name="Clientes"
                id="Clientes"
                onChange={(e) => {
                  setIndex(e.target.selectedIndex);
                }}> {
                  clientes && clientes.map((el) => (
                    <option
                      key={el.key}
                      value={el.Nombre}> {el.Nombre}
                    </option>
                  ))
                }
              </select>
              <p>Telefono: {clientes[index].Telefono}</p>
              <p>Mascotas: {clientes[index].Mascotas}</p>
              <label htmlFor="mensaje">Mensaje</label>
              <textarea
                name="mensaje"
                id="mensaje"
                value={sendMesage()}
                readOnly>
              </textarea>
              <label
                className="s1"
                htmlFor="Imo">
                <input
                  className="cb1"
                  id="Imo"
                  type="checkbox"
                  name="Imo"
                  onChange={(e) => {
                    setImo(e.target.checked)
                  }}
                />Incluir mensaje opcional
              </label>
              {imo && (
                <textarea
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
              <input
                id="submit"
                type="submit"
                value="Enviar mensaje"
              />
            </form>
          )}
          <div className="loader">
            {loading2 && <Loader />}
          </div>
          <div className="error">
            {error2 &&
              <Message
                msg={error2}
                bgColor="#dc3545"
              />
            }
          </div>
        </div>
      }
    </>
  );
};

export default Formulario3;