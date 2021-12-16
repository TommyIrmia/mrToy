import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import { onRemoveToy, onUpdateToy } from "../store/toy.actions.js"

import { Loader } from "../cmps/loader.jsx"
import { toyService } from "../services/toy.service.js"
import toys from '../assets/img/toys.png'

class _ToyEdit extends React.Component {

    state = {
        toy: null,
    }

    componentDidMount() {
        const { user } = this.props
        if (!user || !user.isAdmin) return this.props.history.push('/toy')
        this.loadToy()
    }

    loadToy = async () => {
        try {
            const toyId = this.props.match.params.toyId;
            const toy = await toyService.getToyById(toyId)
            if (!toy) return this.props.history.push('/toy')
            this.setState({ toy })
        } catch (err) {
            throw err
        }
    }

    handleChange = (ev) => {
        const value = (Number.isInteger(ev.target.value)) ? +ev.target.value : ev.target.value;
        const field = ev.target.name;
        this.setState((prevState) => ({ ...prevState, toy: { ...prevState.toy, [field]: value } }))
    }

    onUpdateToy = async (toy) => {
        try {
            await this.props.onUpdateToy(toy)
            this.props.history.push('/toy')
        } catch (err) {
            throw err
        }
    }

    onRemoveToy = async (toyId) => {
        try {
            await this.props.onRemoveToy(toyId)
            this.props.history.push('/toy')
        } catch (err) {
            throw err
        }
    }

    render() {
        const { toy } = this.state
        if (!toy) return <Loader />
        return (
            <section className="details-container edit-container">
                <div className="toy-details toy-edit">
                    <h2>Name :
                        <input type="text" name="name" value={toy.name} onChange={this.handleChange} />
                    </h2>

                    <h3>Price : $
                        <input type="number" name="price" value={toy.price} onChange={this.handleChange} />
                    </h3>

                    <h3>Available :
                        <select name="inStock" value={toy.inStock ? true : ''} onChange={this.handleChange}>
                            <option value={true}>Yes!</option>
                            <option value=''>Soon...</option>
                        </select>
                    </h3>
                    <h3>Categories : {toy.labels.join(' | ')} </h3>

                    <button className="save-btn" onClick={() => { this.onUpdateToy(toy) }}>
                        <span className="fas fa-save"></span></button>

                    <div className="details-btns">
                        <Link to={`/toy/${toy._id}`}><button className="btn edit-btn">
                            <span className="fas fa-info-circle" ></span>
                        </button>
                        </Link>

                        <button className="btn remove-btn" alt="Return to list"
                            onClick={() => {
                                this.onRemoveToy(toy._id)
                            }}><span className="fas fa-trash" ></span>
                        </button>

                        <button className="btn back-btn"
                            onClick={() => {
                                this.props.history.push('/toy')
                            }}><span className="fas fa-th-large" ></span>
                        </button>
                    </div>

                    <div className="img-container">
                        <img src={toys} alt="toys" />
                    </div>
                </div>

            </section>
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
    onRemoveToy,
    onUpdateToy
}

export const ToyEdit = connect(mapStateToProps, mapDispatchToProps)(_ToyEdit)