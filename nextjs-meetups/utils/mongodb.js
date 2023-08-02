import { MongoClient, ObjectId } from 'mongodb';

async function getClient() {
    const client = await MongoClient.connect(process.env.MONGODB_URL_STRING + '/meetups');
    return client;
}

async function getCollection(client) {
    const db = client.db();
    const meetupsCollection = db.collection('meetups');
    return meetupsCollection;
}

async function fetchData(callback) {
    const client = await getClient();
    const meetupsCollection = await getCollection(client);

    const result = await callback(meetupsCollection);

    client.close();

    return result;
}

async function insertOne(data) {
    const result = await fetchData(async (collection) => await collection.insertOne(data));
    return result;
}

async function getAll() {
    const allMeetups = await fetchData(async (collection) => await collection.find().toArray());
    return allMeetups;
}

async function getIds() {
    const ids = await fetchData(async (collection) => await collection.find({}, { projection: { _id: 1 } }).toArray());
    return ids;
}

async function getOneById(id) {
    const selectedMeetup = await fetchData(async (collection) => await collection.findOne({ _id: new ObjectId(id) }));
    return selectedMeetup;
}

const meetups = {
    insertOne,
    getAll,
    getIds,
    getOneById
};

export default meetups;