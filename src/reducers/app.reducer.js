import {AppActionTypes} from "../actions/app.actions"


export const initialState = {
  loaded:false,
  tax: 0,
  prefixDic: {}
}

export default function (state = initialState, action) {
  switch (action.type) {
    case AppActionTypes.GET_APPLICATION_DATA_REQUESTED:{
      return {
        ...state,
        loaded: false
      }
    }
    case AppActionTypes.GET_APPLICATION_DATA_RESPONSE: {
      const {applicationData} = action.payload
      return {
        ...state,
        ...applicationData,
        loaded: true
      }
    }
  }

  return state
}
