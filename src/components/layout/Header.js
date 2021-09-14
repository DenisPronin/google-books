function Header (props) {
  return (
    <header className='mb-4'>
      <h1>Search for books</h1>
      
      {props.children}
    </header>
  );
}

export default Header;
