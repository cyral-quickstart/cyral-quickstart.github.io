import React, { useState, useEffect } from "react";
import { Octokit } from "@octokit/rest";
import RepoGroup from "./repogroup";

const groups = [{
    "name": "GitOps",
    "description": "Configure Cyral with GitOps",
    "repos": []
},
{
    "name": "Sidecar",
    "description": "Sidecar Deployment",
    "repos": []
},
{
    "name": "Crawler",
    "description": "Repo Crawler Deployment",
    "repos": []
},
{
    "name": "Other",
    "description": "Other quickstarts",
    "repos": []
},
]

export default function RepoList() {
    const [Groups, setGroups] = useState([])

    const getData = () => {
        const octokit = new Octokit();
        octokit.rest.repos
            .listForOrg({
                org: "cyral-quickstart",
                type: "public",
            })
            .then(({ data }) =>
                data.filter(repo => repo.name.toLowerCase().startsWith('quickstart-'))
                    .reduce(function (r, v, i, a) {
                        const grpName = v.name.split('-')[1]
                        const repoData = { "name": v.name, "description": v.description, "url": v.html_url, "lastupdate": v.pushed_at, "id": v.id }
                        const grp = r.find(i => {
                            return i.name.toLowerCase() === grpName
                        })
                        if (!grp.repos.find(i => { return i.name === repoData.name })) {
                            if (grp) {
                                grp.repos.push(repoData)
                            } else {
                                r.find(i => {
                                    return i.name === "Other"
                                }).repos.push(repoData)
                            }
                        }
                        return r;
                    }, groups)
            )
            .then(data => {
                console.log("store data")
                console.log(data)
                setGroups(data)
            });
    }

    useEffect(() => { getData() }, [])

    return (
        <div>
            {Groups.map((item, i) => {
                if (item.repos.length > 0) {
                    return <RepoGroup key={i} data={item} />
                }
                return ""
            })}
        </div>
    );
}
