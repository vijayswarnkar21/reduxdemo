const redux = require('redux');
const createStore = redux.createStore;

const BUY_CAKE = 'BUY_CAKE';
const BUY_ICECREAM = 'BUY_ICECREAM';

//Here this function is called action creater as it is returning an action
//action is a object with a propery named as 'type'

//we use action creater function instead of passing object itself
//to keep passing object at one place so if it chnages in future 
//it will be easy to chnage at single place
//it is good to be safe that to be sorry
const buyCake = () => {
    return {
        type:BUY_CAKE,
        info: "First Redux Action"
    } 
}

const buyIceCream = () => {
    return {
        type:BUY_ICECREAM,
        info: "First Redux Action"
    } 
}

//reducer
//(previousState,action) => newState

const intialState = {
    numOfCakes : 10,
    numOfIceCream: 20
}

//Here we don mutate the state object we return new object

//in the long run when we have multiple product to sell 
//this function will become one huge function
//difficult to maintain and debug
const reducer = (state = intialState, action) => {
    switch(action.type){
        case BUY_CAKE : return {
            //it is safe to first create the copy of state object and 
            //then change only the properties that need to be changed
            ...state,    
            numOfCakes : state.numOfCakes -1
        }

        case BUY_ICECREAM : return {
            //it is safe to first create the copy of state object and 
            //then change only the properties that need to be changed
            ...state,    
            numOfIceCream : state.numOfIceCream -1
        }

        default : return state
    }
}

//at the time of inaugrating shop we assign a shopkeeper(reducer) to the shop 
//who can tell us what are all the customer who visited the shop 
//and how no. of cakes that intial state changed to current no. of cakes that is
//current state
const store = createStore(reducer);
console.log("Intial state : ",store.getState());

//subscribers are like stakeholders of the store to whom
//all the chnages that take place in store in terms of state
//need to be notify

//store.subscribe accepts a function where a particular stake holder specify what he
//wanna do with updated application state
const unSubscribe = store.subscribe(() => console.log("Updated State: ",store.getState()));

//customer 1
store.dispatch(buyCake());
//customer 2
store.dispatch(buyCake());
//customer 3
store.dispatch(buyCake());
store.dispatch(buyIceCream());
store.dispatch(buyIceCream());


unSubscribe();