import { NavLink } from 'react-router-dom'
import styled from 'styled-components';
import 'boxicons'

const CustomNav = styled.nav`
    background-color: #444;
    color: white;
    display: flex;
    justify-content: space-around;
    align-items: stretch;
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 10%;
    box-shadow: 0px 5px 10px white
`;

const CustomNavLink = styled(NavLink)`
    color: inherit;
    text-decoration: none;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0.5rem;
    border-radius: 1rem;
    flex: 1 1 0px;
    &:hover {
        background-color: #777;
    }
`;

const NavContent = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
`


export default function Footer() {
    return <CustomNav >
        <CustomNavLink to="/profile" className={({isActive}) => isActive ? 'active' : null}><NavContent><box-icon type='solid' color='white' name='user'></box-icon>Profile</NavContent></CustomNavLink>
        <CustomNavLink to="/history" className={({isActive}) => isActive ? 'active' : null}><NavContent><box-icon color='white' name='history'></box-icon>History</NavContent></CustomNavLink>
        <CustomNavLink to="/workout" className={({isActive}) => isActive ? 'active' : null}><NavContent><box-icon color='white' type='solid' name='plus-circle'></box-icon>Workout</NavContent></CustomNavLink>
        <CustomNavLink to="/exercises" className={({isActive}) => isActive ? 'active' : null}><NavContent><box-icon color='white' name='dumbbell'></box-icon>Exercises</NavContent></CustomNavLink>
        <CustomNavLink to="/support" className={({isActive}) => isActive ? 'active' : null}><NavContent><box-icon type='solid' color='white' name='donate-heart'></box-icon>Support</NavContent></CustomNavLink> 
    </CustomNav>
}