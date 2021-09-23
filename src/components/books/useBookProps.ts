import {GoogleBook} from "../../api/bookApi";

interface BookProps {
  title: string;
  description: string;
  imageLink?: string;
  authorsList: string;
  categoriesList: string;
}

function useBookProps (book: GoogleBook, isExtended: boolean): BookProps {
  const { volumeInfo } = book;
  const { title, authors = [], categories = [], description } = volumeInfo;
  const imageLink = volumeInfo.imageLinks?.thumbnail;
  const authorsList = authors.join(', ');
  let categoriesList = categories[0] || '';
  if (isExtended) {
    categoriesList = categories.join(', ');
  }

  return {
    title,
    description,
    imageLink,
    authorsList,
    categoriesList
  }
}

export default useBookProps;
