import { Link } from "react-router-dom";
import { Button, Container, Header, Image, Segment } from "semantic-ui-react";
import { useStore } from "../../app/stores/store";
import { NavRoutes } from "../../shared/enums";
import { observer } from "mobx-react-lite";
import LogingForm from "../users/LogingForm";
import RegisterForm from "../users/RegisterForm";

export default observer(function HomePage() {
    const { userStore, modalStore } = useStore()
    return (
        <Segment inverted textAlign="center" vertical className="masthead" >
            <Container text>
                <Header as='h1' inverted>
                    <Image size="massive" src='/assets/logo.png' alt='logo' style={{ marginBottom: 12 }} />
                    Reactivities
                </Header>
                {userStore.isLooggedIn ? (
                    <>

                        <Header as='h2' inverted content='Welcome to Reactivities' />
                        <Button as={Link} to={NavRoutes.Activities} size="huge" inverted>
                            Go to Activities!
                        </Button>
                    </>
                ) : (
                    <>
                        <Button onClick={() => modalStore.openModal(<LogingForm />)} size="huge" inverted>
                            Login!
                        </Button>
                        <Button onClick={() => modalStore.openModal(<RegisterForm />)} size="huge" inverted>
                            Register
                        </Button>
                    </>
                )}

            </Container>
        </Segment>
    )
})