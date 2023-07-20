import React from 'react'

// open loading modal
export const openModal = (id) => {
    const modalToggle = document.getElementById(id)
    modalToggle.checked = true
}

// close loading modal
export const closeModal = (id) => {
    const modalToggle = document.getElementById(id)
    modalToggle.checked = false
}

export const BaseModal = (props) => {
    return (
        <>
            <input type="checkbox" id={props.id} className="modal-toggle" />
            <div className="modal">
                <div className={`${props.classSize || 'w-96'} modal-box max-w-5xl bg-white text-gray-700`} style={{width: props.width}}>
                    <h3 className="font-bold text-2xl capitalize mb-4">{props.title}</h3>
                    {props.children}
                </div>
            </div>
        </>
    )
}

export const ModalLoading = (props) => {
    return (
        <>
            <input type="checkbox" id={props.id} className="modal-toggle" />
            <label htmlFor={props.id} className="modal">
                <label className="modal-box relative bg-white text-gray-700 flex justify-center w-96">
                    <div className='text-center'>
                        <h1 className='text-3xl capitalize font-semibold w-full text-center mb-2'>please wait</h1>
                        <p className='w-full text-center mb-8 capitalize'>{props.title || 'executing'}</p>
                        <div className='w-full flex justify-center'>
                            {/* <div className='loader'></div> */}
                            <span className="loading loading-spinner loading-lg"></span>
                        </div>
                    </div>
                </label>
            </label>
        </>
    )
}

