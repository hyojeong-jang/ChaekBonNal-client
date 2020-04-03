import * as types from '../constants/index'

export const receiveUserData = (userData) => ({
    type: types.RECEIVE_USER_DATA,
    userData
});

