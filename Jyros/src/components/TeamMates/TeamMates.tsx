import React, { useEffect, useState } from "react";
import UserCard from "../Shared/UserCard/UserCard";
import './TeamMates.css';

const TeamMates = ({ teamId }: { teamId: number }) => { 
    const [teammates, setTeammates] = useState<string[]>([]);

    useEffect(() => {
        fetch(`http://localhost:7048/Test/GetUsersInTeam/${teamId}`)
            .then((response) => response.json())
            .then((data: { username: string }[]) => {
                const usernames = data.map(user => user.username);
                setTeammates(usernames);
            })
            .catch((error) => {
                console.error("Error fetching teammates:", error);
            });
    }, [teamId]);

    return (
        <div className="flex-container teammates-component">
            <span>Team Mates: </span>
            {
                teammates.map((teammate, index) => (
                    <UserCard key={index} hoverName={teammate} />
                ))
            }
        </div>
    );
}

export default TeamMates;
