import React from 'react';
import Select from 'react-select';

import { toyService } from '../services/toy.service.js';

export class AddToy extends React.Component {
    state = {
        toy: {
            name: '',
            price: '',
            labels: [],
        },
        options: [],

    }

    componentDidMount() {
        this.loadLabels()
    }

    loadLabels() {
        const labels = toyService.getlabels();
        const options = labels.map(label => {
            return { value: label.toLowerCase(), label }
        })
        this.setState((prevState) => ({ ...prevState, options }))
    }

    handleChange = (ev) => {
        const value = (Number.isInteger(ev.target.value)) ? +ev.target.value : ev.target.value;
        const field = ev.target.name;
        this.setState((prevState) => ({ ...prevState, toy: { ...prevState.toy, [field]: value } }))
    }

    handleSelectChange = (ev) => {
        const value = ev;
        if (value.length > 3) return;
        this.setState((prevState) => ({ ...prevState, toy: { ...prevState.toy, labels: value } }))
    }

    render() {
        const { toy, options } = this.state
        const { onAddToy, onToggleAdd } = this.props
        return (
            <div className="add-toy">
                <form>
                    <label htmlFor="name">
                        <input type="text" name="name"
                            placeholder="Enter toy name " id="name"
                            value={toy.name} onChange={this.handleChange} />
                    </label>

                    <label htmlFor="price">
                        <input type="number" name="price"
                            placeholder="Enter toy price" id="price"
                            value={toy.price} onChange={this.handleChange} />
                    </label>

                    <Select
                        className="select"
                        value={toy.labels}
                        isMulti
                        onChange={this.handleSelectChange}
                        options={options}
                        placeholder="Choose up to 3 labels :" />

                </form>

                <button className="btn-add" onClick={(event) => {
                    event.preventDefault();
                    onAddToy(toy)
                }}>
                    <span className="fas fa-plus"></span>
                </button>

                <button className="btn-cancel" onClick={onToggleAdd}>
                    <span className="fas fa-undo-alt"></span>
                </button>

            </div>
        )
    }
}