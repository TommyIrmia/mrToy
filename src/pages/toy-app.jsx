import React from 'react'
import { connect } from 'react-redux'

import { loadToys, onRemoveToy, onUpdateToy, onAddToy } from '../store/toy.actions.js'

import { Loader } from '../cmps/loader.jsx'
import { ToysList } from '../cmps/toys-list.jsx'
import { AddToy } from '../cmps/toy-add.jsx'
import { ToyFilter } from '../cmps/toy-filter.jsx'


class _ToyApp extends React.Component {
    state = {
        isAdd: false,
    }

    componentDidMount() {
        this.props.loadToys()
    }

    onRemoveToy = (toyId) => {
        this.props.onRemoveToy(toyId)
    }

    onAddToy = (toy) => {
        if (!toy.name || !toy.price || !toy.labels.length) return
        toy.labels = toy.labels.map(label => label.label)
        this.props.onAddToy(toy)
        this.onToggleAdd()
    }

    onToggleAdd = () => {
        this.setState({ isAdd: !this.state.isAdd })
    }

    render() {
        const { toys, user } = this.props
        const { isAdd } = this.state
        if (!toys) return <Loader />
        return (
            <section className="toys-app">

                {user && user.isAdmin && isAdd && <AddToy onAddToy={this.onAddToy} onToggleAdd={this.onToggleAdd} />}

                {user && user.isAdmin && !isAdd && <button className="add-btn" onClick={this.onToggleAdd}>
                    Add Toy </button>}

                <ToyFilter />

                {toys?.length ? <ToysList toys={toys} user={user}
                    onRemoveToy={this.onRemoveToy} /> :
                    <div>No toys to show..</div>}

            </section >
        )
    }
}

function mapStateToProps(state) {
    return {
        toys: state.toyModule.toys,
        user: state.userModule.user
    }
}

const mapDispatchToProps = {
    loadToys,
    onRemoveToy,
    onAddToy,
    onUpdateToy,
}

export const ToyApp = connect(mapStateToProps, mapDispatchToProps)(_ToyApp)