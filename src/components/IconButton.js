import React from 'react';
import {Pressable} from 'react-native';
import styled from 'styled-components/native';
import PropTypes from 'prop-types';

import {images} from '../Images';

const Icon = styled.Image`
    tint-color:${({theme, completed})=>completed ? theme.done : theme.text}; width:24px; height:24px; margin:0 5px;
`;

export const IconButton = ({id, type, onPressOut, completed}) => {
    return (
        <Pressable onPressOut={()=>onPressOut(id)}>
            <Icon source={type} completed={completed} />
        </Pressable>
    );
};

IconButton.defaultProps = {
    onPressOut : ()=>{},
};

IconButton.propTypes = {
    onPressOut : PropTypes.func,
    type : PropTypes.oneOf(Object.values(images)).isRequired,
    id : PropTypes.string,
    completed : PropTypes.bool,
};