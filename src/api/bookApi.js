import { queryGet } from './apiConfig';

const bookApi = {
  getBooksCollection (query, subject, orderBy) {
    const q = subject ? `${query}+subject:${subject}` : query;
    
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

export default bookApi;
