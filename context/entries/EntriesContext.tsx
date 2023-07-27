import { Entry } from '@/interfaces';
import { createContext } from 'react';

interface ContextProps {
    entries: Entry[];
    addNewEntry: (description:string) => void;
    onEntryUpdated: (entry: Entry, showSnackBar?: boolean) => void;
    onEntryDeleted: (id: string, showSnackBar?: boolean) => void;
}

export const EntriesContext = createContext({} as ContextProps)