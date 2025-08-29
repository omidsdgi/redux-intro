import {Dispatch} from "react";

interface initialStateAccountType {
    balance: number,
    loan: number,
    loanPurpose: string,
    isLoading:boolean
}

interface Action {
    type: string;
    payload?: any;
}
const initialStateAccount: initialStateAccountType = {
    balance: 0,
    loan: 0,
    loanPurpose: "",
    isLoading:false
}
export default function accountReducer(state = initialStateAccount, action: Action) {
    switch (action.type) {
        case 'account/deposit':
            return {
                ...state,
                balance: state.balance + action.payload,
                isLoading:false
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
        case "account/convertingCurrency":
            return {
                ...state,
                isLoading:true,
            }
        default:
            return state;
    }
}

export function deposit(amount: number,currency) {
    if (currency === "USD")
        return { type: 'account/deposit', payload: amount }

    return async function (dispatch: Dispatch<Action>,getState) {
        dispatch({type:"account/convertingCurrency"})
        const res= await fetch(`https://api.frankfurter.app/latest?amount=${amount}&from=${currency}&to=USD`)
        const data = await res.json()
        const converted=data.rates.USD
        dispatch({type: 'account/deposit', payload:converted})
    }
}

export function withdraw(amount: number) {
    return { type: 'account/withdraw', payload: amount }
}

export function requestLoan(amount: number, loanPurpose: string) {
    return {
        type: 'account/requestLoan',
        payload: { amount, purpose: loanPurpose }
    }
}

export function payLoan(amount: number) {
    return { type: 'account/payLoan',payload: amount }
}