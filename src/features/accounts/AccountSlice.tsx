import { createSlice} from "@reduxjs/toolkit";


const initialState = {
    balance: 0,
    loan: 0,
    loanPurpose: "",
    isLoading:false
}

const accountSlice = createSlice({
    name:"account",
    initialState,
    reducers:{
        deposit(state, action){
            state.balance += action.payload;
            state.isLoading=false;
        },
        withdraw(state, action){
            state.balance -= action.payload;
        },
        requestLoan:{
            prepare(amount,purpose){
                return {
                    payload: {amount,purpose}
                }
            },
            reducer (state, action){
            if (state.loan>0) return;
           state.loan=action.payload.amount;
           state.loanPurpose = action.payload;
           state.balance += action.payload;
        }},
        payLoan(state){
            state.balance -= state.loan;
            state.loan=0;
            state.loanPurpose = "";
        },
        convertingCurrency(state){
          state.isLoading=true;
        }
    }
})
console.log(accountSlice)
export const {withdraw,requestLoan,payLoan}=accountSlice.actions;

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

export default accountSlice.reducer;


/*interface Action {
    type: string;
    payload?: any;
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
}*/