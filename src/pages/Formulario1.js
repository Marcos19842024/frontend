import "../styles/Formulario.css";
import "../styles/Attachment.css";
import { useSendingContext } from "../hooks/useSendContext";
import React, { useState } from "react";
import Message from "../components/Message";
import Loader from "../components/Loader";
import arrow from "../assets/arrow.svg";

const Formulario1 = ({center}) => {
  const [error1, setError1] = useState(null);
  const [error2, setError2] = useState(null);
  const [loading1, setLoading1] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const [archivos, setArchivos] = useState([]);
  const {url} = useSendingContext();
  
  React.useEffect(() => {
    var input=  document.getElementById('teléfono');
    input.addEventListener('input',function() {
    if (this.value.length > 10)
      this.value = this.value.slice(0,10);
    })
  },[])

  const handleSubmit = async e => {
    e.preventDefault();
    let inputtelefono = document.getElementById("teléfono");
    let inputmensaje = document.getElementById("mensaje");
    let submit = document.getElementById("submit");
    submit.disabled = true;
    setLoading1(true);
    let data = {
      "message": inputmensaje.value,
      "phone": `521${inputtelefono.value}`,
      "pathtofiles": archivos,
    };
    await fetch(url + "send/" + center, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-type':'application/json'
      }
    }).then((res) => {
      if(!res.erro) {
        inputtelefono.value = "";
        inputmensaje.value ="";
      } else {
        setError1(`Error ${res.status}: ${res.text}`);
      }
    }).catch((err) => {
      setError1(`Error ${err}`);
    });
    setTimeout(() => setError1(null),5000);
    setLoading1(false);
    submit.disabled = false;
  }

  const handleUpload = (files) => {
    const formData = new FormData()

    setLoading2(true);
    for(let i = 0; i < files.length; i++) {
      formData.append('files', files[i]);
    }
    fetch(url + "upload", {
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
      setError2(`Error ${err}`)
    });
    setTimeout(() => setError2(null),5000);
    setLoading2(false);
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
      fetch(url + "delete/" + filename, {
        method: 'DELETE'
      }).then(res => res.json()).then(res => {
        if(res.err) {
          setError2(`Error ${res.status}: ${res.statusText}`);
        } else {
          setArchivos(res.statusText);
          filewrapper.removeChild(showfileboxElem);
        }
      }).catch((err) => {
        setError2(`Error ${err}`);
      });
      setTimeout(() => setError2(null),5000);
    })
    rightElem.append(crossElem);
    filewrapper.append(showfileboxElem);
  }

  return (
    <>
      <div className="lista">
        <nav className="menuinfo">
          <section className="menuinfo__container">
            <ul className="menuinfo__links">
              <li className="menuinfo__item">
                <label className="menuinfo__link">
                  <span
                    style={{width:"145px", textAlign:"center"}}>Telefono: (+521)
                  </span>
                  <input
                    name="teléfono"
                    id="teléfono"
                    type="number"
                    style={{width:"100px"}}
                    maxlength="10">
                  </input>
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
                </ul>
              </li>
            </ul>
          </section>
        </nav>
        <form onSubmit={handleSubmit}>
          <label htmlFor="mensaje">Mensaje</label>
          <textarea
            name="mensaje"
            id="mensaje"
            autoComplete="on"
            autoCorrect="on">
          </textarea>
          <input
            id="submit"
            type="submit"
            value="Enviar mensaje"
          />
        </form>
        <div className="loader">
          {loading1 && <Loader />}
        </div>
        <div className="error">
          {error1 &&
            <Message
              msg={error1}
              bgColor="#dc3545"
            />
          }
        </div>
      </div>
    </>
  );
};

export default Formulario1;