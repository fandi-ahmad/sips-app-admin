import React from 'react'

export const Card = (props) => {
    return (
        <div className="card">
            <div className="card-content">
                <div className="flex items-center justify-between">
                    <div className="widget-label">
                        <h3 className='capitalize'>{props.title || 'Title'}</h3>
                        <h1>{props.value || '0'}</h1>
                    </div>
                    <span className={`icon widget-icon text-${props.color || 'green'}-500`}>
                        <i className={`fa-solid ${props.icon || 'fa-user'}`} style={{ fontSize: '50px' }}></i>
                    </span>
                </div>
            </div>
        </div>
    )
}

export const CardSurat = (props) => {
    return (
        <div className="card">
            <div className="card-content">
                <div className="flex items-center justify-center">
                    <div className="widget-label text-center">
                        <p className='capitalize mb-2'>{props.title || 'Title'}</p>
                        <h1>{props.value || '0'}</h1>
                    </div>
                </div>
            </div>
        </div>
    )
}