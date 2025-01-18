import React, { useContext, useEffect, useState } from "react";
import UserCard from "../Shared/UserCard/UserCard";
import './TeamMates.css';
import { AppContext } from "@/context/AppContext";

const TeamMates = ({ teamId }: { teamId: number }) => { 
    
    const {teamMates, fetchTeamMates} = useContext(AppContext) as any;

    useEffect(() => {
        // fetch(`http://localhost:5073/Test/GetUsersInTeam/${teamId}`)
        //     .then((response) => response.json())
        //     .then((data: { username: string }[]) => {
        //         const usernames = data.map(user => user.username);
        //         setTeamMates(usernames);
        //     })
        //     .catch((error) => {
        //         console.error("Error fetching teammates:", error);
        //     });
        async function fetchTeamMates1(teamId: number) {
            fetchTeamMates(teamId);
        }
        fetchTeamMates1(teamId);
    }, [teamId]);

    return (
        <div className="flex-container teammates-component">
            <span>Team Mates: </span>
            {
                teamMates.map((teammate, index) => (
                    <UserCard key={index} hoverName={teammate.username} />
                ))
            }
        </div>
    );
}

export default TeamMates;
