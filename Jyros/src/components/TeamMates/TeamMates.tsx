import UserCard from "../Shared/UserCard/UserCard";
import './TeamMates.css';
const TeamMates = () => {
    return (
        <div className="flex-container teammates-component">
            <span>Team Mates: </span>
            <UserCard hoverName="Costea"></UserCard>
            <UserCard hoverName="Thomas"></UserCard>
        </div>
    )
}

export default TeamMates;