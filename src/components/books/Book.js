import { Card } from 'react-bootstrap';
import useBookProps from './useBookProps';

function Book ({ book }) {
  const bookProps = useBookProps(book, false);
  const {
    title,
    imageLink,
    authorsList,
    categoriesList
  } = bookProps;
  
  return (
    <Card className='book'>
      {imageLink && <Card.Img variant="top" className='book-preview' src={imageLink} />}
      {!imageLink && (
        <div className='no-book-preview'>
          No preview
        </div>
      )}
      
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Subtitle>Authors: {authorsList}</Card.Subtitle>
        <Card.Subtitle>Categories: {categoriesList}</Card.Subtitle>
      </Card.Body>
    </Card>
  );
}

export default Book;
