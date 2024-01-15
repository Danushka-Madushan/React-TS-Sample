import { Dispatch, SetStateAction, useState } from 'react'
import { Items, States } from '../constants/store'

export const Item = ({ task, id, isComplete, inFavourite, setItems }: {
  task: string, id: string, isComplete: boolean, inFavourite: boolean,
  setItems: Dispatch<SetStateAction<typeof Items>>
}) => {
  const [IconCheck, setCheckIcon] = useState<{ path: string }>(isComplete ? States.Check.onChange : States.Check.Initial)
  const [IconFav, setRemoveIcon] = useState<{ path: string }>(inFavourite ? States.Fav.onChange : States.Fav.Initial)
  const [InFavourites, setFavourite] = useState<boolean>(inFavourite)
  const [IsComplete, setComplete] = useState<boolean>(isComplete)

  return (
    <div className="my-2 bg-[#323130] p-2 flex justify-between rounded-md hover:bg-[#3f3e3d] hover:cursor-pointer">
      <div className='flex'>
        <section className='pr-4 pl-3 flex items-center'>
          <svg
            onMouseEnter={() => IsComplete ? false : setCheckIcon(States.Check.onChange)}
            onMouseLeave={() => IsComplete ? false : setCheckIcon(States.Check.Initial)}
            onClick={() => {
              if (!IsComplete) {
                /* Mark item as complete */
                setItems((curItems) => {
                  return curItems.filter(({ id: curID }) => curID !== id)
                })
              }
              setComplete((cur) => !cur)
            }}
            xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24">
            <path fill="#78bafd" d={IconCheck.path} />
          </svg>
        </section>
        <section className='flex flex-col'>
          <span className='text-base text-white'>{task}</span>
          <span className='text-xs text-[#ffffffaf]'>Task</span>
        </section>
      </div>
      <div className='flex items-center'>
        <section className='pr-3'>
          <svg
            onMouseEnter={() => InFavourites ? false : setRemoveIcon(States.Fav.onChange)}
            onMouseLeave={() => InFavourites ? false : setRemoveIcon(States.Fav.Initial)}
            onClick={() => {
              if (!IsComplete) {
                /* Add item to favourites */
                console.log(task)
              }
              setFavourite((cur) => !cur)
            }}
            xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
            <path fill="#78bafd" d={IconFav.path} />
          </svg>
        </section>
      </div>
    </div>
  )
}
