import React, { useContext, useState } from 'react'
import { UserContext } from '../UserContext'
import { Link, Navigate, useParams } from 'react-router-dom'
import axios from 'axios';
import PlacesPage from './PlacesPage';
import ProfilePage from './ProfilePage';




const AccountPage = () => {
    const { user, ready, setUser } = useContext(UserContext);
    const [redirect, setRedirect] = useState('');


    let {subpage} = useParams();
    if (subpage === undefined)
    {
        subpage = 'profile';
    }

    async function logout() {
        await axios.post ('/logout');
        setUser(null);
        setRedirect ('/');
    }

    if (ready && !user && !redirect) {
        return <Navigate to={'/login'}/>
    }

    function linkClass (type = null) {
        let classes = 'py-2 px-6';
        if (type === subpage) {
            classes += ' bg-primary text-white rounded-full'
        }
        return classes;
    }

    if (redirect) {
        return <Navigate to={redirect} />
    }

    return (
        <div>
            <nav className="w-full flex justify-center mt-8 gap-4 mb-8">
                <Link className= {linkClass('profile')}  to={'/account'}>My profile</Link>
                <Link className={linkClass('bookings')} to={'/account/bookings'}>My bookings</Link>
                <Link className={linkClass('places')} to={'/account/places'}>My accommodations</Link>
            </nav> 
            {subpage === 'profile' && <ProfilePage user={user} logout={logout}/>}
            {subpage==='places' && <PlacesPage />}
        </div>
    )
}

export default AccountPage