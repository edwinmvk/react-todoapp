import React, { createContext, useEffect, useReducer } from 'react';

interface ITodoContext{
    sendactiveTaskInfo: IEachTaskDT[];
    dispatch: any;  // dispatch: React.Dispatch<any>
}

export const TodoContext= createContext<ITodoContext>({ sendactiveTaskInfo: [], dispatch: ()=> {} });   // Initial values are an empty array and void funtion 
// we are exporting the TodoContext so that other Funtional components can access its props                   
// inside <...>, we specify the datatype of the interface

export interface IEachTaskDT{ // This interface defines the Datatype of the objects in the list 
    id: string;
    title: string;
    description?: string, // description is not mandatory. If there is no dexcription, it will be null
    isChecked: boolean
}

interface IStateDT{       // This interface defines the Datatype of the entire state
    activeTaskInfo: IEachTaskDT[]
}

const reducer= (state: IStateDT, action: any)=> {
    switch(action.type){
        case 'add':
            action.data.id= new Date().toJSON(); // add new id property to the data object
            return {...state, activeTaskInfo: [action.data, ...state.activeTaskInfo]};  // here we are returning the updated state with the activeTaskInfo property modified completely or replaced completely
                                                                                        // activeTaskInfo property holds an array of objects. To that array we are adding the new object, i.e.,action.data and the old existing objects
        case 'delete':                                                                   
            const copystate= {...state} // here we are making a duplicate copy of the entire state object 
            const filteredstate= copystate.activeTaskInfo.filter(obj=> {return obj.id !== action.data.id})
            return {...state, activeTaskInfo: filteredstate}
        
        case 'update':
            const copyActiveTaskInfo= [...state.activeTaskInfo] // here we are making a duplicate copy of not the entire state object, but only the array in it
            const index= copyActiveTaskInfo.findIndex(obj => obj.id === action.data.id) // we are finding the index of the object to be removed or spliced
            copyActiveTaskInfo.splice(index, 1, { id: action.data.id, title: action.data.title, description: action.data.description, isChecked: action.data.isChecked }) // We splice that index and then add a new object in place of that index
            return {...state, activeTaskInfo: copyActiveTaskInfo}
        }                                                                                          
    return {...state}
}

const activeTaskList: IEachTaskDT[]= [
    {
        id: "1",
        title: "Task 1",
        description: "This is description 1",
        isChecked: false
    },
    {
        id: "2",
        title: "Task 2",
        description: "This is description 2",
        isChecked: false
    },
    {
        id: "3",
        title: "Task 3",
        description: "This is description 3",
        isChecked: false
    },
    {
        id: "4",
        title: "Task 4",
        description: "This is description 4",
        isChecked: false
    },
    {
        id: "5",
        title: "Task 5",
        description: "This is description 5",
        isChecked: false
    }
]

type Props= {       // This is the way to recieve a props in the child component in Type Script
    children: React.ReactNode
}

const Provider= (props: Props)=> {

    // Load todolist from localStorage if it exists
    const loadState= ()=> {
        const stateJson = localStorage.getItem("todolist");
        return stateJson ? JSON.parse(stateJson) : { activeTaskInfo: activeTaskList };
    }

    const [state, dispatch]= useReducer(reducer, loadState());  // the parameters of useReducer are: (i) a function that we perform on the state 
                                                                // (ii) Initial state.The state should be an object type rather than an array 
                                                                // this hook returns an array with the state and the dispatch function. 
                                                                // Only during starting, the Initial state from hook is copied to state in the return array 
                                                                // Ater that, whenever the dispatch function is called by anyone, the STATE in the return array of hook is copied to the STATE of reducer function
                                                                // The ACTIONS in reducer function is actually the body of the dispatch function
                                                                // After performing the actions, the reducer function returns the newstate which is inturn again stored into the STATE in the return array of Hooks
    
    // Save admin to localStorage when it changes
    useEffect(() => {
        localStorage.setItem("todolist", JSON.stringify(state));
    }, [state]);
    return(
        <TodoContext.Provider value= {{ sendactiveTaskInfo: state.activeTaskInfo, dispatch }}> 
            {props.children}
        </TodoContext.Provider>
    );
};

export default Provider;

// import React, { createContext, useEffect, useReducer } from 'react';

// interface ITodoContext{
//     sendactiveTaskInfo: IEachTaskDT[];
//     dispatch: any;
// }

// export const TodoContext= createContext<ITodoContext>({ sendactiveTaskInfo: [], dispatch: ()=> {} });

// export interface IEachTaskDT{
//     id: string;
//     title: string;
//     description?: string,
//     isChecked: boolean
// }

// interface IStateDT{
//     activeTaskInfo: IEachTaskDT[]
// }

// const reducer= (state: IStateDT, action: any)=> {
//     switch(action.type){
//         case 'add':
//             action.data.id= new Date().toJSON();
//             return {...state, activeTaskInfo: [action.data, ...state.activeTaskInfo]};  
                                                                                        
//         case 'delete':                                                                   
//             const copystate= {...state} 
//             const filteredstate= copystate.activeTaskInfo.filter(obj=> {return obj.id !== action.data.id})
//             return {...state, activeTaskInfo: filteredstate}
        
//         case 'update':
//             const copyActiveTaskInfo= [...state.activeTaskInfo] 
//             const index= copyActiveTaskInfo.findIndex(obj => obj.id === action.data.id) 
//             copyActiveTaskInfo.splice(index, 1, { id: action.data.id, title: action.data.title, description: action.data.description, isChecked: action.data.isChecked })
//             return {...state, activeTaskInfo: copyActiveTaskInfo}
//     }                                                                                          
//     return {...state}
// }

// const activeTaskList: IEachTaskDT[]= [
//     {
//         id: "1",
//         title: "Sample Task",
//         description: "This is description Sample task",
//         isChecked: false
//     },
// ]

// type Props= {
//     children: React.ReactNode
// }

// const Provider= (props: Props)=> {
//     // Load todolist from localStorage if it exists
//     const loadState= ()=> {
//         const stateJson = localStorage.getItem("todolist");
//         return stateJson ? JSON.parse(stateJson) : { activeTaskInfo: activeTaskList };
//     }

//     const [state, dispatch]= useReducer(reducer, loadState()); // Load state from local storage on component mount
    
//     // Save admin to localStorage when it changes
//     useEffect(() => {
//         localStorage.setItem("todolist", JSON.stringify(state));
//     }, [state]);

//     return(
//         <TodoContext.Provider value= {{ sendactiveTaskInfo: state.activeTaskInfo, dispatch }}> 
//             {props.children}
//         </TodoContext.Provider>
//     );
// };

// export default Provider;
