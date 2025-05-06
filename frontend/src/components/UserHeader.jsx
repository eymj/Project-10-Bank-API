import { useEffect, useState, useRef } from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { fetchProfile } from '../features/profile/profileSlice'
import axios from 'axios'

export default function UserHeader() {

    const [editing, setEditing] = useState(false)

    const dispatch = useDispatch()
    const { firstName, lastName } = useSelector(state => state.profile)
    const token = useSelector(state => state.auth.token)
    const [error, setError] = useState(null)

    const inputFirst = useRef(null);
    const inputLast = useRef(null);

    const handleSave = async (e) => {

        setError(null)

        const newFirst = inputFirst.current.value
        const newLast = inputLast.current.value

        if (!newFirst || !newLast) {
            setError('Invalid input')
            return
        }

        try {
            const response = await axios.put(
                `${import.meta.env.VITE_API_URL || 'http://localhost:3001'}/api/v1/user/profile`,
                {
                    'firstName': newFirst,
                    'lastName': newLast
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            )

            await dispatch(fetchProfile()).unwrap()
            setEditing(false)
        } catch (err) {
            console.log(err)
            setError(err.message)
        }


    }

    return !editing ? (
        <div className="user-header">
            <h1 className="user-header-greet">Welcome back</h1>
            <div className="user-header-info">{firstName} {lastName} !</div>
            <div className="user-header-controls"><button className="edit-button" onClick={() => setEditing(true)}>Edit Name</button></div>
        </div>
    ) : (
        <div className="user-header">
            <h1 className="user-header-greet">Welcome back</h1>
            <div className="user-header-info editing">
                <input
                    ref={inputFirst}
                    type="text"
                    id="firstname"
                    placeholder={firstName}
                />
                <input
                    ref={inputLast}
                    type="text"
                    id="lastname"
                    placeholder={lastName}
                />
            </div>
            { error ?? <div className="user-header-error">{error}</div>}
            <div className="user-header-controls">
                <button className="edit-button" onClick={() => handleSave()}>Save</button>
                <button className="edit-button" onClick={() => setEditing(false)}>Cancel</button>
            </div>
        </div>
    );
}
