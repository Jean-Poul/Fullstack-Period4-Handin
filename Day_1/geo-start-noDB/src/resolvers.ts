import gju from 'geojson-utils'

// You can not use import out of the box in node
import { gameArea, players } from './gameData'
// const { gameArea, players } = require('./gameData')

const gameAreaForResponse = gameArea.coordinates[0].map((p) => {
  return { latitude: p[0], longitude: p[1] }
})

export const resolvers = {
  Query: {
    gameArea: () => {
      // console.log(JSON.stringify(gameArea.coordinates));
      return { coordinates: [...gameAreaForResponse] };
    },
    gameAreaV2: () => {
      return gameArea;
    },
    // When it is programming/math I write longitude, latitude (x,y) - real world it is latitude/longitude
    isUserInArea: (_: any, { longitude, latitude }: { longitude: number, latitude: number }) => {
      const point = {
        type: "Point",
        coordinates: [longitude, latitude]
      }
      const isInside = gju.pointInPolygon(point, gameArea)

      let result: any = {};
      result.status = isInside;
      result.msg = isInside ? "Point was inside the GameArea" : "Point was NOT inside the GameArea";
      return result
    },
    findNearbyPlayers: (_: any, { longitude, latitude, distance }: { longitude: number, latitude: number, distance: number }) => {
      const point = { "type": "Point", "coordinates": [longitude, latitude] }
      //TODO --> iterate over all players and use gju.geometryWithinRadius(..) to check whether they are "near"
      // If, ad the found player to the foundPlayers array below, formatted as requested by the schema
      let result: any = [];
      players.map(p => {
        if (gju.geometryWithinRadius(point, p.geometry, distance)) {
          const point = { "type": "Point", "coordinates": p.geometry.coordinates }
          const name = p.properties.name
          const foundPlayer = { name, point }
          result.push(foundPlayer)
          //console.log(foundPlayer)
        }
      })
      return result
    },
    distanceToUser: async (_: any, { longitude, latitude, userName }: { longitude: number, latitude: number, userName: string }) => {
      const point = { "type": "Point", "coordinates": [longitude, latitude] }
      /* TODO --> 1) Iterate over all users and see if useName exists in the "database". If not return null
              --> 2) If the user exists, use the point above (representing the caller), 
      and user.geometry for the user to find the distance to
      as inputs to gju.pointDistance
      */
      let user: any = null
      players.map(p => {
        if (userName === p.properties.name) {
          // console.log(p.geometry);
          const distance = gju.pointDistance(point, p.geometry)
          const to = userName
          user = { distance, to }
          return user
        }
      })
      //console.log(user)
      return user
    }
  },
};
