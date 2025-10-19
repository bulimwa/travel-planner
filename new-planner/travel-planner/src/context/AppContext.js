// src/context/AppContext.js
import React, { createContext, useReducer } from 'react';

const initialState = {
  destinations: [],
  selectedDestination: null,
  itinerary: [],
  user: null
};

const appReducer = (state, action) => {
  switch (action.type) {
    case 'SET_DESTINATIONS':
      return { ...state, destinations: action.payload };
    
    case 'SET_SELECTED_DESTINATION':
      return { ...state, selectedDestination: action.payload };
    
    case 'ADD_TO_ITINERARY':
      return { 
        ...state, 
        itinerary: [...state.itinerary, action.payload] 
      };
    
    case 'REMOVE_FROM_ITINERARY':
      return {
        ...state,
        itinerary: state.itinerary.filter(item => item.id !== action.payload)
      };
    
    case 'SET_USER':
      return { ...state, user: action.payload };
    
    default:
      return state;
  }
};

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};
