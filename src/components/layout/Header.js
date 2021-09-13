function Header (props) {
  return (
    <header>
      <h1>Search for books</h1>
      
      {props.children}
    </header>
  );
}

export default Header;
