const dummyUser = {
    nickname: '제로초',
    Post: [],
    Followings: [],
    Followers: [],
};

export const initialState = {
    isLoggedIn: false,
    user: null,
    signUpData: {},
    loginData: {},
};

//ACTIONS
export const SIGN_UP = 'SIGN_UP';
export const SIGN_UP_SUCCESS = 'SIGN_UP_SUCCESS';
export const LOG_IN = 'LOG_IN'; // 액션의 이름
export const LOG_IN_SUCCESS = 'LOG_IN_SUCCESS'; // 액션의 이름
export const LOG_IN_FAILURE = 'LOG_IN_FAILURE'; // 액션의 이름
export const LOG_OUT = 'LOG_OUT';


export const signUpAction = (data) => {
    return {
        type: SIGN_UP,
        data,
    };
};

export const signUpSuccess = {
    type: SIGN_UP_SUCCESS,
};

export const loginAction = (data) => {
    
    return {
        type: LOG_IN,
        data,
    }
};

export const logoutAction = {
    type: LOG_OUT,
};

export const signUp = (data) => {

    return {
        type: SIGN_UP,
        data,
    }

};

//REDUCER
export default (state = initialState, action) => {
    switch (action.type) {
        case LOG_IN: {
            return {
                ...state,
                isLoggedIn: true,
                user: dummyUser,
                loginData: action.data,
            };
        }
        case LOG_OUT: {
            return {
                ...state,
                isLoggedIn: false,
                user: null,
            };
        }
        case SIGN_UP: {
            return {
                ...state,
                signUpData: action.data,
            };
        }
        default: {
            return {
                ...state,
            }
        } //오타, 아무 것도 안할 때 (로깅 그냥 해보거나 이럴때 ) 실행된다.
        //리덕스 원칙 상 '불변성'을 지켜주는게 그래서 좋다.
    }
};