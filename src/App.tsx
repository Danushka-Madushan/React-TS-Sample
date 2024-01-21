import { useEffect, useState } from 'react'
import { v5, v4 } from 'uuid';
import { InsertBar } from './components/InsertBar'
import { Item } from './components/Item'
import { Items } from './constants/store'
import { Loader } from './components/Loader'
import { useCookies } from 'react-cookie'
import { UNIQUE_ID } from './config/config'
import { FetchTasks } from './controllers/worker'

const App = () => {
  const [cookies, setCookie] = useCookies(['group'])
  const [items, setItems] = useState(Items)
  const [isLoading, setLoading] = useState(true)

  useEffect(() => {
    if (!cookies.group) {
      setCookie('group', v5(v4(), UNIQUE_ID), { path: '/', expires: new Date(Date.now() + 10 ** 11) });
    }

    const Fetch = async () => {
      setLoading(true)
      const content = await FetchTasks(cookies.group)
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
