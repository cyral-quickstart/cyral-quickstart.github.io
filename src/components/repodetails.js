import React from "react";
import { CTableRow, CTableDataCell } from '@coreui/react';

export default function RepoDetails(props){
    return(
        <CTableRow><CTableDataCell><a href={props.data.url}>{props.data.name}</a></CTableDataCell><CTableDataCell>{props.data.description}</CTableDataCell><CTableDataCell>{(new Date(props.data.lastupdate)).toLocaleDateString()}</CTableDataCell></CTableRow> 
    )

}