import { useEffect, useState } from 'react'
import { InsertBar } from './components/InsertBar'
import { Item } from './components/Item'
import { Items } from './constants/store'
import { Axios } from './hooks/axios'
import { Loader } from './components/Loader'

const App = () => {
  const [items, setItems] = useState(Items)
  const [isLoading, setLoading] = useState(true)

  useEffect(() => {
    const Fetch = async () => {
      setLoading(true)
      const { data: { content } } = await Axios<{ content: typeof Items }>('/', 'POST', {
        "service": "to-do",
        "action": "get",
        "content": {
          "group": "dd79cc1c-bc08-444c-bf28-a2001c88c4e6"
        }
      })
      setLoading(false)
      setItems(content)
    }
    Fetch()
  }, [])

  return (
    <>
      {isLoading && <Loader/>}
      {!isLoading && (
        <div className='mx-4 py-2'>
          <InsertBar setItems={setItems} />
          {items.map(({ task, isComplete, inFavourite, id }) => (
            <Item key={id} task={task} id={id} isComplete={isComplete} inFavourite={inFavourite} setItems={setItems} />
          ))}
        </div>
      )}
    </>
  )
}

export default App
