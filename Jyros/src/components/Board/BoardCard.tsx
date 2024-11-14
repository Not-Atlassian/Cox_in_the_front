import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"

  import "../board.css";



const BoardCard = ({ title }: { title: string }) => {
    return (
        <Card className="board-card">
            <CardHeader>
                <CardTitle>{title}</CardTitle>
            </CardHeader>
            <CardContent>
                <CardDescription>
                    <p>Board contentaaaaaaaaaaaa</p>
                </CardDescription>
            </CardContent>
        </Card>
    );
}

export default BoardCard;

