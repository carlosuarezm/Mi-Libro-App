import { SET_USER_AUTHENTICATED, DELETE_USER_AUTHENTICATED } from "../types";

export default (state, action) => {
    const { payload, type } = action

    switch (type) {
        case SET_USER_AUTHENTICATED:
            return payload

        case DELETE_USER_AUTHENTICATED:
            return { payload }

        default:
            return state;
    }
}