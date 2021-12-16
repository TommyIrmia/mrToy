import React from 'react'
import Select from 'react-select';
import { connect } from 'react-redux'

import { onSetFilter } from "../store/toy.actions.js";
import { toyService } from '../services/toy.service.js';

export class _ToyFilter extends React.Component {
    state = {
        filterBy: {
            word: '',
            type: '',
            labels: []
        },
        options: [],
    };

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
        const field = ev.target.name;
        const value = ev.target.value;
        this.setState((prevState) => ({ filterBy: { ...prevState.filterBy, [field]: value } }), () => {
            this.props.onSetFilter(this.state.filterBy)
        })
    }

    handleSelectChange = (ev) => {
        const value = ev;
        if (value.length > 3) return;
        this.setState((prevState) =>
            ({ ...prevState, filterBy: { ...prevState.filterBy, labels: value } })
            , () => this.props.onSetFilter(this.state.filterBy))
    }

    render() {
        const { word, type, labels } = this.state.filterBy;
        return (
            <form className='toy-filter'>
                <div className="search-img">
                    <span className="fas fa-search"></span>
                </div>

                <select name="type" onChange={this.handleChange} value={type}>
                    <option value=''>All</option>
                    <option value="instock">In Stock</option>
                    <option value="soldout">Sold Out</option>
                </select>

                <label htmlFor='by-word' >
                    <input
                        name='word' id='by-word'
                        type='text' placeholder='Search by name :' value={word}
                        onChange={this.handleChange}
                    />
                </label>

                <Select
                    className="select"
                    value={labels}
                    isMulti
                    onChange={this.handleSelectChange}
                    options={this.state.options}
                    placeholder="Choose up to 3 labels :" />




            </form>
        );
    }
}

function mapStateToProps(state) {
    return {
        toys: state.toyModule.toys,
    }
}

const mapDispatchToProps = {
    onSetFilter,
}

export const ToyFilter = connect(mapStateToProps, mapDispatchToProps)(_ToyFilter)