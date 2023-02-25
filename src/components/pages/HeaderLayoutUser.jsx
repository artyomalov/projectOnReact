import { NavLink, Outlet } from 'react-router-dom';
export default function HeaderLayout() {
  return (
    <>
      <header>
        <NavLink to="/">Users</NavLink>
        <NavLink to="sendList">Send list</NavLink>
        <NavLink to="login">Login</NavLink>
      </header>
      <main>
        <Outlet />
      </main>
    </>
  );
}
