import { Button, Container, Menu } from "semantic-ui-react";
import { NavLink } from "react-router-dom";
import { NavRoutes } from "../../shared/enums";

export default function NavBar() {

    return (
        <Menu inverted fixed="top">
            <Container>
                <Menu.Item as={NavLink} to={NavRoutes.Home} header>
                    <img src="/assets/logo.png" alt="logo" style={{ marginRight: 10 }} />
                    ERAS
                </Menu.Item>
                <Menu.Item as={NavLink} to={NavRoutes.Activities} name='Activities'></Menu.Item>
                <Menu.Item as={NavLink} to={NavRoutes.Errors} name='Errors'></Menu.Item>
                <Menu.Item>
                    <Button as={NavLink} to={NavRoutes.ActivityCreate} positive content='Create Activity'></Button>
                </Menu.Item>
            </Container>
        </Menu>
    )
}