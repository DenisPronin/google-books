import { Link } from 'react-router-dom';

function Header (props) {
  return (
    <header className='mb-4'>
      <Link to='/' className='hide-link-decoration'>
        <h1>Search for books</h1>
      </Link>
      
      {props.children}
    </header>
  );
}

export default Header;
