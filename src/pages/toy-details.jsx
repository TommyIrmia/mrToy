import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import { onRemoveToy, onUpdateToy } from "../store/toy.actions.js"

import { Loader } from "../cmps/loader.jsx"
import { toyService } from "../services/toy.service.js"
import { ReviewList } from '../cmps/review-list.jsx'
import toys from '../assets/img/toys.png'
import { ReviewAdd } from '../cmps/review-add.jsx'

class _ToyDetails extends React.Component {

    state = {
        toy: null,
    }

    componentDidMount() {
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

    onRemoveToy = async (toyId) => {
        try {
            await this.props.onRemoveToy(toyId)
            this.props.history.push('/toy')
        } catch (err) {
            throw err
        }
    }

    onUpdateToy = async (toy) => {
        try {
            await this.props.onUpdateToy(toy, true)
        } catch (err) {
            throw err
        }
    }

    render() {
        const { toy } = this.state
        const { user } = this.props
        if (!toy) return <Loader />
        return (
            <section className="details-container">
                <div className="toy-details">
                    <h2>Name : {toy.name} </h2>

                    <h3>Price : ${toy.price}</h3>
                    <h3>Available : <span className={toy.inStock ? 'green' : 'red'}>
                        {(toy.inStock) ? "Yes!" : "Soon..."}
                    </span></h3>
                    <h3>Categories : {toy.labels.join(' | ')}</h3>

                    <div className="details-btns">

                        {user && user.isAdmin && <Link to={`/toy/edit/${toy._id}`}><button className="btn edit-btn">
                            <span className="fas fa-edit" ></span>
                        </button>
                        </Link>}

                        {user && user.isAdmin && <button className="btn remove-btn" alt="Return to list"
                            onClick={() => {
                                this.onRemoveToy(toy._id)
                            }}><span className="fas fa-trash" ></span>
                        </button>}

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

                <div className="reviews-container">
                    <ReviewAdd toy={toy} onUpdateToy={this.onUpdateToy} user={user} />
                    <ReviewList reviews={toy.reviews} />
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

export const ToyDetails = connect(mapStateToProps, mapDispatchToProps)(_ToyDetails)