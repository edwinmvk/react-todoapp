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
        if(updateTaskId){   // this function actually performs the role of setFields function in a form
            const updatedObject= sendactiveTaskInfo.find(obj=> { return obj.id === updateTaskId })
            setTitle(updatedObject?.title || "");
            setDescription(updatedObject?.description || "");
        }
    }, [updateTaskId])

    useEffect(()=> {
        if(showAddMsg){
            setTimeout(()=> {
                setShowAddMsg(false)
            }, 1500)
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
        updateTaskId? UpdateTaskAction(): addTaskAction();  // this means that when clicking the submit button, either of the function executes
    }

    return(
        <form className= 'tl flex flex-column mh3' onSubmit= {onFormSubmit}>
            <div>
                <TextField style= {{fontSize: 20}} label= "Title (max char: 15)" required value= {title} maxLength= {15} onChange= {onTitleChange}/>
                <TextField style= {{fontSize: 15}} label= "Description" value= {description} multiline rows= {20} resizable= {false} onChange= {onDescriptionChange}/>
            </div>
            <div className= 'flex justify-between mt3'>
                <PrimaryButton text= {updateTaskId? "Update task": "Add Task" } type= "submit" className= "w-20"/>
                { showAddMsg && (<MessageBar messageBarType= {MessageBarType.success} className= "w-70">Task added</MessageBar>)}  {/* && means that this MessageBar will be displayed only when it is true */}
                { showUpdateMsg && (<MessageBar messageBarType= {MessageBarType.success} className= "w-70">Task updated</MessageBar>)}
            </div>
        </form>
    );
};

export default NewTask;