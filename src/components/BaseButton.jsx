import React from 'react'

export const BasicButton = (props) => {
    return (
        <button onClick={props.onClick} className={`button ${props.className || 'blue'}`} id={props.id} type={props.type}>
            <span>{props.title}</span>
            <span className={`icon ${props.iconShow || 'hidden'}`}>
                <i className={`mdi ${props.icon || 'mdi-plus-thick'}`}></i>
            </span>
        </button>
    )
}
