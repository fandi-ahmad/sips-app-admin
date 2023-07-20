import React from 'react'

const TitleBar = (props) => {
  return (
    <section className="is-title-bar">
      <div className="flex flex-col md:flex-row items-center justify-between space-y-6 md:space-y-0">
        <ul>
          <li className='capitalize'>{props.title}</li>
        </ul>

        <button className={`button blue --jb-modal ${props.btnStyle}`} data-target="create-modal" type="button">
          <span className="icon"><i className="mdi mdi-plus"></i></span>
          <span>{props.btnText || 'Create New'}</span>
        </button>
      </div>
    </section>
  )
}

export default TitleBar