import { Alert } from 'react-bootstrap';

function Error ({ error, clearError }) {
  return (
    <div className='mb-5'>
      <Alert variant='danger' dismissible onClose={clearError}>
        {error}
      </Alert>
    </div>
  );
}

export default Error;
