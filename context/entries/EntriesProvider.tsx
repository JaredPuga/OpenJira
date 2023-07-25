import { useReducer } from 'react';
import { v4 as uuidv4 } from 'uuid'
import { EntriesContext, entriesReducer } from './';
import { Entry } from '@/interfaces';

export interface EntriesState {
    entries: Entry[];
}

const Entries_InitialState: EntriesState = {
    entries: [
    ],
}

interface EntriesProps  {
    children: JSX.Element | JSX.Element[];
}

export const EntriesProvider = ({children}:EntriesProps) => {

    const [state, dispatch] = useReducer( entriesReducer , Entries_InitialState)

    const addNewEntry = ( description:string) => {
        const newEntry: Entry = {
            _id: uuidv4(),
            description,
            createdAt: Date.now(),
            status: 'pending'
        }

        dispatch({ type: '[Entry] - Add-Entry', payload: newEntry })
    }

    const onEntryUpdated = (entry: Entry) => {
        dispatch({ type: '[Entry] - Update-Entry', payload: entry })
    }
    
  return (
    <EntriesContext.Provider value={{
        ...state,
        addNewEntry,
        onEntryUpdated
    }}>
        {children}
    </EntriesContext.Provider>
  )
}
