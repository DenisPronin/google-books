import { queryGet } from './apiConfig';

const bookApi = {
  getBooksCollection (query, subject, orderBy, startIndex) {
    const q = subject ? `${query}+subject:${subject}` : query;
    
    return queryGet(`/volumes`, {
      params: {
        q,
        orderBy,
        startIndex
      }
    })
  },
  
  getBook (bookId) {
    return queryGet(`/volumes/${bookId}`)
  }
}

export default bookApi;
