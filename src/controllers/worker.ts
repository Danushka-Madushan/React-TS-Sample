import { Items } from '../constants/store'
import { Axios } from '../hooks/axios'

export const FetchTasks = async (group: string) => {
    const { data: { content } } = await Axios<{ content: typeof Items }>('/', 'POST', {
        "service": "to-do", "action": "get",
        "content": { "group": group }
    })
    return content
}

export const InsertTask = async (content: {
    group: string, id: string, isComplete: boolean,
    inFavourite: boolean, task: string
}) => {
    await Axios('/', 'POST', { "service": "to-do", "action": "insert", "content": content })
}

export const RemoveTask = async (content: {
    group: string, id: string
}) => {
    await Axios('/', 'POST', { "service": "to-do", "action": "remove", "content": content })
}
