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
export default function accountReducer(state = initialStateAccount, action: Action) {
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

export function deposit(amount: number) {
    return { type: 'account/deposit', payload: amount }
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