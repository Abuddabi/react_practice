import { useNavigate, Form } from 'react-router-dom';

import classes from './EventForm.module.css';

function EventForm({ method = null, event }) {
  const navigate = useNavigate();
  function cancelHandler() {
    navigate('..');
  }

  const defaultValue = (prop) => event ? event[prop] : '';

  return (
    <Form method='post' className={classes.form}>
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
