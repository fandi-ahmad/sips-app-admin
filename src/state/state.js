import { createGlobalState } from 'react-hooks-global-state'

const initialState = {
    count: 0,
    text: 'ini pesan text',
    userActive: null
  };
const { useGlobalState } = createGlobalState(initialState);

export { useGlobalState }