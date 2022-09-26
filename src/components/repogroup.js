import React from "react";
import RepoDetails from "./repodetails";



export default function RepoGroup(props){
    console.log(props)
    return(
        <div>
            <h1>{props.data.name}</h1>
            {props.data.description}
            <table border='1'>
                <thead><tr><th>Name</th><th>Description</th><th>Last Update</th></tr></thead>
            <tbody>
            {props.data.repos.map((item, i) =>{ 
                return <RepoDetails key={i} data={item} />
            })}
            </tbody>
            </table>
        </div>
    )
}