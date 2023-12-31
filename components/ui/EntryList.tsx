import { useContext, useMemo, DragEvent } from "react";
import { EntriesContext } from "@/context/entries";
import { UIContext } from "@/context/ui";
import { Paper, List } from "@mui/material";
import { EntryCard } from "./";
import { EntryStatus } from "@/interfaces";

import styles from './EntryList.module.css'

interface Props {
  status: EntryStatus
}

export const EntryList = ({status}:Props) => {

  const { entries, onEntryUpdated } = useContext(EntriesContext)
  const { isDragging, endDragging } = useContext(UIContext)

  const entriesByStatus = useMemo(() => entries.filter(entry => entry.status === status), [ entries ])

  const allowDrop = (event: DragEvent) => {
    event.preventDefault();
  }

  const onDropEntry = (event: DragEvent) => {
    const id = event.dataTransfer.getData('text')

    const entry = entries.find(entry => entry._id === id)!;
    entry.status = status;
    onEntryUpdated( entry );
    endDragging();
  }

  return (
    <div onDrop={onDropEntry} onDragOver={allowDrop} className={isDragging ? styles.dragging : ''}>
        <Paper sx={{height: 'calc(100vh - 180px)', padding: '1px 5px',overflow: 'scroll', backgroundColor: 'transparent', '&::-webkit-scrollbar': { display: 'none' }}}>
            
            <List sx={{opacity: isDragging ? 0.3 : 1, transition: 'all .3s'}}>
              {
                entriesByStatus.map(entry => (
                  <EntryCard key={ entry._id } entry={entry}/>
                ))
              }
            </List>
        </Paper>
    </div>
  )
}
