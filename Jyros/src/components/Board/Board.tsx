import BoardCard from "./boardCard";
import "../board.css";


const Board = () => {
    return (
        <div className="board">
            <BoardCard title={"To Do:"}/>
            <BoardCard title={"In Progress:"} />
            <BoardCard title={"In Plating:"} />
            <BoardCard title={"Cooked:"} />
        </div>
    );
}

export default Board;

