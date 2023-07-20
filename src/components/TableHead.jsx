import React from 'react'

const TableHead = (props) => {
  return (
    <header className="card-header text-gray-800">
      <p className="card-header-title capitalize">
        <span className="icon"><i className="mdi mdi-account-multiple"></i></span>
        {props.title}
      </p>
      <a className="card-header-icon cursor-pointer" onClick={() => location.reload()}>
        <span className="icon"><i className="mdi mdi-reload"></i></span>
      </a>
    </header>
  )
}

export default TableHead