import { Link } from "react-router-dom";
import { Activity } from "../../../app/models/activity";
import { Button, Icon, Item, Segment } from "semantic-ui-react";
import { DEFAULT_DATE_TIME_FORMATTING } from "../../../shared/const";
import { format } from "date-fns";

interface Props {
    activity: Activity
}
export default function ActivityListItem({ activity }: Props) {

    return (
        <Segment.Group >
            <Segment>
                <Item.Group >
                    <Item>
                        <Item.Image src="/assets/user.png" size="tiny" circular />
                        <Item.Content>
                            <Item.Header as={Link} to={activity.id}>
                                {activity.title}
                            </Item.Header>
                            <Item.Description>
                                Hosted by: Bob
                            </Item.Description>
                        </Item.Content>
                    </Item>
                </Item.Group>
            </Segment>
            <Segment>
                <span>
                    <Icon name="clock" /> {format(activity.date!, DEFAULT_DATE_TIME_FORMATTING)}
                    <Icon name="marker" /> {activity.venue}
                </span>
            </Segment>
            <Segment secondary>
                Attendees go here
            </Segment>
            <Segment clearing>
                <span>
                    {activity.description}</span>
                <Button
                    as={Link}
                    to={`/activities/${activity.id}`}
                    color="teal"
                    floated="right"
                    content="View"
                />
            </Segment>
        </Segment.Group>
    );

}