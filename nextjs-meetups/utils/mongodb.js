import { MongoClient, ObjectId } from 'mongodb';

async function getClient() {
    const client = await MongoClient.connect('mongodb+srv://f0r9ame123:Aa123!!!@cluster0.n239amc.mongodb.net/meetups');
    return client;
}

async function getCollection(client) {
    const db = client.db();
    const meetupsCollection = db.collection('meetups');
    return meetupsCollection;
}

async function fetchData(callback = null) {
    const client = await getClient();
    const meetupsCollection = await getCollection(client);

    const result = await callback(meetupsCollection);

    client.close();

    return result;
}

async function insertOne(data) {
    const result = await fetchData(async (meetupsCollection) => await meetupsCollection.insertOne(data));
    console.log(result);
}

async function getAll() {
    const allMeetups = await fetchData(async (meetupsCollection) => await meetupsCollection.find().toArray());
    return allMeetups;
}

async function getIds() {
    const ids = await fetchData(async (meetupsCollection) => await meetupsCollection.find({}, { projection: { _id: 1 } }).toArray());
    return ids;
}

async function getOneById(id) {
    const selectedMeetup = await fetchData(async (meetupsCollection) => await meetupsCollection.findOne({ _id: new ObjectId(id) }));
    return selectedMeetup;
}

const meetups = {
    insertOne,
    getAll,
    getIds,
    getOneById
};

export default meetups;