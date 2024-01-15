import { useState } from 'react'
import { InsertBar } from './components/InsertBar'
import { Item } from './components/Item'
import { Items } from './constants/store'

const App = () => {
  const [items, setItems] = useState(Items)

  return (
    <div className='mx-4'>
      <InsertBar setItems={setItems}/>
      {items.map(({ task, isComplete, inFavourite }) => (
        <Item key={task} task={task} isComplete={isComplete} inFavourite={inFavourite}/>
      ))}
    </div>
  )
}

export default App
