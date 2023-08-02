import meetups from '../utils/mongodb';
import { meta } from '../utils/helper';
import MeetupList from '../components/meetups/MeetupList';

const title = 'React Meetups';
const description = 'Browse a huge list of highly active React meetups!';

function HomePage(props) {
    return <>
        {meta(title, description)}
        <MeetupList meetups={props.meetups} />
    </>;
}
//deploy

export async function getStaticProps() {
    const loadedMeetups = await meetups.getAll();
    console.log(loadedMeetups);

    return {
        props: {
            meetups: loadedMeetups.map(meetup => ({
                ...meetup,
                _id: meetup._id.toString(),
                id: meetup._id.toString(),
            }))
        }
    };
}

export default HomePage;