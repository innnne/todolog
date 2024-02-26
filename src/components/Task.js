import React, {useState} from 'react';
import styled from 'styled-components/native';
import PropTypes from 'prop-types';

import {images} from '../Images';
import {IconButton} from '../components/IconButton';
import {TaskInput} from '../components/Input';

const List = styled.View`
    flex-direction:row; justify-content:space-between; align-items:center;
    min-height:60px; margin:5px 0; padding:5px 20px; background:${({theme})=>theme.itemBg}; border-radius:15px;
`;
const ListCont = styled.Text`
    flex:1; font-size:18px;
    text-decoration:${({completed})=>completed && 'line-through' };
    color:${({theme, completed})=>completed ? theme.done : theme.text}
`;

export const Task = ({el, deleteTask, chkTask, updateTask}) => {
    const [isEdit, setIsEdit] = useState(false);
    const [text, setTxt] = useState(el.text);

    const _updateBtnPress = () => {
        setIsEdit(true);
    };
    const _onSubmitEditing = () => {
        if(isEdit){
            const editedTask = Object.assign({}, el, {text});
            setIsEdit(false);
            updateTask(editedTask);
        }
    };
    const _onBlur = () => {
        if(isEdit){
            setIsEdit(false);
            setTxt(el.text);
        }
    };
    return isEdit ? (
        <TaskInput value={text} onChangeText={(text)=>setTxt(text)} 
        onSubmitEditing={_onSubmitEditing} onBlur={_onBlur} /> 
    ) : (
        <List>
            <IconButton id={el.id} completed={el.completed} type={el.completed ? images.completed : images.uncompleted} onPressOut={chkTask} />
            <ListCont completed={el.completed}>{el.text}</ListCont>
            {el.completed || <IconButton type={images.update} onPressOut={_updateBtnPress} />}
            <IconButton id={el.id} completed={el.completed} type={images.del} onPressOut={deleteTask} />
        </List>
    );
};

Task.propTypes = {
    el : PropTypes.object.isRequired,
    deleteTask : PropTypes.func.isRequired,
    chkTask : PropTypes.func.isRequired,
    updateTask : PropTypes.func.isRequired,
};