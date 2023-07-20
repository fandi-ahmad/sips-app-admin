import React from 'react'

const TitleBar = (props) => {
    return (
        <section className="is-title-bar">
            <div className="flex flex-col md:flex-row items-center justify-between space-y-6 md:space-y-0">
                <ul>
                    <li>{props.titleApp || 'Admin'}</li>
                    <li>{props.title || 'Title'}</li>
                </ul>
                {props.button}
            </div>
        </section>
    )
}

export default TitleBar