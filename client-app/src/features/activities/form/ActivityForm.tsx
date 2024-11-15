import React, { ChangeEvent, useState } from "react";
import { Button, Card, CardContent, CardDescription, CardHeader, CardMeta, Form, Grid, Icon, Image, List, Segment } from "semantic-ui-react";
//import { Activity } from "../../../app/models/activity";
import { useStore } from "../../../app/stores/store";
import { observer } from "mobx-react-lite";
//import LoadingComponent from "../../../app/layout/LoadingComponent";

// interface Props {
//     // activity: Activity | undefined;
//     // closeForm: () => void;
//     createOrEdit: (activity: Activity) => void;
//     submitting: boolean;
// }
export default observer(function ActivityForm() {
    //export default function ActivityForm({ activity: selectedActivity, closeForm, createOrEdit, submitting }: Props) {

    const { activityStore } = useStore()
    const { selectedActivity, closeForm, createActivity, updateActivity, loading } = activityStore;

    const initalstate = selectedActivity ?? {
        id: '',
        title: '',
        date: '',
        description: '',
        category: '',
        city: '',
        venue: '',
    }

    const [activity, setActivity] = useState(initalstate);

    function hanleSubmit() {
        //createOrEdit(activity);
        activity.id ? updateActivity(activity) : createActivity(activity);
    }

    function handleInputChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        const { name, value } = event.target;
        setActivity({ ...activity, [name]: value })

    }

    return (<Segment clearing>
        <Form onSubmit={hanleSubmit} autoComplete='off'>
            <Form.Input placeholder='Title' value={activity.title} name='title' onChange={handleInputChange} />
            <Form.TextArea placeholder='Description' value={activity.description} name='description' onChange={handleInputChange} />
            <Form.Input placeholder='Category' value={activity.category} name='category' onChange={handleInputChange} />
            <Form.Input type='date' placeholder='Date' value={activity.date} name='date' onChange={handleInputChange} />
            <Form.Input placeholder='City' value={activity.city} name='city' onChange={handleInputChange} />
            <Form.Input placeholder='Venue' value={activity.venue} name='venue' onChange={handleInputChange} />
            <Button loading={loading} floated="right" positive type='submit' content='Submit'></Button>
            <Button onClick={closeForm} floated="right" type='button' content='Cancel'></Button>
        </Form>
    </Segment>
    )
})
