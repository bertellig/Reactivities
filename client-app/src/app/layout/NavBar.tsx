import { Button, Container, Dropdown, Image, Menu } from "semantic-ui-react";
import { Link, NavLink } from "react-router-dom";
import { NavRoutes } from "../../shared/enums";
import { useStore } from "../stores/store";
import { observer } from "mobx-react-lite";

export default observer(function NavBar() {

    const { userStore: { user, logout } } = useStore()
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
                <Menu.Item position="right" >
                    <Image src={user?.image || '/assets/user.png'} avatar spaced='right' />
                    <Dropdown pointing='top left' text={user?.displayName}>
                        <Dropdown.Menu>
                            <Dropdown.Item as={Link} to={`/profile/${user?.username}`} text='My Profile' icon='user' />
                            <Dropdown.Item onClick={logout} text='Logout' icon='power' />
                        </Dropdown.Menu>
                    </Dropdown>
                </Menu.Item>
            </Container>
        </Menu>
    )
})