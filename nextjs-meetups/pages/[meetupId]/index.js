import MeetupDetail from '../../components/meetups/MeetupDetail';
import meetups from '../../utils/mongodb';

function MeetupDetails({ meetupData }) {
    return (
        <MeetupDetail
            {...meetupData}
        />
    );
}

export async function getStaticPaths() {
    const meetupsIds = await meetups.getIds();

    return {
        fallback: false,
        paths: meetupsIds.map(meetup => ({
            params: { meetupId: meetup._id.toString() }
        }))
    };
}

export async function getStaticProps(context) {
    const meetupId = context.params.meetupId;
    const selectedMeetup = await meetups.getOneById(meetupId);
    const id = selectedMeetup._id.toString();

    return {
        props: {
            meetupData: {
                ...selectedMeetup,
                id: id,
                _id: id,
            }
        },
        revalidate: 1
    };
}

export default MeetupDetails;