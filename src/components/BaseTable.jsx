import React from 'react'

export const TableHeader = (props) => {
  return (
    <header className="card-header">
      <p className="card-header-title capitalize">
        <span className="icon"><i className={`fa-regular ${props.icon || 'fa-file-lines'}`}></i></span>
        {props.title}
      </p>
      {props.children}
      <a className="card-header-icon cursor-pointer" onClick={() => window.location.reload()}>
        <span className="icon text-black"><i className="fa-solid fa-rotate-right"></i></span>
      </a>
    </header>
  )
}

export const TablePaginate = (props) => {
  return (
    <div className="table-pagination">
      <div className="flex items-center justify-between">
        {props.children}
      </div>
    </div>
  )
}
