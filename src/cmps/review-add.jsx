import React from 'react'
import { toyService } from '../services/toy.service.js'
import { StarsRating } from './stars-rating.jsx';

export class ReviewAdd extends React.Component {

    state = {
        isAdd: false,
        review: {
            name: '',
            rate: 1,
            readAt: new Date().toISOString().split('T')[0],
            txt: '',
        }
    }

    componentDidMount() {
        if (this.props.user) {
            this.setState((prevState) => ({ review: { ...prevState.review, name: this.props.user.fullname } }))
        }
    }

    handleChange = (ev) => {
        const field = ev.target.name;
        const value = ev.target.type === 'number' ? +ev.target.value : ev.target.value;
        this.setState((prevState) => ({ review: { ...prevState.review, [field]: value } }));
    };

    saveReview = (ev) => {
        ev.preventDefault();
        const reviewToAdd = this.state.review
        const toy = this.props.toy
        const toyToAdd = toyService.addReview(toy, reviewToAdd)

        this.props.onUpdateToy(toyToAdd)
        this.onToggleAddReview();
    }

    onSaveRate = (rate) => {
        this.setState((prevState) => ({ review: { ...prevState.review, rate } }));
    }

    onToggleAddReview = () => {
        if (this.props.user) {
            this.setState({ isAdd: !this.state.isAdd, review: { name: this.props.user.fullname, rate: 1, readAt: new Date().toISOString().split('T')[0], txt: '' } })
        }
    }

    render() {
        const { name, rate, readAt, txt } = this.state.review
        const { user } = this.props
        const { isAdd } = this.state
        return (
            <section className="review-add">
                {!isAdd && <React.Fragment>
                    <h1> Add a new review : </h1>
                    {user && <div className="add-btn" onClick={this.onToggleAddReview}> + </div>}
                    {!user && <div>Please log in to add a review </div>}
                </React.Fragment>}
                {isAdd && <React.Fragment>
                    <button className="form-btn" onClick={this.onToggleAddReview} >Back</button>
                    <form >
                        <label htmlFor="name">Full Name : </label>
                        <input type="text" name="name" id="name" placeholder="Enter Full Name" value={name} onChange={this.handleChange} />

                        <label>Rate this book :</label>
                        <StarsRating rate={rate} onSaveRate={this.onSaveRate} />

                        <label htmlFor="read-at">Read at :</label>
                        <input type="date" name="read-at" id="read-at" value={readAt} onChange={this.handleChange} />

                        <label htmlFor="txt">Your Review : </label>
                        <textarea name="txt" id="txt" placeholder="Enter your review here" value={txt} onChange={this.handleChange} />

                        <button className="form-btn" onClick={(event) => this.saveReview(event)}>Add Review</button>
                    </form>
                </React.Fragment>}
            </section>
        )
    }
}