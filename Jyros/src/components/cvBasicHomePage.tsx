import { useNavigate } from "react-router-dom";


const CVBasicHomePageNuDaPushLaAsta = () => {

    const navigate = useNavigate();
    const handleClick = () => {
        navigate('/board');
    }
    return (
        <div>
        <h1>CVBasicHomePageNuDaPushLaAsta</h1>
        <br/>
        <button onClick={handleClick}>Go to Board</button>
        </div>
    )
}

export default CVBasicHomePageNuDaPushLaAsta;