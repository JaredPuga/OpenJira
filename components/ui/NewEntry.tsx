import { useContext, useState } from "react";
import { EntriesContext } from "@/context/entries";
import { Button, Box, TextField } from "@mui/material";
import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";
import AddCircleOutlineOutlined from "@mui/icons-material/AddCircleOutlineOutlined";
import { UIContext } from "@/context/ui";

export const NewEntry = () => {
    
  const { addNewEntry } = useContext(EntriesContext)
  const { isAddingEntry, setIsAddingEntry } = useContext(UIContext)
  
  const [inputValue, setInputValue] = useState('');
  const [touched, setTouched] = useState(false);


  const onSave = () => {
    if (inputValue.length <= 0) return;
    addNewEntry(inputValue);
    setInputValue('');
    setTouched(false);
    setIsAddingEntry(false);
  }

  return (
    <Box sx={{ marginBottom: 2, paddingX: 1 }}>
      {isAddingEntry ? (
        <>
          <TextField
            fullWidth
            sx={{ marginTop: 2, marginBottom: 1 }}
            placeholder="Nueva entrada"
            autoFocus
            multiline
            label="Nueva entrada"
            helperText="Escribe una nueva entrada"
            error= { inputValue.length <= 0 && touched} 
            value={ inputValue }
            onChange={ (e) => setInputValue(e.target.value)}
            onBlur={ () => setTouched(true)}
          />
          <Box display="flex" justifyContent="space-between">
            <Button 
              variant="text"
              onClick={() => {setIsAddingEntry(false); setTouched(false)}}
            >
                Cancelar
            </Button>
            
            <Button
              variant="outlined"
              color="secondary"
              endIcon={<SaveOutlinedIcon />}
              onClick={onSave}
            >
              Guardar
            </Button>
          </Box>
        </>
      ) : (
        <Button
          startIcon={<AddCircleOutlineOutlined />}
          fullWidth
          variant="outlined"
          onClick={() => setIsAddingEntry(true)}
        >
          Agregar Tarea
        </Button>
      )}
    </Box>
  );
};