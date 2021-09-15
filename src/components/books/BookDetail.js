 import { Col, Row } from 'react-bootstrap';
import useBookProps from './useBookProps';

function BookDetail ({ book }) {
  const bookProps = useBookProps(book, true);
  const {
    title,
    description,
    imageLink,
    authorsList,
    categoriesList
  } = bookProps;
  
  return (
    <Row className='book book--detail'>
      <Col md={4} sm={1} cla ssName='mb-3'>
        {imageLink && (
          <img className='book-preview' src={imageLink} alt={title} />
        )}
        
        {!imageLink && (
          <div className='no-book-preview'>
            No preview
          </div>
        )}
      </Col>
      
      <Col md={8} sm={1} className='mb-3'>
        <h5>{title}</h5>
        <h6>Authors: {authorsList}</h6>
        <h6>Categories: {categoriesList}</h6>
        <div dangerouslySetInnerHTML={{__html: description}} />
      </Col>
    </Row>
  );
}

export default BookDetail;
