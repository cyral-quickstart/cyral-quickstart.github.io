import React, { useState, useEffect } from "react";
import { Octokit } from "@octokit/rest";
import RepoGroup from "./repogroup";

const groups = [
    {
        "name": "Sidecar",
        "description": "Sidecar Deployment",
        "repos": []
    },
    {
        "name": "Dashboards",
        "description": "Dashboards for popular logging platforms",
        "repos": []
    },
    {
        "name": "Crawler",
        "description": "Repo Crawler Deployment",
        "repos": []
    },
    {
        "name": "GitOps",
        "description": "Configure Cyral with GitOps",
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
            .then(({ data }) => {
                return data
                  .filter(repo => repo.name.toLowerCase().startsWith('quickstart-sidecar')) // typically this is only 'quickstart-' but for now limit it to only sidecars
                  .reduce((groups, repo) => {
                    const groupName = repo.name.split('-')[1].toLowerCase();
                    
                    // Find the matching group or default to "Other"
                    let group = groups.find(group => group.name.toLowerCase() === groupName) || groups.find(group => group.name === "Other");
                    
                    // Check if the repository already exists in the group
                    const existingRepo = group.repos.find(r => r.name === repo.name);
                    if (!existingRepo) {
                      group.repos.push({
                        name: repo.name,
                        description: repo.description,
                        url: repo.html_url,
                        lastupdate: repo.pushed_at,
                        id: repo.id
                      });
                    }
              
                    return groups
                  }, [...groups]);
              })
            .then(data => {
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
