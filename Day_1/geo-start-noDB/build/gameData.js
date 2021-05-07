"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.players = exports.gameArea = void 0;
var gameArea = {
    "type": "Polygon",
    "coordinates": [
        [
            [
                12.553424835205078,
                55.79645643069193
            ],
            [
                12.549304962158203,
                55.784875094551765
            ],
            [
                12.565784454345703,
                55.7763799260891
            ],
            [
                12.583637237548828,
                55.78217228729694
            ],
            [
                12.583980560302734,
                55.7950089519825
            ],
            [
                12.568531036376953,
                55.80108800103754
            ],
            [
                12.553424835205078,
                55.79645643069193
            ]
        ]
    ]
};
exports.gameArea = gameArea;
var players = [
    {
        "type": "Feature",
        "properties": {
            "name": "p1-outside"
        },
        "geometry": {
            "type": "Point",
            "coordinates": [
                12.549304962158203,
                55.79346491539269
            ]
        }
    },
    {
        "type": "Feature",
        "properties": {
            "name": "p2-outside"
        },
        "geometry": {
            "type": "Point",
            "coordinates": [
                12.548789978027344,
                55.780820813358616
            ]
        }
    },
    {
        "type": "Feature",
        "properties": { "name": "p3-inside" },
        "geometry": {
            "type": "Point",
            "coordinates": [
                12.57059097290039,
                55.79143827447144
            ]
        }
    },
    {
        "type": "Feature",
        "properties": { "name": "p4-inside" },
        "geometry": {
            "type": "Point",
            "coordinates": [
                12.575054168701172,
                55.78458551702825
            ]
        }
    }
];
exports.players = players;
//# sourceMappingURL=gameData.js.map