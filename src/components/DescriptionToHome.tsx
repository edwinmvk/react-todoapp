import { FontIcon, mergeStyles, TeachingBubble } from '@fluentui/react';
import { useId } from '@fluentui/react-hooks';
import React, { useState } from 'react';
import { iconStyles } from './ActiveTasks';
import { IEachTaskDT } from './Provider';

type Props= {              // This is the way to recieve the props in the child component in Type Script
    sendobj: IEachTaskDT   // Sending the props from the parent component is same as Java Script
}

const DescriptionToHome = ({sendobj}: Props) => {
    const buttonId = useId('targetButton');
    const [teachingBubbleVisible, setTeachingBubbleVisible] = useState(false);
    return (
        <div>
            <FontIcon id= {buttonId} iconName= "Info" onClick= {sendobj.description? ()=> setTeachingBubbleVisible(true): ()=>{}} className={ sendobj.description? iconStyles.style1: mergeStyles(iconStyles.style1, iconStyles.disabled)}/>
            {teachingBubbleVisible && (
                <TeachingBubble
                    target={`#${buttonId}`}
                    headline= {sendobj.title}
                    onDismiss= {()=> setTeachingBubbleVisible(false)}
                >
                    {sendobj.description}
                </TeachingBubble>
            )}
        </div>
    );
};

export default DescriptionToHome;