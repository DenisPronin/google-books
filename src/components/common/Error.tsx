import { FC } from "react";
import { Alert } from 'react-bootstrap';

interface ErrorProps {
  error: string,
  clearError: () => void
}

const Error: FC<ErrorProps> = ({ error, clearError })  => {
  return (
    <div className='mb-5'>
      <Alert variant='danger' dismissible onClose={clearError}>
        {error}
      </Alert>
    </div>
  );
}

export default Error;
