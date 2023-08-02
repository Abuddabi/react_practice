import meetups from '../utils/mongodb';
import MeetupList from '../components/meetups/MeetupList';

function HomePage(props) {
    return <MeetupList meetups={props.meetups} />;
}

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