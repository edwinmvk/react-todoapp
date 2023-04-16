import React, { useContext, useEffect, useState } from 'react';
import { MessageBar, MessageBarType, PrimaryButton, TextField } from '@fluentui/react';
import { TodoContext } from './Provider';

type Props= {
    updateTaskId: string | null;
    resetTaskId: any
}

const NewTask = ({ updateTaskId, resetTaskId }: Props) => {
    const { sendactiveTaskInfo, dispatch }= useContext(TodoContext);
    const [title, setTitle]= useState<string>("");
    const [description, setDescription]= useState<string>("");
    const [showAddMsg, setShowAddMsg]= useState<boolean>(false);
    const [showUpdateMsg, setShowUpdateMsg]= useState<boolean>(false);

    useEffect(()=> {
        if(updateTaskId){
            const updatedObject= sendactiveTaskInfo.find(obj=> { return obj.id === updateTaskId })
            setTitle(updatedObject?.title || "");
            setDescription(updatedObject?.description || "");
        }
    }, [updateTaskId])

    useEffect(()=> {
        if(showAddMsg){
            setTimeout(()=> {
                setShowAddMsg(false)
            }, 1000)
        }
        if(showUpdateMsg){
            setTimeout(()=> {
                setShowUpdateMsg(false)
            }, 1000)
        }
    }, [showAddMsg, showUpdateMsg])

    const onTitleChange= (event: any)=>{
        setTitle(event.target.value)
    }

    const onDescriptionChange= (event: any)=>{
        setDescription(event.target.value)
    }

    const addTaskAction= ()=> {
        dispatch({ type: "add", data: { id: "", title: title, description: description, isChecked: false}}) // here, using dispatch, we are putting new info to the object, whose property in 'data'
        setShowAddMsg(true)
        setTitle("")    
        setDescription("")
        
    }

    const UpdateTaskAction= ()=> {
        dispatch({ type: "update", data: { id: updateTaskId || "", title: title, description: description, isChecked: false} }) 
        setShowUpdateMsg(true)
        resetTaskId(null)   // if this is done the app will always be in update mode
        setTitle("")    
        setDescription("")
    }

    const onFormSubmit= (event: any)=> {  // its real type is event: React.FormEvent
        event.preventDefault(); // refreshing page will be stopped
        updateTaskId? UpdateTaskAction(): addTaskAction();
    }

    return(
        <form className= 'tl flex flex-column' onSubmit={onFormSubmit}>
            <div>
                <TextField className= 'h-20' label= "Title" required value= {title} onChange= {onTitleChange}/>
                <TextField className= 'h-80' label= "Description" multiline rows= {7} resizable= {false} value= {description} onChange= {onDescriptionChange}/>
            </div>
            <div className= 'flex mt2'>
                <PrimaryButton text= {updateTaskId? "Update task": "Add Task" } type= "submit" className= "mr3 w-20 "/>
                { showAddMsg && (<MessageBar messageBarType= {MessageBarType.success} className= "w-80">Task added</MessageBar>)}  {/* && means that this MessageBar will be displayed only when it is true */}
                { showUpdateMsg && (<MessageBar messageBarType= {MessageBarType.success} className= "w-80">Task updated</MessageBar>)}
            </div>
        </form>
    );
};

export default NewTask;