import { Dispatch, FormEvent, SetStateAction, useState } from 'react'
import { Items, States } from '../constants/store'
import { useCookies } from 'react-cookie'
import { v4 } from 'uuid';
import { InsertTask } from '../controllers/worker';

export const InsertBar = ({ setItems }: {
  setItems: Dispatch<SetStateAction<typeof Items>>
}) => {
  const [newItem, setnewItem] = useState<string>('')
  const [cookies] = useCookies(['group'])

  const addItem = async () => {
    if (newItem.length === 0) {
      return
    }

    const newTask = { isComplete: false, inFavourite: false, task: newItem, id: v4() }
    setItems((curItems) => [...curItems, newTask])

    setnewItem('')
    await InsertTask({ group: cookies.group, ...newTask })
  }

  const onFormSubmit = (event: FormEvent) => {
    event.preventDefault()
    addItem()
  }

  return (
    <div className='flex flex-col bg-[#323130] rounded-md  mb-3'>
      <form onSubmit={onFormSubmit} className='flex border-b-[1px] border-b-[#ffffff41] px-3 pt-2'>
        <section className='pr-2 pl-2 flex items-center'>
          <svg
            xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24">
            <path fill="#78bafd" d={States.Check.Initial.path} />
          </svg>
        </section>
        <input
          autoComplete='off'
          value={newItem}
          onChange={({ target: { value } }) => setnewItem(value)}
          className='bg-[#323130] p-2 text-white w-[100%] focus:outline-none text-base placeholder-[#78bafd]'
          type="text" name="task" id="taskinput" placeholder='Add a task'
        />
      </form>
      <div className='flex justify-between px-4 py-2'>
        <div className='flex'>
          <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" className='p-1 hover:bg-[#ffffff15] rounded-md'>
            <path fill="#ffffffe0" d="M5.615 21q-.69 0-1.152-.462Q4 20.075 4 19.385V6.615q0-.69.463-1.152Q4.925 5 5.615 5h1.77V3.308q0-.233.153-.386q.152-.153.385-.153t.386.153q.153.153.153.386V5h7.153V3.27q0-.214.144-.357t.356-.144q.214 0 .357.143t.143.357V5h1.77q.69 0 1.152.463q.463.462.463 1.152v12.77q0 .69-.462 1.152q-.463.463-1.153.463zm0-1h12.77q.23 0 .423-.192q.192-.193.192-.423v-8.77H5v8.77q0 .23.192.423q.193.192.423.192M5 9.615h14v-3q0-.23-.192-.423Q18.615 6 18.385 6H5.615q-.23 0-.423.192Q5 6.385 5 6.615zm0 0V6zm7 4.539q-.31 0-.54-.23q-.23-.23-.23-.54q0-.309.23-.539q.23-.23.54-.23q.31 0 .54.23q.23.23.23.54q0 .31-.23.539q-.23.23-.54.23m-4 0q-.31 0-.54-.23q-.23-.23-.23-.54q0-.309.23-.539q.23-.23.54-.23q.31 0 .54.23q.23.23.23.54q0 .31-.23.539q-.23.23-.54.23m8 0q-.31 0-.54-.23q-.23-.23-.23-.54q0-.309.23-.539q.23-.23.54-.23q.31 0 .54.23q.23.23.23.54q0 .31-.23.539q-.23.23-.54.23M12 18q-.31 0-.54-.23q-.23-.23-.23-.54q0-.309.23-.539q.23-.23.54-.23q.31 0 .54.23q.23.23.23.54q0 .31-.23.54Q12.31 18 12 18m-4 0q-.31 0-.54-.23q-.23-.23-.23-.54q0-.309.23-.539q.23-.23.54-.23q.31 0 .54.23q.23.23.23.54q0 .31-.23.54Q8.31 18 8 18m8 0q-.31 0-.54-.23q-.23-.23-.23-.54q0-.309.23-.539q.23-.23.54-.23q.31 0 .54.23q.23.23.23.54q0 .31-.23.54Q16.31 18 16 18" />
          </svg>
          <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" className='p-1 mx-1 hover:bg-[#ffffff15] rounded-md'>
            <path fill="#ffffffe0" d="M5.5 18.77q-.213 0-.356-.145Q5 18.481 5 18.27q0-.213.144-.356q.143-.144.356-.144h1.115V9.846q0-1.96 1.24-3.447Q9.097 4.912 11 4.546V4q0-.417.291-.708q.291-.292.707-.292q.415 0 .709.292Q13 3.583 13 4v.546q1.904.366 3.144 1.853q1.24 1.488 1.24 3.447v7.923H18.5q.213 0 .356.144t.144.357q0 .213-.144.356t-.356.143zm6.497 2.615q-.668 0-1.14-.475q-.472-.474-.472-1.14h3.23q0 .67-.475 1.143q-.476.472-1.143.472m-4.382-3.616h8.77V9.846q0-1.823-1.281-3.104q-1.28-1.28-3.104-1.28t-3.104 1.28q-1.28 1.281-1.28 3.104z" />
          </svg>
          <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" className='p-1 hover:bg-[#ffffff15] rounded-md'>
            <path fill="#ffffffe0" d="M12.077 19q-2.931 0-4.966-2.033q-2.034-2.034-2.034-4.964q0-2.93 2.034-4.966Q9.146 5 12.077 5q1.783 0 3.338.847q1.556.847 2.508 2.365V5.5q0-.213.144-.356T18.424 5q.213 0 .356.144q.143.143.143.356v3.923q0 .343-.232.576q-.232.232-.576.232h-3.923q-.212 0-.356-.144t-.144-.357q0-.213.144-.356t.356-.143h3.2q-.78-1.496-2.197-2.364Q13.78 6 12.077 6q-2.5 0-4.25 1.75T6.077 12q0 2.5 1.75 4.25t4.25 1.75q1.787 0 3.271-.968q1.485-.969 2.202-2.572q.085-.197.274-.276q.19-.08.388-.013q.211.067.28.275q.07.208-.015.404q-.833 1.885-2.56 3.017Q14.19 19 12.077 19" />
          </svg>
        </div>
        <div>
          <button type="button" onClick={addItem} className={`text-[12px] px-2 py-1 text-[#ffffffb9] border-[1px] border-[#ffffff41] ${ newItem.length !== 0 ? '' : 'hover:cursor-not-allowed' }`}>Add</button>
        </div>
      </div>
    </div>
  )
}
