export const getId = (id) => {
    return document.getElementById(id)
}

export const setConst = (key, value) => {
    return localStorage.setItem(key, value)
}

export const getConst = (key, value) => {
    return localStorage.getItem(key, value)
}
