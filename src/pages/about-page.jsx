import React from 'react'

import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';
import { Button } from '@material-ui/core';

class _AboutPage extends React.Component {

    state = {
        center: {
            lat: 32.109333,
            lng: 34.855499
        },
        infoWindowTxt: '',
        zoom: 8,
        isInfoWindowOn: false
    }

    onMapClicked = (props, map, ev) => {
        this.setState({ center: { lat: ev.latLng.lat(), lng: ev.latLng.lng() } })
    }

    onMarkerClicked = (position, txt) => {
        this.setState({ center: position })
        this.setState({ isInfoWindowOn: true, infoWindowTxt: txt, zoom: 14 })
    }

    onInfoWindowClose = () => {
        this.setState({ isInfoWindowOn: false, infoWindowTxt: '', zoom: 8 })
    }

    containerStyle = {
        position: 'relative',
        width: '100%',
        height: '500px'
    }

    render() {
        return (
            <section className="about-page">
                <div>
                    <h1>Mister Toy is an online toy store</h1>
                    <p>The best toy store you will find online! GUARANTEED!!!</p>
                    <p>Check which store is nearest to you!</p>
                    <Button variant="contained" color="primary"
                        onClick={() => this.onMarkerClicked({ lat: 32.794044, lng: 34.989571 }, 'Haifa Branch')}>
                        Haifa
                    </Button>
                    <Button variant="contained" color="primary"
                        onClick={() => this.onMarkerClicked({ lat: 32.109333, lng: 34.855499 }, 'Tel Aviv Branch')}>
                        Tel-Aviv
                    </Button>
                    <Button variant="contained" color="primary"
                        onClick={() => this.onMarkerClicked({ lat: 31.25181, lng: 34.7913 }, 'Beer Sheva Branch')}>
                        Beer-Sheva
                    </Button>
                </div>
                <div >
                    <Map
                        containerStyle={this.containerStyle}
                        className="map"
                        google={this.props.google}
                        zoom={this.state.zoom}
                        initialCenter={this.state.center}
                        onClick={this.onMapClicked}
                        center={this.state.center}
                    >

                        <Marker
                            position={{ lat: 32.109333, lng: 34.855499 }}
                            name={'Tel Aviv Branch'}
                            onClick={() => this.onMarkerClicked({ lat: 32.109333, lng: 34.855499 }, 'Tel Aviv Branch')}
                        />

                        <Marker
                            position={{ lat: 32.794044, lng: 34.989571 }}
                            name={'Haifa Branch'}
                            onClick={() => this.onMarkerClicked({ lat: 32.794044, lng: 34.989571 }, 'Haifa Branch')}
                        />

                        <Marker
                            position={{ lat: 31.25181, lng: 34.7913 }}
                            name={'Beer Sheva Branch'}
                            onClick={() => this.onMarkerClicked({ lat: 31.25181, lng: 34.7913 }, 'Beer Sheva Branch')}
                        />

                        <InfoWindow
                            onClose={this.onInfoWindowClose}
                            position={this.state.center}
                            visible={this.state.isInfoWindowOn}
                        >
                            <div>
                                <h1>{this.state.infoWindowTxt}</h1>
                            </div>
                        </InfoWindow>
                    </Map>
                </div>
            </section>
        );
    }
}

export const AboutPage = GoogleApiWrapper({
    apiKey: ('AIzaSyBJt1HJ2UX7AlXY9pgE_f3VQena2BBVFVg')
})(_AboutPage)