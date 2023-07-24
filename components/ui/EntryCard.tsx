import { DragEvent, useContext } from "react"
import { UIContext } from "@/context/ui";
import { Entry } from "@/interfaces"
import { Card, CardActionArea, CardActions, CardContent, Typography } from "@mui/material"

interface Props {
  entry: Entry;
}

export const EntryCard = ({entry}:Props) => {

  const { startDragging, endDragging } = useContext(UIContext)

  const onDragStart = (event:DragEvent) => {
    event.dataTransfer.setData('text', entry._id)
    startDragging();
    
  }

  const onDragEnd = () => {
    endDragging();
  }

  return (
    <Card sx={{marginBottom: 1}} draggable={true} onDragStart={onDragStart} onDragEnd={onDragEnd}>
      <CardActionArea>
        <CardContent>
          <Typography sx={{whiteSpace: 'pre-line'}}>{entry.description}</Typography>
        </CardContent>

        <CardActions sx={{display: 'flex', justifyContent: 'end', paddingRight: '2'}}>
          <Typography variant="body2">Hace 30 minutos</Typography>
        </CardActions>
      </CardActionArea>
    </Card>
  )
}
