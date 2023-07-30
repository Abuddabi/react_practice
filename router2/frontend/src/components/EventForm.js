import {
    Form,
    useNavigate,
    json,
    redirect
} from 'react-router-dom';

import classes from './EventForm.module.css';
import { getAuthToken } from '../util/auth';

function EventForm({ method = null, event }) {
    const navigate = useNavigate();
    function cancelHandler() {
        navigate('..');
    }

    const defaultValue = (prop) => event ? event[prop] : '';

    return (
        <Form method={method} className={classes.form}>
            <p>
                <label htmlFor="title">Title</label>
                <input id="title" type="text" name="title" required defaultValue={defaultValue('title')} />
            </p>
            <p>
                <label htmlFor="image">Image</label>
                <input id="image" type="url" name="image" required defaultValue={defaultValue('image')} />
            </p>
            <p>
                <label htmlFor="date">Date</label>
                <input id="date" type="date" name="date" required defaultValue={defaultValue('date')} />
            </p>
            <p>
                <label htmlFor="description">Description</label>
                <textarea id="description" name="description" rows="5" required defaultValue={defaultValue('description')} />
            </p>
            <div className={classes.actions}>
                <button type="button" onClick={cancelHandler}>
                    Cancel
                </button>
                <button>Save</button>
            </div>
        </Form>
    );
}

export default EventForm;

export async function action({ request, params }) {
    const method = request.method;
    const data = await request.formData();
    const token = getAuthToken();

    const eventData = {
        title: data.get('title'),
        image: data.get('image'),
        date: data.get('date'),
        description: data.get('description'),
    };

    let url = 'http://localhost:8080/events';

    if (method === 'PATCH') {
        const id = params.id;
        url = 'http://localhost:8080/events/' + id;
    }

    const response = await fetch(url, {
        method: method,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        },
        body: JSON.stringify(eventData),
    });

    if (response.status === 422) {
        return response;
    }

    if (!response.ok) {
        throw json({ message: 'Could not save event.' }, { status: 500 });
    }

    return redirect('/events');
}
