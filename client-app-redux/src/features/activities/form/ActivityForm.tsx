import { ChangeEvent, useState } from "react";
import { Button, Header, Label, Segment } from "semantic-ui-react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Activity } from "../../../app/models/activity";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { v4 as uuid } from 'uuid';
import { useLoadActivityQuery as loadActivity, useCreateActivityMutation, useUpdateActivityMutation } from '../../../app/stores/activityStore';
import { Formik, Form, ErrorMessage } from "formik";
import * as Yup from 'yup';
import { ActivityMessages } from "../../../shared/enums";
import MyTextInput from "../../../app/common/form/MyTextInput";
import MyTextArea from "../../../app/common/form/MyTextArea";
import MySelectInput from "../../../app/common/form/MySelectInput";
import { categoryOptions } from "../../../app/common/options/categoryOptions";
import MyDateInput from "../../../app/common/form/MyDateInput";

export default function ActivityForm() {

    const [createActivity] = useCreateActivityMutation();
    const [updateActivity] = useUpdateActivityMutation();
    const { id } = useParams();
    const navigate = useNavigate();

    const { data, isLoading, error } = id ? loadActivity(id) : {
        data: {
            id: '',
            title: '',
            date: '',
            description: '',
            category: '',
            city: '',
            venue: '',
        }, isLoading: false, error: undefined
    };

    const validationSchema = Yup.object({
        title: Yup.string().required(ActivityMessages.VALIDATION_TITLE_IS_REQUIRED),
        description: Yup.string().required(),
        category: Yup.string().required(),
        date: Yup.string().required(),
        venue: Yup.string().required(),
        city: Yup.string().required(),
    })

    if (isLoading) {
        return <LoadingComponent content="Loading Activities..." />;
    }
    if (error) return <LoadingComponent content={`ERROR: Loading Activities... ${error}`} />;

    const [activity, setActivity] = useState<Activity>(data ?? {
        id: '',
        title: '',
        date: null,
        description: '',
        category: '',
        city: '',
        venue: '',
    })

    function handleFormSubmit(activity: Activity) {
        // I think this is bad practices. The DB should return the id. The UI should know nothing about what type of id.
        if (!activity.id) {
            activity.id = uuid();
            createActivity(activity).then(() => navigate(`/activities/${activity.id}`));
        } else {
            updateActivity(activity).then(() => navigate(`/activities/${activity.id}`));
        }
    }

    function handleChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        const { name, value } = event.target;
        setActivity({ ...activity, [name]: value })

    }

    return (
        <Segment clearing>
            <Header content='Activity Details' sub color='teal' />
            <Formik
                validationSchema={validationSchema}
                enableReinitialize
                initialValues={activity}
                onSubmit={values => handleFormSubmit(values)} >
                {({ handleSubmit, isValid, isSubmitting, dirty }) => (
                    <Form className='ui form' onSubmit={handleSubmit} autoComplete='off'>
                        <MyTextInput name='title' placeholder='Title' />
                        <MyTextArea rows={3} placeholder='Description' name='description' />
                        <MySelectInput options={categoryOptions} placeholder='Category' name='category' />
                        <MyDateInput
                            placeholderText='Date'
                            name='date'
                            showTimeSelect
                            timeCaption="time"
                            dateFormat='MMMM d, yyyy h:mm aa'
                            disabled={isSubmitting || !dirty || !isValid}
                        />
                        <Header content='Location Details' sub color='teal' />
                        <MyTextInput placeholder='City' name='city' />
                        <MyTextInput placeholder='Venue' name='venue' />
                        <Button loading={isLoading} floated="right" positive type='submit' content='Submit'></Button>
                        <Button as={Link} to='/activities' floated="right" type='button' content='Cancel'></Button>
                    </Form>
                )}
            </Formik>

        </Segment>
    )
}
