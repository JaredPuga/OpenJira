import { useEffect, useReducer } from 'react';
import { EntriesContext, entriesReducer } from './';
import { Entry } from '@/interfaces';
import { entriesApi } from '@/apis';

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

    const addNewEntry = async ( description:string) => {

        const { data } = await entriesApi.post<Entry>('/entries', {
            description,
        })

        dispatch({ type: '[Entry] - Add-Entry', payload: data })
    }

    const onEntryUpdated = async ({_id, status, description}: Entry) => {

        try {
            const { data } = await entriesApi.put<Entry>(`/entries/${_id}`, {
                description,
                status
            })

            dispatch({ type: '[Entry] - Update-Entry', payload: data })
        } catch (error) {
            console.log(error);
            
        }

    }

    const refreshEntries = async () => {
        const { data } = await entriesApi.get<Entry[]>('/entries')
        dispatch({ type: '[Entry] - RefreshData', payload: data })
    }

    useEffect(() => {
      refreshEntries()
    }, [])
    
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
