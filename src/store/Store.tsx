import {createStore} from "redux";
interface initialStateType {
    balance:number,
    loan:number,
    loanPurpose:string,
}

const initialState:initialStateType = {
    balance:0,
    loan:0,
    loanPurpose:"",
}

function reducer(state = initialState, action) {
    switch (action.type) {
        case 'account/deposit':
            return {
                ...state,
                balance:state.balance + action.payload,
            }
            case 'account/withdraw':
                return {
                    ...state,
                    balance:state.balance - action.payload,
                }
                case 'account/requestLoan':
                    if (state.loan>0) return state;
                    return {
                        ...state,
                        loan: action.payload.amount,
                        loanPurpose:action.payload.purpose,
                        balance:state.balance + action.payload.amount,
                    }
                    case 'account/payLoan':
                        return {
                            ...state,
                            loan: 0,
                            loanPurpose:"",
                            balance:state.balance - state.loan,
                        }
                        default:
                            return state;
    }
}
export const store=createStore(reducer);

store.dispatch({type:'account/deposit',payload:500});
store.dispatch({type:'account/withdraw',payload:200});
store.dispatch({type:'account/requestLoan',payload: {amount:1000,purpose:"buy a car"} });
store.dispatch({type:'account/payLoan',payload:1000});
console.log(store.getState());