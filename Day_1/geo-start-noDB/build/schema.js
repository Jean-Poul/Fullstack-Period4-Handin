"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.schema = void 0;
var graphql_tools_1 = require("graphql-tools");
var resolvers_1 = require("./resolvers");
/* const typeDefs = `

type Coordinate {
  latitude: Float!
  longitude: Float!
}

type Coordinates {
  coordinates: [Coordinate]
}

type Status {
  """TRUE if coordinates was inside gameArea, otherwise FALSE"""
  status: String
  """Contains a string with a description of whether given coordinates was inside or not inside the gameArea"""
  msg: String
}

type Player {
  """Will ALWAYS have the value --> Feature <--"""
  type: String
  """userName of Player (or Team)"""
  properties: Name
  """GeoJson Point with the users location"""
  geometry: Point
}

"""Contains userName of a Team found"""
type Name {
  name: String
}

type Point {
  """Will ALWAYS have the value Point"""
  type: String
  """Array with longitude followed by latitude [lon,lat]"""
  coordinates: [Float]
}

"""Represents a user found, with the distance to the caller"""
type User {
  """Distance to the user searched for"""
  distance: Float
  """userName of the user found"""
  to: String
}

type Query {

  """Returns a GeoJson Polygon representing the legal gameArea"""
  gameArea: Coordinates

  """Check weather caller, given his latitude and longtitude, is inside the gameArea"""
  isUserInArea(
    """Callers latitude"""
    latitude:Float!,
    """Callers longitude"""
    longitude:Float!
    ): Status!

  """Given callers latitude and longitude all nearby Teams will be found (inside the given radius)"""
  findNearbyPlayers(
    latitude: Float!
    longitude: Float!
    distance: Int!
    ): [Player]!

    """Given callers latitude and longitude, and the userName of the Team to find, returns the distance to this Team"""
    distanceToUser(
      """Callers latitude"""
      latitude: Float!
      """Callers longitude"""
      longitude: Float!
      """User to find"""
      userName: String
      ): User!
}
`; */
var typeDefs = "#graphql\n \ntype Status{\n  \"\"\"TRUE if coordinates was inside gameArea, otherwise FALSE\"\"\"\n  status: String\n \n  \"\"\"Contains a string with a description of whether given coordinates was inside or not inside the gameArea\"\"\"\n  msg: String\n}\n \ntype Coordinate {\n  latitude: Float!\n  longitude: Float!\n}\n \ntype Coordinates {\n  coordinates: [Coordinate]\n}\ntype CoordinatesV2 {\ncoordinates: [[[Float]]]\n}\n \ntype Point {\n \n  \"\"\"Will ALWAYS have the value Point\"\"\"\n  type: String\n  \n  \"\"\"Array with longitude followed by latitude [lon,lat]\"\"\"\n  coordinates: [Float]\n}\n \n \ntype Player {\n  \"\"\"userName of Player (or Team)\"\"\"\n  name: String\n  \n  \"\"\"GeoJson Point with the users location\"\"\"\n  point: Point\n}\n \n\"\"\"Represents a user found, with the distance to the caller\"\"\"\ntype User {\n  \"\"\"Distance to the user searched for\"\"\"\n  distance: Float\n \n  \"\"\"userName of the user found\"\"\"\n  to: String\n}\n \n\"\"\"\nError for a call, with msg and statuscode\n\"\"\"\ntype Error {\n  msg: String\n  statuscode: Int\n}\n \ntype Query {\n \n  \"\"\"Returns a GeoJson Polygon representing the legal gameArea\"\"\"\n  gameArea: Coordinates\n\n  gameAreaV2: CoordinatesV2\n \n   \"\"\"Check whether caller, given his latitude and longitude, is inside the gameArea\"\"\"\n   isUserInArea(\"Callers latitude\" latitude: Float!,\"Callers longitude\" longitude:Float!) : Status!\n \n   \"\"\"Given callers latitude and longitude all nearby Teams will be found (inside the given radius)\"\"\"\n   findNearbyPlayers(latitude: Float!, longitude: Float!,distance: Int!):[Player]!\n   \n   \"\"\"\n   Given callers latitude and longitude, and the userName of the Team to find, returns \n   an object with the distance and the name of the user found (team)\n   \"\"\"\n   distanceToUser(\"callers latitude\" latitude: Float!, \n                  \"callers longitude\" longitude: Float!, \n                  \"user to find\" userName: String) : User \n}\n";
var schema = graphql_tools_1.makeExecutableSchema({ typeDefs: typeDefs, resolvers: resolvers_1.resolvers });
exports.schema = schema;
//# sourceMappingURL=schema.js.map