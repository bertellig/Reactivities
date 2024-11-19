import { Link } from "react-router-dom";
import { Button, Header, Icon, Segment } from "semantic-ui-react";
import { ActivityMessages, GenericMessages, NavRoutes } from "../../shared/enums";

export default function () {
    return (
        <Segment placeholder>
            <Header icon>
                <Icon name='search' />
                {GenericMessages.NOT_FOUND}
            </Header>
            <Segment.Inline>
                <Button as={Link} to={NavRoutes.Activities}>
                    {ActivityMessages.RETURN_TO_ACTIVITY_PAGE}
                </Button>
            </Segment.Inline>
        </Segment>
    )
}