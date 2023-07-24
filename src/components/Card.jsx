import React from 'react'

const Card = (props) => {
    return (
        <div className="card">
            <div className="card-content">
                <div className="flex items-center justify-between">
                    <div className="widget-label">
                        <h3>{props.title || 'Title'}</h3>
                        <h1>{props.value || '150'}</h1>
                    </div>
                    <span className={`icon widget-icon text-${props.color || 'green'}-500`}>
                        <i className={`mdi ${props.icon || 'mdi-account-multiple'} mdi-48px`}></i>
                    </span>
                </div>
            </div>
        </div>
    )
}

export default Card