const initialStateCustomer={
    fullName:"",
    nationalID:"",
    createdAt:""
}
interface Action {
    type: string;
    payload?: any;
}

export default function customerReducer(state = initialStateCustomer, action: Action) {
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
export function createCustomer(fullName:string,nationalID:string,createdAt:string) {
    return {type:"customer/createCustomer", payload:{fullName,nationalID,createdAt:new Date().toISOString()}};
}
export function updateName(fullName:string ) {
    return {type:"customer/updateName",payload:fullName}
}
