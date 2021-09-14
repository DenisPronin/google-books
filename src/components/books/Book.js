import { Card } from 'react-bootstrap';

function Book ({ book, isExtended }) {
  const { volumeInfo } = book;
  const { title, authors = [], categories = [], description } = volumeInfo;
  const imageLink = volumeInfo.imageLinks?.thumbnail;
  
  const authorsList = authors.join(', ');
  
  let categoriesList = categories[0] || '';
  if (isExtended) {
    categoriesList = categories.join(', ');
  }
  
  return (
    <Card className='book'>
      {imageLink && <Card.Img variant="top" src={imageLink} />}
      {!imageLink && (
        <div className='no-book-preview'>
          No preview
        </div>
      )}
      
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Subtitle>Authors: {authorsList}</Card.Subtitle>
        <Card.Subtitle>Categories: {categoriesList}</Card.Subtitle>
        {isExtended && <Card.Text dangerouslySetInnerHTML={{__html: description}} />}
      </Card.Body>
    </Card>  );
}

export default Book;
