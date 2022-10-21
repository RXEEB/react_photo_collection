import React from 'react';
import './index.scss';
import { Collection } from './Collection';




function App() {

 const cats = [
    { "name": "Все" },
    { "name": "Море" },
    { "name": "Горы" },
    { "name": "Архитектура" },
    { "name": "Города" }
  ]

  const [collections, setCollections] = React.useState([])
  const [searchValue, setSearchValue] = React.useState('')
  const [categoryId, setCategoryId] = React.useState(0)
  const [isLoading, setIsLoading] = React.useState(true)
  const [page, setPage] = React.useState(1)




  React.useEffect(() => {
    setIsLoading(true)
    const category = categoryId ? `category=${categoryId}` :''
    

    fetch(`https://63336629433198e79dc46954.mockapi.io/photos?page=${page}&${category}`).then(res => res.json()).then(json => {
      setCollections(json)
    })
      .catch((err) => {
        console.warn(err)
        alert('error collections loading')
      }).finally(()=> setIsLoading(false))
  }, [categoryId,page])

  return (
    <div className="App">
      <h1>Моя коллекция фотографий</h1>
      <div className="top">
        <ul className="tags">
          {
            cats.map((obj, index)=> (
              <li className={categoryId === index ? 'active' : ''}
              onClick ={()=> setCategoryId(index)}
              key={obj.name} >{obj.name}</li>
            ))
          }
        </ul>
        <input className="search-input" placeholder="Поиск по названию"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
      </div>
      <div className="content">
        {
         isLoading ? <h2>Loadin in progress...</h2> :
         collections.filter((obj)=> obj.name.toLowerCase().includes(searchValue.toLocaleLowerCase())
         ).map((obj, index) => (
           <Collection
             key={index}
             name={obj.name}
             images={obj.photos}
           />
         ))

        }
      </div>
      <ul className="pagination">
       {
        [...Array(4)].map((_, index) => (
          <li className={page === index + 1 ? 'active' : ''}
          onClick = {()=> setPage(index +1)}
          key={index}>{index + 1}</li>
        ))
       }
      </ul>
    </div>
  );
}

export default App;