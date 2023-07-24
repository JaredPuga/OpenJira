import { useReducer } from "react";
import { UIContext } from "./UIContext";
import { UIReducer } from "./UIReducer";

export interface UIState {
    sideMenuOpen: boolean;
    isAddingEntry: boolean;
    isDragging: boolean;
}

const UI_InitialState: UIState = {
    sideMenuOpen: false,
    isAddingEntry: false,
    isDragging: false,
}

interface Props {
    children: JSX.Element | JSX.Element[];
}

export const UIProvider = ({ children }:Props) => {

    const [state, dispatch] = useReducer(UIReducer, UI_InitialState)

    const openSideMenu = () => {
        dispatch({type: 'UI - Open Sidebar'})
    }

    const closeSideMenu = () => {
        dispatch({type: 'UI - Close Sidebar'})
    }

    const setIsAddingEntry = (isAdding:boolean) => {
        dispatch({type: 'UI - Set IsAddingEntry', payload: isAdding})
    }

    const startDragging = () => {
        dispatch({type: 'UI - Start Dragging'})
    }

    const endDragging = () => {
        dispatch({type: 'UI - End Dragging'})
    }

  return (
    <UIContext.Provider value={{
        ...state,
        openSideMenu,
        closeSideMenu,
        setIsAddingEntry,
        startDragging,
        endDragging,
    }
    }>
        {children}
    </UIContext.Provider>
  )
}