import React, { useEffect } from 'react'
import { useUserStore } from '../../stores/userStore'

const Home = () => {
    const initAdminUser = useUserStore((state) => state.initAdminUser)

    useEffect(() => {
        initAdminUser()
    }, [])

    return <div>Home</div>
}

export default Home
