import mongoose from "mongoose";

/**
 * 0 = disconnected
 * 1 = connected
 * 2 = connecting
 * 3 = disconnecting 
*/

const mongoConection = {
    isConected: 0,
}

export const connect = async() => {
    if ( mongoConection.isConected == 1 ) {
        console.log('Already connected');
        return;
    }

    if ( mongoose.connections.length > 0 ) {
        mongoConection.isConected = mongoose.connections[0].readyState;

        if ( mongoConection.isConected == 1 ) {
            console.log('using conexion previously created');
            return;
        }

        await mongoose.disconnect();
    }

    await mongoose.connect(process.env.MONGO_URL || '');
    mongoConection.isConected = 1;

    console.log('conected to mongoDB', process.env.MONGO_URL);
    
}

export const disconnect = async() => {

    if ( process.env.NODE_ENV === 'development' ) return;

    if ( mongoConection.isConected === 0 ) return;

    await mongoose.disconnect();
    console.log('disconected to mongoDB', '....');
    

}