// sample geolocation payload creation

/********++++************************************************
 *                                                           *
 *   example of geolocation payload with byte structure      *
 *                                                           *
 *   var geoPayload = {                                      *
 *       byte0: payloadType,                                 *
 *       byte12: latitude,                                   *
 *       byte34: dateOfLatitude,                             *
 *       byte56: longitude,                                  *
 *       byte78: dateOfLongitude,                            *
 *       byte910: batteryVoltage                             *
 *   };                                                      *
 *************************************************************/

// creating random 10 bit hash
module.exports = {
    returnHash: function returnHash() {
        abc = "abcdef1234567890".split("");
        var token = "0x01";
        for (i = 0; i < 20; i++) {
            token += abc[Math.floor(Math.random() * abc.length)];
        }
        return token; //Will return a 32 bit "hash"
    },
};