import React from "react";

export default function RepoDetails(props){
    return(
        <tr><td><a href={props.data.url}>{props.data.name}</a></td><td>{props.data.description}</td><td>{(new Date(props.data.lastupdate)).toLocaleDateString()}</td></tr> 
    )

}