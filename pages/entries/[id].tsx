import { useState, useMemo, useContext,ChangeEvent } from 'react'
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { Layout } from "@/components/layouts"
import { capitalize, Button, Card, CardActions, CardContent, CardHeader, Grid, TextField, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio, IconButton } from "@mui/material"
import IconSave from "@mui/icons-material/SaveOutlined";
import IconDelete from "@mui/icons-material/DeleteOutline";
import { Entry, EntryStatus } from "@/interfaces";
import { dbEntries } from '@/database';
import { EntriesContext } from '@/context/entries';
import { dateFunctions } from '@/utils';


const validStatus:EntryStatus[] = ['pending', 'in-progress', 'finished']

interface Props {
    entry: Entry
}


export const EntryPage = ({entry}:Props) => {
    
    const { onEntryUpdated, onEntryDeleted } = useContext(EntriesContext)

    const router = useRouter()
        
    const [inputValue, setInputValue] = useState(entry.description)
    const [status, setStatus] = useState<EntryStatus>(entry.status)
    const [touched, setTouched] = useState(false)

    const isNotValid = useMemo(() => inputValue.length <= 0 && touched , [inputValue, touched])

    const onTextFielChangeEvent = (e: ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value)
    }

    const onStatusChange = (e: ChangeEvent<HTMLInputElement>) => {
        setStatus(e.target.value as EntryStatus)
    }

    const onSave = () => {
        if ( inputValue.trim().length === 0 ) return;

        const updatedEntry: Entry = {
            ...entry,
            description: inputValue,
            status,

        }

        onEntryUpdated(updatedEntry, true)
    }

  return (
    <Layout title={ inputValue.substring(0,20) + "..." }>
        <Grid container justifyContent='center' sx={{ marginTop: 2 }}>
            <Grid item xs={ 12 } sm={ 8 } md={ 6 } >
                <Card>
                    <CardHeader 
                        title={`Entrada`} 
                        subheader={`Creada ${dateFunctions.getFormatDistanceToNow(entry.createdAt)} `}
                    />
                    <CardContent>
                        <TextField 
                            sx={{ marginTop: 2, marginBottom: 1 }} 
                            fullWidth 
                            placeholder="Nueva entrada" 
                            autoFocus 
                            multiline 
                            label="Nueva entrada"
                            value={ inputValue }
                            onBlur={ () => setTouched(true) }
                            onChange={ onTextFielChangeEvent }
                            helperText= { isNotValid && 'Ingrese un valor'}
                            error={ isNotValid && touched }
                        />
                        <FormControl>
                          <FormLabel>Status</FormLabel>
                          <RadioGroup 
                            row 
                            value={status}
                            onChange={ onStatusChange }
                        >
                            {
                                validStatus.map(status => (
                                    <FormControlLabel key={status} value={status} control={ <Radio />} label={ capitalize(status) }/>
                                ))
                            }
                          </RadioGroup>

                        </FormControl>

                    </CardContent>

                    <CardActions>
                        <Button 
                            startIcon={ <IconSave />} 
                            variant="contained" 
                            fullWidth 
                            onClick={ onSave }
                            disabled={ inputValue.length <= 0 }
                        > Save </Button>
                    </CardActions>
                </Card>
            </Grid>
        </Grid>


        <IconButton sx={{position:'fixed', bottom: 30, right: 30, backgroundColor: 'red'}} onClick={() => {onEntryDeleted(entry._id, true); router.push('/')}}>
            <IconDelete />
        </IconButton>
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async ({params}) => {

    const { id } = params as { id: string };

    const entry = await dbEntries.getEntryById(id);

    if ( !entry ) {
        return {
            redirect: {
                destination: '/',
                permanent: false,
            }
        }
    }

    return {
        props:{
            entry
        }
    }
}


export default EntryPage
