import { useState } from 'react'
import { InsertBar } from './components/InsertBar'
import { Item } from './components/Item'
import { Items } from './constants/store'

const App = () => {
  const [items, setItems] = useState(Items)

  return (
    <div className='mx-4'>
      <InsertBar setItems={setItems}/>
      {items.map(({ task, isComplete, inFavourite, id }) => (
        <Item key={id} task={task} id={id} isComplete={isComplete} inFavourite={inFavourite} setItems={setItems}/>
      ))}
    </div>
  )
}

export default App
