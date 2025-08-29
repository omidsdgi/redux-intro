import {applyMiddleware, combineReducers, createStore} from "redux";
import accountReducer from "@/features/accounts/AccountSlice";
import customerReducer from "@/features/customers/CustomerSlice";
import {thunk} from "redux-thunk";



const rootReducer = combineReducers({
    account:accountReducer,
    customer:customerReducer,
})
 const store =createStore(rootReducer,applyMiddleware(thunk));

export default store;



