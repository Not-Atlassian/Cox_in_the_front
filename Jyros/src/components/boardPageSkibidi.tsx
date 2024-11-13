import JyrosSidebar from "./jyrosSidebar";
import Board from "./Board/board";

import "./Board.css";
import { SidebarTrigger } from "./ui/sidebar";

const BoardPageSkibidi = () => {

    return (
        <div className="board-page">
            <JyrosSidebar />
            <SidebarTrigger/>

            <Board />
        </div>
        )
}

export default BoardPageSkibidi;