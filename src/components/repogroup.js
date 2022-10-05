import React from "react";
import RepoDetails from "./repodetails";
import { CTableRow, CTable, CTableHead, CTableHeaderCell, CTableBody } from '@coreui/react';




export default function RepoGroup(props) {
    console.log(props)
    return (
        <div>
            <h1>{props.data.name}</h1>
            {props.data.description}
            <CTable bordered>
                <CTableHead><CTableRow><CTableHeaderCell scope="col">Name</CTableHeaderCell><CTableHeaderCell scope="col">Description</CTableHeaderCell><CTableHeaderCell scope="col">Last Update</CTableHeaderCell></CTableRow></CTableHead>
                <CTableBody>
                    {props.data.repos.map((item, i) => {
                        return <RepoDetails key={i} data={item} />
                    })}
                </CTableBody>
            </CTable>
        </div>
    )
}