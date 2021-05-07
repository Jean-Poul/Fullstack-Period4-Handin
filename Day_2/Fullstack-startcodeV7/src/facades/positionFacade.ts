import path from "path"
require('dotenv').config({ path: path.join(__dirname, "..", "..", '.env') })
import { Db, Collection, ObjectID } from "mongodb";
import IPosition from '../interfaces/IPosition'
import FriendsFacade from './friendFacade';
import { DbConnector } from "../config/dbConnector"
import { ApiError } from "../errors/apiError";

class PositionFacade {
    db: Db
    positionCollection: Collection
    friendFacade: FriendsFacade;

    constructor(db: Db) {
        this.db = db;
        this.positionCollection = db.collection("positions");
        this.friendFacade = new FriendsFacade(db);
    }

    async addOrUpdatePosition(email: string, longitude: number, latitude: number): Promise<IPosition> {
        // throw new Error("Not Implemented")
        // 1 Find friend in friend collection (remember error handling)
        const findFriend = await this.friendFacade.getFriendFromEmail(email)
        // 2 Make name from firstName + lastName
        const fullName = `${findFriend.firstName} ${findFriend.lastName}`
        // 3 Position handling
        const query = { email }
        const pos: IPosition = { lastUpdated: new Date(), email: email, name: fullName, location: { type: "Point", coordinates: [longitude, latitude] } }
        const update = {
            $set: { ...pos }
            // $set: { lastUpdated: new Date(), email: email, name: fullName, location: { type: "Point", coordinates: [longitude, latitude] } }
        } // all of IPosition 
        const options = { upsert: true, returnOriginal: false } // Upsert = update if found or makes a new one. returnOriginal = is true by default and return the old value and not the updated
        return (await this.positionCollection.findOneAndUpdate(query, update, options)).value
        // return result.value;
    }

    async findNearbyFriends(email: string, password: string, longitude: number, latitude: number, distance: number): Promise<Array<IPosition>> {
        // throw new Error("Not Implemented")
        // 1 See if friend exist
        // If i use security part this.friendFacade.getVerifiedUser
        // const findFriend = await this.friendFacade.getFriendFromEmail(email) // is done with await this.addOrUpdatePosition(email, longitude, latitude)
        // 2 Update position
        await this.addOrUpdatePosition(email, longitude, latitude)
        // 3 find all friends
        // to find all this.positionCollection.find({}).toArray() 
       /*  return this.positionCollection.find({ // Don't need to write await since it is returned

            email: { $ne: email }, // not equal my own email
            location: {
                $near: {
                    $geometry: {
                        type: "Point",
                        coordinates: [longitude, latitude]
                    },
                    $maxDistance: distance,
                    // $minDistance: 2
                }
            }

        }).toArray() */
        const result = await this.positionCollection.find({ 
            email: { $ne: email }, // not equal my own email
            location: {
                $near: {
                    $geometry: {
                        type: "Point",
                        coordinates: [longitude, latitude]
                    },
                    $maxDistance: distance,
                    // $minDistance: 2 *** commented our because I make use of $ne: email ***
                }
            }
        }).toArray()
        return result
    }

    async getAllPositions(): Promise<Array<IPosition>> {
        return this.positionCollection.find({}).toArray();
    }


}

export default PositionFacade;

async function tester() {
    const client = await DbConnector.connect()
    const db = client.db(process.env.DB_NAME)
    const positionFacade = new PositionFacade(db)
    await positionFacade.addOrUpdatePosition("pp@b.dk", 5, 5)
    process.exit(0)
}

//tester()