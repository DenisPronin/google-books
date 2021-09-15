import { queryGet } from './apiConfig';
import { gApiKey } from './keys.local';

const bookApi = {
  getBooksCollection (query, subject, orderBy, startIndex) {
    const q = subject ? `${query}+subject:${subject}` : query;
    
    return queryGet(`/volumes`, {
      params: {
        q,
        orderBy,
        startIndex,
        key: gApiKey
      }
    })
  },
  
  getBook (bookId) {
    return queryGet(`/volumes/${bookId}`, {
      params: {
        key: gApiKey
      }
    })
  }
}

export default bookApi;
