import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
    loading: false,
    dataProcessing: false,
    error: '',
    dataProcessingError: '',
    transformers: null,
    battleProcessing: false,
    battleResult: ''
}

function setUpdatedTransformer(transformers, transformer) {
    if (transformers === null) //Never will be
        transformers = [];
    return transformers.map(theTransformer => theTransformer.id === transformer.id ? transformer : theTransformer);
}

function removeItem(transformers, id) {
    if (transformers === null) //Never will be
        transformers = [];
    return transformers.filter(transformer => transformer.id !== id);
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.TRANSFORMERS_LOADING:
            return updateObject(state, {
                loading: true,
                dataProcessing: false,
                error: '',
                dataProcessingError: '',
                transformers: null,
                battleProcessing: false,
                battleResult: ''
            });
        case actionTypes.FETCH_TRANSFORMERS_FAILED:
            return updateObject(state, {
                loading: false,
                dataProcessing: false,
                error: action.payload,
                dataProcessingError: '',
                transformers: null,
                battleProcessing: false,
                battleResult: ''
            });
        case actionTypes.SET_TRANSFORMERS:
            return updateObject(state, {
                loading: false,
                dataProcessing: false,
                error: '',
                dataProcessingError: '',
                transformers: action.payload,
                battleProcessing: false,
                battleResult: ''
            });

        case actionTypes.DATA_PROCESSING:
            return updateObject(state, {
                dataProcessing: true,
                dataProcessingError: '',
                battleProcessing: false,
                battleResult: ''
            });
        case actionTypes.DATA_PROCESS_FAILED:
            return updateObject(state, {
                dataProcessing: false,
                dataProcessingError: action.payload,
                battleProcessing: false,
                battleResult: ''
            });
        case actionTypes.SET_UPDATEDITEM:
            return updateObject(state, {
                dataProcessing: false,
                dataProcessingError: '',
                transformers: setUpdatedTransformer(state.transformers, action.payload),
                battleProcessing: false,
                battleResult: ''
            });
        case actionTypes.SET_REMOVEITEM:
            return updateObject(state, {
                dataProcessing: false,
                dataProcessingError: '',
                transformers: removeItem(state.transformers, action.payload),
                battleProcessing: false,
                battleResult: ''
            });
        case actionTypes.ADD_NEWITEM:
            return updateObject(state, {
                dataProcessing: false,
                dataProcessingError: '',
                transformers: state.transformers.concat([action.payload]),
                battleProcessing: false,
                battleResult: ''
            });

        case actionTypes.SET_BATTLEPROCESSING:
            return updateObject(state, {
                dataProcessing: false,
                dataProcessingError: '',
                battleProcessing: true,
                battleResult: ''
            });
        case actionTypes.SET_BATTLERESULT:
            return updateObject(state, {
                dataProcessing: false,
                dataProcessingError: '',
                battleProcessing: false,
                battleResult: action.payload
            });

        default:
            return state;
    }
}

export default reducer;
