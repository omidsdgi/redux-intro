import {combineReducers, createStore} from "redux";
import {isNumberObject} from "node:util/types";
interface initialStateAccountType {
    balance: number,
    loan: number,
    loanPurpose: string,
}

interface Action {
    type: string;
    payload?: any;
}

const initialStateAccount: initialStateAccountType = {
    balance: 0,
    loan: 0,
    loanPurpose: "",
}
const initialStateCustomer={
    fullName:"",
    nationalID:"",
    createdAt:""
}

function accountReducer(state = initialStateAccount, action: Action) {
    switch (action.type) {
        case 'account/deposit':
            return {
                ...state,
                balance: state.balance + action.payload,
            }
        case 'account/withdraw':
            return {
                ...state,
                balance: state.balance - action.payload,
            }
        case 'account/requestLoan':
            if (state.loan > 0) return state;
            return {
                ...state,
                loan: action.payload.amount,
                loanPurpose: action.payload.purpose,
                balance: state.balance + action.payload.amount,
            }
        case 'account/payLoan':
            return {
                ...state,
                loan: action.payload,
                balance: state.balance - action.payload
            }
        default:
            return state;
    }
}
function customerReducer(state = initialStateCustomer, action: Action) {
    switch (action.type) {
        case 'customer/createCustomer':
            return {
                ...state,
                fullName: action.payload.fullName,
                nationalID: action.payload.nationalID,
                createdAt: action.payload.createdAt,
            }
            case 'customer/updateName':
                return {
                ...state,
                    fullName: action.payload,
                }
                default:
                    return state;
    }
}
const rootReducer = combineReducers({
    account:accountReducer,
    customer:customerReducer,
})
export const store =createStore(rootReducer);

function deposit(amount: number) {
    return { type: 'account/deposit', payload: amount }
}

function withdraw(amount: number) {
    return { type: 'account/withdraw', payload: amount }
}

function requestLoan(amount: number, loanPurpose: string) {
    return {
        type: 'account/requestLoan',
        payload: { amount, purpose: loanPurpose }
    }
}

function payLoan(amount: number) {
    return { type: 'account/payLoan',payload: amount }
}

store.dispatch(deposit(750));
console.log("After deposit:", store.getState());

store.dispatch(withdraw(200));
console.log("After withdraw:", store.getState());

store.dispatch(requestLoan(2000, "buy a home"));
console.log("After loan request:", store.getState());

store.dispatch(payLoan(150));

function createCustomer(fullName:string,nationalID:string,createdAt:string) {
    return {type:"customer/createCustomer", payload:{fullName,nationalID,createdAt:new Date().toISOString()}};
}
function updateName(fullName:string ) {
    return {type:"customer/updateName",payload:fullName}
}

store.dispatch(createCustomer("Mehraneh Asadi","13611201"))
console.log("After loan payment:", store.getState());
