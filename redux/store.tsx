import { configureStore, combineReducers } from '@reduxjs/toolkit';
import  taskSlice  from './taskSlice';

const rootReducer = combineReducers({
    tasks: taskSlice
});

export type RootState = ReturnType<typeof rootReducer>



const store = configureStore({
    reducer: rootReducer
});


export default store