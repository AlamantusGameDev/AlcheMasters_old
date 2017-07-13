export default {
    // Geo Anchors are placed every n * 111000 meters.
    ANCHOR_INCREMENT: 0.05,

// 1 latlong is ~111 km (~111000 m), so each 0.00001 latlong difference is ~1 meter.
// Using 1 pixel = ~1 meter, means multiplying the below value by a geocoordinate offset
// produces its pixel position!
//     geoToPixelScale: 100000,

// The margin range within which an item's position will not update if the player's coordinates change.
// Meant to combat items floating/moving when the geoposition calculation is inconsistent.
    MARGIN_OF_ERROR: 0.00009,
    MESSAGES: {
        ready: 'Geolocation active!',
        notSupported: 'Your device does not support geolocation! Please try playing again on a device that does.',
    },
};
