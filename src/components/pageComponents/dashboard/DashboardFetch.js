import connect from '../../../app/lib/db'
import { useSession } from 'next-auth/react'

const dataFetch = async () => {
    const data = await connect()
    console.log(data)
}

export default dataFetch