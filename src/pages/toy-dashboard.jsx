import React from 'react';
import { Bar, Pie } from 'react-chartjs-2';
import { toyService } from '../services/toy.service';



export class ToyDashboard extends React.Component {

    state = {
        labels: [],
        data: [],
        data2: [],
    }

    componentDidMount() {
        this.loadData()
    }

    loadData = async () => {
        const labels = toyService.getlabels();
        try {
            const toys = await toyService.query()
            const labelsMap = {}

            labels.forEach(label => {
                labelsMap[label] = toys.filter(toy => toy.labels.includes(label)) || []
            }, {})

            for (let label in labelsMap) {
                labelsMap[label] = labelsMap[label].map(toy => (typeof toy.price === 'number') ? toy.price : +toy.price)
            }

            let sums = []
            let avgs = []
            let numOfToys = []
            for (let label in labelsMap) {
                sums = labelsMap[label].reduce((acc, price) => {
                    return acc += price
                }, 0)
                avgs.push((sums) ? Math.floor(sums / labelsMap[label].length) : 0)
                numOfToys.push(labelsMap[label].length)
            }

            this.setState({ labels, data: avgs, data2: numOfToys })
        } catch (err) {
            console.log('Can not get data for charts')
        }
    }

    render() {
        const data = {
            labels: this.state.labels,
            datasets: [
                {
                    label: 'Average Price',
                    data: this.state.data,
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.5)',
                        'rgba(54, 162, 235, 0.5)',
                        'rgba(255, 206, 86, 0.5)',
                        'rgba(75, 192, 192, 0.5)',
                        'rgba(153, 102, 255, 0.5)',
                        'rgba(255, 159, 64, 0.5)',
                        'rgba(255, 99, 132, 0.5)',
                        'rgba(54, 162, 235, 0.5)',
                        'rgba(255, 206, 86, 0.5)',
                        'rgba(75, 192, 192, 0.5)',
                        'rgba(153, 102, 255, 0.5)',
                        'rgba(255, 159, 64, 0.5)',
                    ],
                    borderWidth: 1,
                },
            ],
        };

        const data2 = {
            labels: this.state.labels,
            datasets: [
                {
                    label: 'Average Price',
                    data: this.state.data2,
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.5)',
                        'rgba(54, 162, 235, 0.5)',
                        'rgba(255, 206, 86, 0.5)',
                        'rgba(75, 192, 192, 0.5)',
                        'rgba(153, 102, 255, 0.5)',
                        'rgba(255, 159, 64, 0.5)',
                        'rgba(255, 99, 132, 0.5)',
                        'rgba(54, 162, 235, 0.5)',
                        'rgba(255, 206, 86, 0.5)',
                        'rgba(75, 192, 192, 0.5)',
                        'rgba(153, 102, 255, 0.5)',
                        'rgba(255, 159, 64, 0.5)',
                    ],
                    borderWidth: 1,
                },
            ],
        };

        const options = {
            scales: {
                yAxes: [
                    {
                        ticks: {
                            beginAtZero: true,
                        },
                    },
                ],
            },
        };

        return (
            <section className="dashboard-page">

                <div className='header'>
                    <h1 className='title'>Num of toys per type</h1>
                </div>
                <Pie data={data2} className="polar-chart" />

                <div className='header'>
                    <h1 className='title'>Avg Price Per Type Of Toy</h1>
                </div>
                <Bar data={data} options={options} className="polar-chart" />
            </section>
        )
    }
}
