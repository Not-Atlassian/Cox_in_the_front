import { useEffect } from "react";
import "./UserCard.css";
const UserCard = ({ hoverName }: { hoverName: string }) => {
    const id=`user-${hoverName}`;
    useEffect(() => {
        const hoverElement = document.getElementById(id);
        const hoverText = document.getElementById(`${id}-hover-text`);
    
        if (hoverElement && hoverText) {
          const handleMouseEnter = () => {
            hoverText.style.display = 'block';
          };
          const handleMouseLeave = () => {
            hoverText.style.display = 'none';
          };
    
          hoverElement.addEventListener('mouseenter', handleMouseEnter);
          hoverElement.addEventListener('mouseleave', handleMouseLeave);
    
          // Cleanup listeners on unmount
          return () => {
            hoverElement.removeEventListener('mouseenter', handleMouseEnter);
            hoverElement.removeEventListener('mouseleave', handleMouseLeave);
          };
        }
      }, [id]);
    return (<div className="user-card">
        <img className="user-logo" id={`user-${hoverName}`} src="src/assets/user_logo.png">
            
        </img>
        <p className="user-logo-hover-text" id={`user-${hoverName}-hover-text`}>{hoverName}</p>
        </div>
    )
}
export default UserCard;