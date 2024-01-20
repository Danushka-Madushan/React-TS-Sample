import { useEffect, useState } from 'react'
import { InsertBar } from './components/InsertBar'
import { Item } from './components/Item'
import { Items } from './constants/store'
import { Axios } from './hooks/axios'
import { Loader } from './components/Loader'
import { useCookies } from 'react-cookie'
import { UNIQUE_ID } from './config/config'
import { v5 as uuidv5, v4 as uuidv4 } from 'uuid';

const App = () => {
  const [cookies, setCookie] = useCookies(['group'])
  const [items, setItems] = useState(Items)
  const [isLoading, setLoading] = useState(true)

  useEffect(() => {
    if (!cookies.group) {
      setCookie('group', uuidv5(uuidv4(), UNIQUE_ID), { path: '/' });
    }

    const Fetch = async () => {
      setLoading(true)
      const { data: { content } } = await Axios<{ content: typeof Items }>('/', 'POST', {
        "service": "to-do", "action": "get",
        "content": { "group": cookies.group }
      })
      setLoading(false)
      setItems(content)
    }

    Fetch()
  }, [cookies, setCookie])

  return (
    <>
      {isLoading && <Loader />}
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
