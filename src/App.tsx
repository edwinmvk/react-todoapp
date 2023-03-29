import React, { useState } from 'react';
import 'tachyons';
import './App.css';
import ActiveTasks from './components/ActiveTasks';
import Provider from './components/Provider';
import NewTask from './components/NewTask';
import { Pivot, PivotItem, initializeIcons } from '@fluentui/react'
initializeIcons();                                                                                     

const App= ()=> {  
    const [key, setKey]= useState<string>('1')
    const [editTaskId, setEditTaskId]= useState<string | null>(null) // we are sending the setEditTaskId() function to Active Tasks component through a function jumpUpdatedTask. From there, jumpUpdatedTask() takes the id to be updated.
                                                                    // Then we are sending the updated editTaskId state to New Tasks component. 
    
    const jumpUpdatedTask= (id:string)=> {
        setKey("1");
        setEditTaskId(id);
    }
    
    return(
    <div className= 'App tc br4 shadow-2' style= {{ height: "70%" }}>
        <Provider>
            <header className= 'f2 b courier white bg-navy'>ToDo List</header>
            <div className= 'ma2'>
                <Pivot onLinkClick= {(item?: PivotItem)=> { // ? means that on clicking link, if there an item, it represents pivot item, Else it will represent no value or 'UNDEFINED'. But the function still runs
                    setKey(item?.props.itemKey || "1");  // if there is no selected key item, then the default value will be "0" 
                }} selectedKey= {key} >
                    <PivotItem headerText= "Active Tasks" itemKey= "0">
                        <ActiveTasks onClickEdit= {jumpUpdatedTask} />
                    </PivotItem>
                    <PivotItem headerText= "New Task" itemKey= "1">
                        <NewTask updateTaskId= {editTaskId}/>
                    </PivotItem>
                    {/* <PivotItem headerText= "Completed" itemKey="2">
                        <Label>Pivot #2</Label>
                    </PivotItem> */}
                </Pivot>
            </div>
        </Provider>
    </div>
  )
}

export default App;