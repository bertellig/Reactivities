import React from "react";
import { Button, Card, CardContent, CardDescription, CardHeader, CardMeta, Grid, Icon, Image, List } from "semantic-ui-react";
import { Activity } from "../../../app/models/activity";
import { useStore } from "../../../app/stores/store";

// interface Props {
//     activity: Activity;
//     cancelSelectActivity: () => void;
//     openForm: (id: string) => void;
// }
export default function ActivityDetails() {
    //export default function ActivityDetails({ activity, cancelSelectActivity, openForm }: Props) {

    const { activityStore } = useStore();
    const { selectedActivity: activity, openForm, cancelSelectedActivity } = activityStore;

    if (!activity) return;

    return (
        <Card fluid>
            <Image src={`/assets/categoryImages/${activity.category}.jpg`} />
            <CardContent>
                <CardHeader>{activity.title}</CardHeader>
                <CardMeta>
                    <span className='date'>{activity.date}</span>
                </CardMeta>
                <CardDescription>
                    {activity.description}
                </CardDescription>
            </CardContent>
            <CardContent extra>
                <Button.Group widths='2'></Button.Group>
                <Button onClick={() => openForm(activity.id)} basic color="blue" content='Edit' />
                <Button onClick={cancelSelectedActivity} basic color="grey" content='Cancel' />
            </CardContent>
        </Card>
    )
}