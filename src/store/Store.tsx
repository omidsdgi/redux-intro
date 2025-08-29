import {configureStore} from "@reduxjs/toolkit";
import accountReducer from "@/features/accounts/AccountSlice";
import customerReducer from "@/features/customers/CustomerSlice";


// const rootReducer = combineReducers({
//     account:accountReducer,
//     customer:customerReducer,
// })
//  const store =createStore(rootReducer, applyMiddleware(thunk));
const store =configureStore({
    reducer: {
        account: accountReducer,
        customer: customerReducer
    }
})
export default store;



