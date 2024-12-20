import { Link } from "react-router-dom";
import { Button, Container, Header, Image, Segment } from "semantic-ui-react";
import { NavRoutes } from "../../shared/enums";

export default function HomePage() {
    return (
        <Segment inverted textAlign="center" vertical className="masthead" >
            <Container text>
                <Header as='h1' inverted>
                    <Image size="massive" src='/assets/logo.png' alt='logo' style={{ marginBottom: 12 }} />
                    Reactivities
                </Header>
                <Header as='h2' inverted content='Welcome to Reactivities' />
                <Button as={Link} to={NavRoutes.Login} size="huge" inverted>
                    Login
                </Button>
                <h3>Go to <Link to={NavRoutes.Activities} >Activities</Link></h3>
            </Container>
        </Segment>
    )
}