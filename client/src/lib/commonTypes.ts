export interface Book {
  _id: string;
  image: string;
  title: string;
  author: string;
  leftCount: number;
  price: number;
  publisher: string;
  year: number;
  isbn: string;
  category: string;
}

export interface BookOrderProps {
  _id: string;
  name: string;
  email?: string;
  area: string;
  streetAddress: string;
  phoneNumber: string;
  orderNotes?: string;
  deliveryOption: string;
  status: string;
  bookIds: {
    id:Book;
    count: number;
  }[];
  totalPrice: number;
  createdAt: number;
}

export interface SheetOrder {
  _id: string;
  name: string;
  phone: string;
  department: string;
  year: string;
  semester: string;
  lectureSheets: {
    _id: string;
    name: string;
  }[];
  pdfFiles: string[];
}
