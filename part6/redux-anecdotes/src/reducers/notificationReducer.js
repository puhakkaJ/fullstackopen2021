const initialState = {
    text: 'You can vote exciting anectodes or add new ones',
    IDt: null
}

const notificationReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'NEW_NOTIFICATION':
        clearTimeout(state.IDt)
        return action.data
      default:
        return state
    }
  }
  
  export const setNotification = (text, time) => {
    return async dispatch => {
      const IDt = setTimeout(() => {
        dispatch({
          type: 'NEW_NOTIFICATION',
          data: {
            text: '',
            IDt: IDt
          },
        })
      }, time * 1000)

      dispatch({
        type: 'NEW_NOTIFICATION',
        data: {
          text: text,
          IDt: IDt
        }
      })
    }
  }
  
  export default notificationReducer