import { NavLink } from 'react-router-dom';

const Navigation = () => {
  return (
    <nav>
      <NavLink to="/">Home</NavLink>
      <NavLink to="/messages">Messages</NavLink>
    </nav>
  );
};

export default Navigation;
