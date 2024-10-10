import "../styles/ResultTable.css";
import "handsontable/dist/handsontable.full.css";
import React, { useRef } from "react";
import { HotTable, HotColumn } from "@handsontable/react";
import { registerAllModules } from "handsontable/registry";
import { registerLanguageDictionary, esMX } from "handsontable/i18n";
import { useSendingContext } from "../hooks/useSendContext";
import { PDFViewer } from "@react-pdf/renderer";
import Docupdf from "./DocuPdf";

// ejecutar para obtener todas las funciones de handsontable
registerAllModules();
registerLanguageDictionary(esMX);

const ResultsTable = () => {
    const hotTableComponent = useRef(null);
    const {viewpdf, sending, notsending} = useSendingContext();
    
    return (
        <>
            {viewpdf ? (
                <PDFViewer
                style={{
                    width: "100%",
                    height: "90vh"
                }}>
                <Docupdf
                    data1={sending}
                    data2={notsending}
                />
                </PDFViewer>
            ):
            <>
                <div className="body">
                    <h3>Lista de clientes</h3>
                </div>
                <div className="table">
                    <h4 className="table-sending">Enviados</h4>
                    <h4 className="table-notsending">No enviados</h4>
                    {sending && (
                        <div className="table1">
                            <HotTable
                                className="htJustify"
                                ref={hotTableComponent}
                                language={esMX.languageCode}
                                data={sending}
                                licenseKey="non-commercial-and-evaluation"
                                colHeaders={true}
                                rowHeaders={true}
                                columnSorting={false}
                                mergeCells={true}
                                contextMenu={["row_above", "row_below"]}
                                readOnly={true}>
                                    <HotColumn data="name" title="Nombre" />
                                    <HotColumn data="phone" title="Teléfono" />
                            </HotTable>
                        </div>
                    )}
                    {notsending && (
                        <div className="table2">
                            <HotTable
                                className="htJustify"
                                ref={hotTableComponent}
                                language={esMX.languageCode}
                                data={notsending}
                                licenseKey="non-commercial-and-evaluation"
                                colHeaders={true}
                                rowHeaders={true}
                                columnSorting={false}
                                mergeCells={true}
                                contextMenu={["row_above", "row_below"]}
                                readOnly={true}>
                                    <HotColumn data="name" title="Nombre" />
                                    <HotColumn data="phone" title="Teléfono" />
                            </HotTable>
                        </div>
                    )}
                </div>
            </>}
        </>
    );
}

export default ResultsTable;