const DEFAULT_STATE = {
  currentRooms: []
}

const RoomList = (state = DEFAULT_STATE, action) => {
  switch(action.type){
    case 'UPDATE_ROOMS_LIST':
      return {...state, currentRooms: action.currentRooms}
    default:
      return state
  }

}

export default RoomList;