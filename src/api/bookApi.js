import { queryGet } from './apiConfig';

export default {
  getBooksCollection (query, subject, orderBy) {
    const q = subject ? `${query}+${subject}` : query;
    
    return queryGet(`/volumes`, {
      params: {
        q,
        orderBy
      }
    })
  },
  
  getBook (bookId) {
    return queryGet(`/volumes/${bookId}`)
  }
}
