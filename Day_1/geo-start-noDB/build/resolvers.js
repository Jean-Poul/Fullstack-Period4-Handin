"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolvers = void 0;
var geojson_utils_1 = __importDefault(require("geojson-utils"));
// You can not use import out of the box in node
// const { gameArea, players } = require('./gameData')
var gameData_1 = require("./gameData");
var gameAreaForResponse = gameData_1.gameArea.coordinates[0].map(function (p) {
    return { latitude: p[0], longitude: p[1] };
});
exports.resolvers = {
    Query: {
        gameArea: function () {
            // console.log(JSON.stringify(gameArea.coordinates));
            return { coordinates: __spreadArray([], gameAreaForResponse) };
        },
        gameAreaV2: function () {
            return gameData_1.gameArea;
        },
        // When it is programming/math I write longitude, latitude (x,y) - real world it is latitude/longitude
        isUserInArea: function (_, _a) {
            var longitude = _a.longitude, latitude = _a.latitude;
            var point = {
                type: "Point",
                coordinates: [longitude, latitude]
            };
            var isInside = geojson_utils_1.default.pointInPolygon(point, gameData_1.gameArea);
            var result = {};
            result.status = isInside;
            result.msg = isInside ? "Point was inside the GameArea" : "Point was NOT inside the GameArea";
            return result;
        },
        findNearbyPlayers: function (_, _a) {
            /* const point = {
              type: "Point",
              coordinates: [longitude, latitude]
            }
            let foundPlayers: any = []
      
            const searchPlayers = players.forEach((player) => {
              if (gju.geometryWithinRadius(player.geometry, point, distance)) {
      console.log(player.properties.name);
      
                const playerName = player.properties.name
                const type = player.geometry.type
                const playerCoordinate = player.geometry.coordinates
      
                const geometry = { type, playerCoordinate }
      
                const finalPlayer = { playerName, geometry }
                foundPlayers.push(finalPlayer)
              }
            })
            return foundPlayers */
            var longitude = _a.longitude, latitude = _a.latitude, distance = _a.distance;
            var point = { "type": "Point", "coordinates": [longitude, latitude] };
            //TODO --> iterate over all players and use gju.geometryWithinRadius(..) to check whether they are "near"
            // If, ad the found player to the foundPlayers array below, formatted as requested by the schema
            var result = [];
            gameData_1.players.map(function (p) {
                if (geojson_utils_1.default.geometryWithinRadius(point, p.geometry, distance)) {
                    var point_1 = { "type": "Point", "coordinates": p.geometry.coordinates };
                    var name_1 = p.properties.name;
                    var foundPlayer = { name: name_1, point: point_1 };
                    result.push(foundPlayer);
                    //console.log(foundPlayer)
                }
            });
            return result;
        },
        distanceToUser: function (_, _a) {
            var longitude = _a.longitude, latitude = _a.latitude, userName = _a.userName;
            return __awaiter(void 0, void 0, void 0, function () {
                var point, user;
                return __generator(this, function (_b) {
                    point = { "type": "Point", "coordinates": [longitude, latitude] };
                    user = null;
                    gameData_1.players.map(function (p) {
                        if (userName === p.properties.name) {
                            var distance = geojson_utils_1.default.pointDistance(point, p.geometry);
                            var to = userName;
                            user = { distance: distance, to: to };
                            return user;
                        }
                    });
                    //console.log(user)
                    return [2 /*return*/, user];
                });
            });
        }
    },
};
//# sourceMappingURL=resolvers.js.map