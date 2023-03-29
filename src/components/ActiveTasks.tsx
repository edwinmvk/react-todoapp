import React, { useContext } from 'react';
import 'tachyons';
import { Checkbox, FontIcon, mergeStyleSets } from '@fluentui/react';
import { IEachTaskDT, TodoContext } from './Provider';
import DescriptionToHome from './DescriptionToHome';

export const iconStyles= mergeStyleSets({  // this function is used to write css as javascript
    style1: {
        fontSize: 20,
        margin: '0 5px',
        cursor: "pointer"
    },
    disabled: {
        color: "gray",
        cursor: "default"
    }
})

type Props= {
    onClickEdit: (idOfTaskToUpdate: string)=> void
}

const ActiveTasks= ({onClickEdit}: Props)=> {
    const { sendactiveTaskInfo, dispatch }= useContext(TodoContext);

    const onRenderTask= (obj: IEachTaskDT)=> {
        return <>
            <div key= {obj.id} className= 'ma3 pa3 flex items-center justify-between h2 b near-black bg-light-gray shadow-1 dim'>
                <div className= 'flex'>
                    {/* <Checkbox/> */}
                    {obj.title}
                </div>
                <div className= 'flex'>
                    <DescriptionToHome sendobj= {obj}/>
                    <FontIcon iconName= "EditNote" className={ iconStyles.style1} onClick= {()=> onClickEdit(obj.id)} />
                    <FontIcon iconName= "Delete" className={ iconStyles.style1 } onClick= {()=> onClickDelete(obj.id)}/>
                </div>
            </div>
        </>
    }
    
    const onClickDelete= (id: string)=> {
        if(window.confirm("Are you sure you want to delete"))
            dispatch({ type: "delete", data: {id} })
    }

    return(
        <div className= 'tl'>
            {sendactiveTaskInfo.map( onRenderTask )}

            {/* {activeTaskList.map((obj)=> {
                return <>
                    <div key= {obj.id}>{obj.title}</div>
                </>
            })} */}
        </div>
    )
}

export default ActiveTasks;