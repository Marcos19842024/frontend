import React from "react";
import { Document, Text, Page, View, StyleSheet } from '@react-pdf/renderer';

const Docupdf = ({data1,data2}) => {
    const sending = data1;
    const notsending = data2;
    
    const styles = StyleSheet.create({
        page:{
            padding: '20px',
            flexDirection: 'column',
            display: 'flex'
        },
        section: {
            display: 'flex',
            justifyContent: 'center',
            alignContent: 'flex-end',
            flexDirection: 'column'
        },
        title: {
            textAlign: 'center',
            flexDirection: 'column',
            display: 'flex',
            alignItems: 'center'
        },
        column:{
            flexDirection: 'row',
            borderBottom: '1px solid #ccc',
        },
        table: {
            width: '50%',
            padding: '3px',
            fontSize: '10px',
            display: 'flex',
            flexDirection: 'column'
        },
        rowtable:{
            flexDirection: 'row',
            backgroundColor: '#4682B4'
        },
        row:{
            flexDirection: 'row',
            borderBottom: '1px solid #ccc',
            marginTop: '2px',
            padding: '2px'
        },
        header:{
            width: '100%',
            textAlign: 'center',
            fontWeight: '800',
            color: '#4682B4',
            marginTop: '3px',
            padding: '3px'
        },
        headerid: {
            width: '8%',
            textAlign: 'center',
            fontWeight: '800',
            color: 'white',
            marginTop: '2px',
            padding: '2px'
        },
        headername: {
            width: '62%',
            textAlign: 'center',
            fontWeight: '800',
            color: 'white',
            marginTop: '2px',
            padding: '2px'
        },
        headertelefono: {
            width: '30%',
            textAlign: 'center',
            fontWeight: '800',
            color: 'white',
            marginTop: '2px',
            padding: '2px'
        },
        cellid: {
            width: '8%',
            textAlign: 'center', 
            color: '#4682B4',
            marginTop: '2px',
            padding: '2px'
        },
        cellname: {
            width: '62%',
            textAlign: 'left', 
            color: '#4682B4',
            marginTop: '2px',
            padding: '2px'
        },
        celltelefono: {
            width: '30%',
            textAlign: 'right', 
            color: '#4682B4',
            marginTop: '2px',
            padding: '2px'
        },
        footer: {
            textAlign: 'right',
            display: 'flex',
            borderTop: '1px solid #ccc',
            marginTop: '2px',
            padding: '2px',
            fontSize:'8px'
        }
    });

    return (
        <>
            <Document>
                <Page size={"A4"} style={styles.page}>
                    <View style={styles.section}>
                        <Text style={styles.title}>Lista de recordatorios</Text>
                    </View>
                    <View style={styles.column}>
                        <View style={styles.table}>
                            <View style={styles.row}>
                                <View style={styles.header}>
                                    <Text>Enviados</Text>
                                </View>
                            </View>
                            <View style={styles.rowtable}>
                                <View style={styles.headerid}>
                                    <Text>Id</Text>
                                </View>
                                <View style={styles.headername}>
                                    <Text>Nombre</Text>
                                </View>
                                <View style={styles.headertelefono}>
                                    <Text>Teléfono</Text>
                                </View>
                            </View>
                            {sending ? sending.map((el, index)=><View key={index + 1} style={styles.row}>
                                <View style={styles.cellid}>
                                    <Text>{`${index + 1}`}</Text>
                                </View>
                                <View style={styles.cellname}>
                                    <Text>{`${el.name}`}</Text>
                                </View>
                                <View style={styles.celltelefono}>
                                    <Text>{`${el.phone}`}</Text>
                                </View>
                            </View>) : null}
                        </View>
                        <View style={styles.table}>
                            <View style={styles.row}>
                                <View style={styles.header}>
                                    <Text>No enviados</Text>
                                </View>
                            </View>
                            <View style={styles.rowtable}>
                                <View style={styles.headerid}>
                                    <Text>Id</Text>
                                </View>
                                <View style={styles.headername}>
                                    <Text>Nombre</Text>
                                </View>
                                <View style={styles.headertelefono}>
                                    <Text>Teléfono</Text>
                                </View>
                            </View>
                            {notsending ? notsending.map((el, index)=> <View key={index + 1} style={styles.row}>
                                <View style={styles.cellid}>
                                    <Text>{index + 1}</Text>
                                </View>
                                <View style={styles.cellname}>
                                    <Text>{el.name}</Text>
                                </View>
                                <View style={styles.celltelefono}>
                                    <Text>{el.phone}</Text>
                                </View>
                            </View>) : null}
                        </View>
                    </View>
                    <View style={styles.footer}>
                        <Text render={({pageNumber,totalPages})=>(`Página ${pageNumber} de ${totalPages}`)}fixed></Text>
                    </View>
                </Page>
            </Document>
        </>
    )
}

export default Docupdf