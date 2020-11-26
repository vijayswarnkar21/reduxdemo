const redux = require('redux');
const createStore = redux.createStore;
const applyMiddleware = redux.applyMiddleware;

//it enable a action creator to return a functioninstead of an action object
const thunkMiddleWare = require('redux-thunk').default;
const axios = require('axios');

const intialState = {
    loading: false,
    users: [],
    error: ''
}

//action constants
const FETCH_USER_REQUEST = 'FETCH_USER_REQUEST';
const FETCH_USER_SUCCESS = 'FETCH_USER_SUCCESS';
const FETCH_USER_FAILURE = 'FETCH_USER_FAILURE';

//action creater
const fetchUserRequest = () => {
    return {
        type: FETCH_USER_REQUEST
    }
}

const fetchUserSuccess = (users) => {
    return {
        type: FETCH_USER_SUCCESS,
        payload: users
    }
}

const fetchUserFailuse = (error) => {
    return {
        type: FETCH_USER_FAILURE,
        payload: error
    }
}

const reducer = (state = intialState,action) => {
    switch(action.type){
        case FETCH_USER_REQUEST:
            return {
                ...state,
                loading: true
            }
        case FETCH_USER_SUCCESS:
            return {
                ...state,
                loading: false,
                users: action.payload,
                error: ''
            }
        case FETCH_USER_FAILURE:
            return {
                ...state,
                loading: false,
                users: [],
                error: action.payload

            }         
    }
}

//action creator
const fetchUser = () => {
    //this function does not have to be pure
    //it receive dispatch method as it's argument

    //and this function is used to perform side effect tasks like 
    //api calls
    return (dispatch) => {
        dispatch(fetchUserRequest());
        axios.get('https://jsonplaceholder.typicode.com/users')
        .then(response => {
            //response.data is the array of users
            const users = response.data.map(x=>x.id);
            dispatch(fetchUserSuccess(users))

        })
        .catch(error => {
            //error.message
            dispatch(fetchUserFailuse(error.message))
        })
    }
}

const store = createStore(reducer,applyMiddleware(thunkMiddleWare));
store.subscribe(() => {
    console.log(store.getState())
});

store.dispatch(fetchUser());


