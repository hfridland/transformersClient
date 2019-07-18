import axios from 'axios';

import * as actionTypes from './actionTypes';
//import makeCorsRequest from '../../corsRequester';

const instance = axios.create({
    baseURL: 'http://192.168.1.109:8080/'//May be need to change
});


export const setTransformersLoading = () => {
    return {
        type: actionTypes.TRANSFORMERS_LOADING
    };
}

export const setTransformers = (transformers) => {
    return {
        type: actionTypes.SET_TRANSFORMERS,
        payload: transformers
    };
};

export const fetchTransformersFailed = (error) => {
    return {
        type: actionTypes.FETCH_TRANSFORMERS_FAILED,
        payload: "" + error
    };
};


export const loadTransformers = () => {
    return dispatch => {
        dispatch(setTransformersLoading());
        instance.get('bots/')
            .then(response => {
                dispatch(setTransformers(response.data));
            })
            .catch(error => {
                dispatch(fetchTransformersFailed(error.message));
            });
    };
}

//************************************************************************************

export const setDataProcessing = () => {
    return {
        type: actionTypes.DATA_PROCESSING
    };
}

export const dataProcessFailed = (error) => {
    return {
        type: actionTypes.DATA_PROCESS_FAILED,
        payload: "" + error
    };
};

export const setUpdatedItem = (transformer) => {
    return {
        type: actionTypes.SET_UPDATEDITEM,
        payload: transformer
    };
};

export const addNewItem = (transformer) => {
    return {
        type: actionTypes.ADD_NEWITEM,
        payload: transformer
    };
}

export const saveTransformer = (transformer) => {
    return dispatch => {
        dispatch(setDataProcessing());
        instance.put('bots/update/' + transformer.id, transformer)
            .then(response => {
                dispatch(setUpdatedItem(response.data));
            })
            .catch(error => {
                dispatch(fetchTransformersFailed(error.message));
            });
    }
}

export const saveNewTransformer = (transformer) => {
    return dispatch => {
        dispatch(setDataProcessing());
        const newTrans = {};
        for (let prop in transformer) {
            if (prop !== 'id')
                newTrans[prop] = transformer[prop];
        }

        instance.post('bots/create', newTrans)
            .then(response => {
                dispatch(addNewItem(response.data));
            })
            .catch(error => {
                dispatch(fetchTransformersFailed(error.message));
            });
    }
}

export const removeItem = (id) => {
    return {
        type: actionTypes.SET_REMOVEITEM,
        payload: id
    };
}

export const deleteTransformer = (transformer) => {
    return dispatch => {
        const id = transformer.id;
        dispatch(setDataProcessing());
        instance.delete('bots/delete/' + transformer.id)
            .then(response => {
                if (response.status === 204) {
                    dispatch(removeItem(id));
                } else {
                    dispatch(dataProcessFailed('Network Error'));
                }
            })
            .catch(error => {
                dispatch(fetchTransformersFailed(error.message));
            });
    }
}

//*****************************************************************************

export const setBattleProcessing = () => {
    return {
        type: actionTypes.SET_BATTLEPROCESSING
    };
}

export const setBattleResult = (battleResult) => {
    return {
        type: actionTypes.SET_BATTLERESULT,
        payload: battleResult
    };
}

export const battle = (transformers) => {
    return dispatch => {
        dispatch(setBattleProcessing());
        instance.post('bots/detertmine-winner', transformers)
            .then(response => {
                dispatch(setBattleResult(response.data.presentation));
            })
            .catch(error => {
                dispatch(fetchTransformersFailed(error.message));
            });
    }
}