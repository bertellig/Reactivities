import { Link } from "react-router-dom";
import { Activity } from "../../../app/models/activity";
import { Button, Item, Segment, Icon } from "semantic-ui-react";
import { format } from "date-fns";
import { DEFAULT_DATE_TIME_FORMATTING } from "../../../shared/const";

interface Props {
    activity: Activity
}
export default function ActivityListItem({ activity }: Props) {

    return (
        <Segment.Group >
            <Segment>
                <Item.Group >
                    <Item>
                        <Item.Image src="/assets/user.dot.PNG" size="tiny" circular />
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
                Attendees go hiere
            </Segment>
            <Segment clearing>
                <span>
                    {activity.description}
                    <Button
                        as={Link}
                        to={`/activities/${activity.id}`}
                        color="teal"
                        floated="right"
                        content="View"
                    >
                    </Button>
                </span>
            </Segment>
        </Segment.Group>
    );
}

