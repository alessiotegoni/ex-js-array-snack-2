const books = [
  {
    title: "React Billionaire",
    pages: 250,
    author: {
      name: "Alice",
      age: 35,
    },
    available: false,
    price: "101€",
    tags: ["advanced", "js", "react", "senior"],
  },
  {
    title: "Advanced JS",
    pages: 500,
    author: {
      name: "Bob",
      age: 20,
    },
    available: true,
    price: "25€",
    tags: ["advanced", "js", "mid-senior"],
  },
  {
    title: "CSS Secrets",
    pages: 320,
    author: {
      name: "Alice",
      age: 17,
    },
    available: true,
    price: "8€",
    tags: ["html", "css", "junior"],
  },
  {
    title: "HTML Mastery",
    pages: 200,
    author: {
      name: "Charlie",
      age: 50,
    },
    available: false,
    price: "48€",
    tags: ["html", "advanced", "junior", "mid-senior"],
  },
]

// Snack 1 - Filtra e Modifica
const longBooks = books.filter(book => book.pages > 300)

const longBooksTitles = longBooks.map(({ title }) => title)
console.log(longBooksTitles)

// Snack 2 - Il primo libro scontato
const availableBooks = books.filter(book => book.available)
const discountedBooks = availableBooks.map(book => {
	
  const price = parseInt(book.price.slice(0, -1))
  const discount = (price / 100) * 20 
  const priceCurrency = book.price.at(-1)
  
  return { ...book, price: `${(price - discount).toFixed(2)}${priceCurrency}` }
})

const fullPricedBook = discountedBooks.find(book => parseFloat(book.price) % 1 === 0)

// Snack 3 - Ordinare gli Autori    
const authors = books.map(book => book.author)
const areAuthorsAdults = authors.every(author => author >= 18)

authors.sort((a, b) => areAuthorsAdults ? a.age - b.age : b.age - a.age)

// Snack 4 - Calcola l’età media
const ages = authors.map(author => author.age);
const agesSum = ages.reduce((sum, age) => sum + age, 0);
console.log("Età media degli autori:", (agesSum / ages.length).toFixed(2));

// Snack 5 - Raccogli i libri
const getBooks = async (ids) => {
    const bookPromises = ids.map(id => fetch(`https://boolean-spec-frontend.vercel.app/freetestapi/books/${id}`).then(res => res.json()));
    return Promise.all(bookPromises);
};

getBooks([2, 13, 7, 21, 19]).then(books => console.log(books));

// Snack 6 - Ordina i libri
const areThereAvailableBooks = books.some(book => book.available);
const booksByPrice = [...books].sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
booksByPrice.sort((a, b) => b.available - a.available);

// Snack 7 - Analizza i tag
const tagCounts = books.reduce((acc, book) => {
    book.tags.forEach(tag => {
        acc[tag] = (acc[tag] || 0) + 1;
    });
    return acc;
}, {});
console.log(tagCounts);

