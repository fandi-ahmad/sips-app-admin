import React from 'react'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'

export const SearchInput = (props) => {
    return (
        <div className="flex justify-center flex-1 lg:mr-32">
            <div className="relative w-80 max-w-xl mr-6">
                <div className="absolute  flex items-center pl-2">
                    <i className="fa-solid fa-magnifying-glass"></i>
                </div>
                <input 
                    className='block w-full mt-1 text-sm bg-transparent p-2 pl-7 border border-gray-600 rounded-md form-input'

                    // className="w-full pl-8 pr-2 text-sm text-gray-700 placeholder-gray-600 bg-gray-100 border-0 rounded-md  focus:placeholder-gray-500 focus:bg-white focus:border-purple-300 focus:outline-none focus:shadow-outline-purple form-input"
                    type="search" placeholder="Search here" aria-label="Search" name={props.name} onChange={props.onChange} onKeyUp={props.onKeyUp} 
                />
            </div>
        </div>
    )
}

export const SelectInput = (props) => {
    return (
        <label className={`block text-sm ${props.className}`} id={props.id}>
            <span className={`text-gray-700 capitalize ${props.classLabel}`}>{props.label || props.name}</span>
            <select value={props.value} name={props.name} onChange={props.onChange} onClick={props.onClick}
                className='block w-full mt-1 text-sm bg-transparent p-2 border border-gray-600 rounded-md form-input'
            >
                <option disabled value="">{props.placeholder}</option>
                {props.children}
            </select>
        </label>
    )
}

export const BaseInput = (props) => {
    return (
        <label className={`block text-sm ${props.className}`} id={props.id}>
            <span className={`text-gray-700 capitalize ${props.classLabel}`}>{props.label || props.name}</span>
            <input type={props.type || 'text'} value={props.value} onChange={props.onChange} name={props.name} placeholder={props.placeholder || 'Type here'}
                disabled={props.disabled} onKeyUp={props.onKeyUp} autoComplete={props.autoComplete}
                className='block w-full mt-1 text-sm bg-transparent p-2 border border-gray-600 rounded-md form-input disabled:bg-slate-300'
            />
        </label>
    )
}

export const InputIcon = (props) => {
    return (
        <label className={`block text-sm ${props.className}`} id={props.id}>
            <span className={`text-gray-700 capitalize ${props.classLabel}`}>{props.name}</span>
            <div className="relative text-gray-500">
                <div className="absolute inset-y-0 flex items-center ml-3 pointer-events-none">{props.icon}</div>
                <input type={props.type || 'text'} value={props.value} onChange={props.onChange} name={props.name} placeholder={props.placeholder || 'Type here'} onKeyUp={props.onKeyUp}
                    className='block w-full mt-1 pl-8 text-sm bg-transparent p-2 border border-gray-600 rounded-md form-input disabled:bg-slate-300' autoComplete='off'
                />
            </div>
        </label>
    )
}

export const InputFile = (props) => {
    return (
        <label className={`block text-sm ${props.className}`}>
            <span className="text-gray-700 capitalize">{props.name}</span>
            <input type="file" onChange={props.onChange} name={props.name} id={props.id} accept={props.accpet} placeholder={props.placeholder || 'Select file'}
                className="block w-full mt-1 text-sm focus:border-blue-400 focus:shadow-outline-gray form-input" />
        </label>
    )
}

export const InputCheck = (props) => {
    return (
        <label className={`block text-sm ${props.className}`}>
            <span className="text-gray-700 capitalize">{props.label || props.name}</span>
            <input checked={props.checked} onChange={props.onChange} name={props.name} id={props.id} type="checkbox" className={`toggle toggle-success form-control ${props.className}`} />
        </label>
    )
}

export const InputTextArea = (props) => {
    return (
        <label className={`block text-sm ${props.className}`}>
            <span className="text-gray-700 capitalize">{props.title || props.name}</span>
            <textarea value={props.value} onChange={props.onChange} name={props.name} placeholder={props.placeholder || 'Type here'}
                className="block w-full mt-1 text-sm bg-gray-200 p-2 form-textarea focus:border-blue-400 focus:shadow-outline-gray rounded-md resize-none"
                rows={props.rows || '8'}
            ></textarea>
        </label>
    )
}
