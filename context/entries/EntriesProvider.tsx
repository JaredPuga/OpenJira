import { useEffect, useReducer } from 'react';
import { useSnackbar } from "notistack"; 
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
    const { enqueueSnackbar } = useSnackbar();
    

    const addNewEntry = async ( description:string) => {

        const { data } = await entriesApi.post<Entry>('/entries', {
            description,
        })

        dispatch({ type: '[Entry] - Add-Entry', payload: data })
    }

    const onEntryUpdated = async ({_id, status, description}: Entry, showSnackBar = false) => {

        try {
            const { data } = await entriesApi.put<Entry>(`/entries/${_id}`, {
                description,
                status
            })

            dispatch({ type: '[Entry] - Update-Entry', payload: data })
            
            if (showSnackBar)
                enqueueSnackbar('Entrada actualizada',{
                    variant: 'success',
                    autoHideDuration: 1500,
                    anchorOrigin: {
                        vertical: 'top',
                        horizontal: 'right'
                    }
                })

        } catch (error) {
            console.log(error);
            
        }
    }

    const onEntryDeleted = async (id: string, showSnackBar = false) => {
        try {
            const { data } =  await entriesApi.delete(`/entries/${id}`)            

            dispatch({ type: '[Entry] - Delete-Entry', payload: data})

            if (showSnackBar)
                enqueueSnackbar('Entry was deleted',{
                    variant: 'error',
                    autoHideDuration: 1500,
                    anchorOrigin: {
                        vertical: 'top',
                        horizontal: 'right'
                    }
                })
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
        onEntryUpdated,
        onEntryDeleted,
    }}>
        {children}
    </EntriesContext.Provider>
  )
}
