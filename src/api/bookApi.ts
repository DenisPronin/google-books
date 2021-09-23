import { queryGet } from './apiConfig';
import { gApiKey } from './keys.local';

export interface GoogleBook {
  volumeInfo: {
    title: string;
    description: string;
    authors: Array<string>;
    categories: Array<string>;
    imageLinks: {
      thumbnail: string;
    }
  }
}

export interface GoogleBooks {
  totalItems: number;
  items: Array<GoogleBook>
}

const bookApi = {
  getBooksCollection (
    query: string,
    subject: string,
    orderBy: string,
    startIndex: number
  ): Promise<GoogleBooks> {
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

  getBook (bookId: string) {
    return queryGet(`/volumes/${bookId}`, {
      params: {
        key: gApiKey
      }
    })
  }
}

export default bookApi;
