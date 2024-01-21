import { useSelector, useDispatch } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteListing = () => {

    const dispatch = useDispatch()

    const anecdotes = useSelector(state => {
        if ( state.filter === 'ALL' ) {
            return state.anecdotes
        }
        return state.anecdotes.filter(anecdotes => 
            anecdotes.content.toLowerCase().includes(state.filter.toLowerCase())
        )
    })

    const vote = (id, content, votes) => {

        const newObject = {
            id: id,
            content: content,
            votes: votes + 1
        }

        dispatch(voteAnecdote(newObject))
        dispatch(setNotification(`you voted '${content}'`, 5))
    }

    return (
    <div>
        {[...anecdotes]
        .sort((a,b) => b.votes - a.votes)
        .map(anecdote =>
            <div key={anecdote.id}>
            <div>
                {anecdote.content}
            </div>
            <div>
                has {anecdote.votes}
                <button onClick={() => vote(anecdote.id, anecdote.content, anecdote.votes)}>vote</button>
            </div>
            </div>
        )}
    </div>
    )
}

export default AnecdoteListing