import React from 'react';
import styled from 'styled-components/native';
import PropTypes from 'prop-types';

const Input = styled.TextInput.attrs(({theme})=>({
    placeholderTextColor : theme.placeholder,
}))`
    height:60px; margin:10px 0 0 0; padding:0 20px;
    background:${({theme})=>theme.itemBg}; border-radius:15px;
    font-size:18px; color:${({theme})=>theme.text}
    border:1px solid #666;
`;

export const TaskInput = ({placeholder, value, onChangeText, onSubmitEditing, onBlur}) => {
    return (
        <Input
            placeholder={placeholder}
            value={value}
            maxLength={50}
            autoCapitalize='none'
            autoCorrect={false}
            returnKeytype='done'
            keyboardAppearance='dark'
            onChangeText={onChangeText}
            onSubmitEditing={onSubmitEditing}
            onBlur={onBlur}
        />
    );
};

TaskInput.defaultProps = {
    onChange : () => {},
    onChangeText : () => {},
    onSubmitEditing : () => {},
};

TaskInput.proptypes = {
    placeholder : PropTypes.string,
    value : PropTypes.string,
    onChangeText : PropTypes.func.isRequired,
    onSubmitEditing : PropTypes.func.isRequired,
    onBlur : PropTypes.func.isRequired,
};