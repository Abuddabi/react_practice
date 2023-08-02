import { MongoClient } from 'mongodb';
import meetups from '../../utils/mongodb';

async function handler(req, res) {
    if (req.method === 'POST') {
        const data = req.body;
        const response = await meetups.insertOne(data);
        const result = { message: '' };

        if (response.acknowledged === true) {
            result.message = 'Meetup inserted!';
        } else result.message = 'Something went wrong';

        res.status(201).json(result);
    }
}

export default handler;