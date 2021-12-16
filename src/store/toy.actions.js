import { toyService } from "../services/toy.service.js";

import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js'


export function loadToys() {
    return async (dispatch) => {
        try {
            const toys = await toyService.query()
            console.log('Loaded toys', toys)
            dispatch({
                type: 'SET_TOYS',
                toys
            })
        } catch (err) {
            console.error('Can not load toys', err)
        }
    }
}

export function onRemoveToy(toyId) {
    return async (dispatch) => {
        try {
            await toyService.removeToy(toyId)
            console.log('Toy deleted!');
            dispatch({
                type: 'REMOVE_TOY',
                toyId
            })
            showSuccessMsg('Toy deleted!')
            return toyId
        } catch (err) {
            console.log('Can not remove todo')
            showErrorMsg('Toy can not be deleted!')
        }
    }
}

export function onAddToy(toy) {
    return async (dispatch) => {
        try {
            const savedToy = await toyService.addToy(toy)
            console.log('Added Toy', savedToy)
            dispatch({
                type: 'ADD_TOY',
                toy: savedToy
            })
            showSuccessMsg('Toy added!')
        } catch (err) {
            console.log('Can not add toy', toy)
            showErrorMsg('Can not add toy');
        }
    }
}

export function onUpdateToy(toy, isReview) {
    return async (dispatch) => {
        try {
            const savedToy = await toyService.updateToy(toy, isReview)
            console.log('Updated toy', savedToy)
            dispatch({
                type: 'UPDATE_TOY',
                toy: savedToy
            })
            showSuccessMsg('Updated toy!')
        } catch (err) {
            console.log('Can not update toy', err)
            showErrorMsg('Can not update toy')
        }
    }
}

export function onSetFilter(filterBy) {
    return async (dispatch) => {
        try {
            const toys = await toyService.query(filterBy)
            dispatch({
                type: 'SET_TOYS',
                toys
            })
        } catch (err) {
            console.log('Can not filter toys', err)
        }
    }

}
