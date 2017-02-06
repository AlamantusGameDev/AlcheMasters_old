// import '../../node_modules/compass.js/lib/compass.js';

import Helper from './helper';
import GEOLOCATION from '../constants/geolocation';

export class Geolocation {
    constructor (parent) {
        this.parent = parent;
        this.state = parent.game.state.getCurrentState();

        this.isInitialized = false;

        this.latitude = null;
        this.longitude = null;
        this.lastLatitude = null;
        this.lastLongitude = null;
        this.lastCheck = null;

        this.currentGeoAnchor = {
            latitude: null
        ,   longitude: null
        };

        this.check(() => {this.isInitialized = true;})
    }

    get canUseGeolocation () {
        if (window.navigator.geolocation) {
            console.info('geolocation api available');
            return true;
        }
        console.warn('geolocation api not available');
        return false;
    }

    get positionHasChanged () {
        return this.longitude !== this.lastLongitude || this.latitude === this.lastLatitude;
    }

    check (successCallback) {
        if (this.canUseGeolocation) {
            window.navigator.geolocation.getCurrentPosition((position) => {
                if (!this.isInitialized) {
                    this.lastLongitude = this.longitude = position.coords.longitude;
                    this.lastLatitude = this.latitude = position.coords.latitude;

                    console.info(GEOLOCATION.MESSAGES.ready);
                } else {
                    this.lastLongitude = this.longitude;
                    this.lastLatitude = this.latitude;
                    this.longitude = position.coords.longitude;
                    this.latitude = position.coords.latitude;
                }

                this.currentGeoAnchor.latitude = Helper.closestMultipleOf(GEOLOCATION.ANCHOR_INCREMENT, this.latitude);
                this.currentGeoAnchor.longitude = Helper.closestMultipleOf(GEOLOCATION.ANCHOR_INCREMENT, this.longitude);
                this.lastCheck = position.timestamp;

                console.log(`Latitude: ${this.latitude}\nLongitude:${this.longitude}`);

                if (successCallback) {
                    successCallback(this);
                }
            }, (error) => {
                console.error(error.message);
            }, {enableHighAccuracy: true, timeout: 20000, maximumAge: 0});
        } else {
            console.error(GEOLOCATION.MESSAGES.notSupported);
        }

        return this;
    }

    isInsideMarginOfError (latitude, longitude) {
        return (longitude < this.lastLongitude + GEOLOCATION.MARGIN_OF_ERROR
        && longitude > this.lastLongitude - GEOLOCATION.MARGIN_OF_ERROR
        && latitude < this.lastLatitude + GEOLOCATION.MARGIN_OF_ERROR
        && latitude > this.lastLatitude - GEOLOCATION.MARGIN_OF_ERROR);
    }
}
