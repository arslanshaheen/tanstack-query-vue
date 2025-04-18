// src/api/fetchUsers.js
import axios from 'axios'

export const fetchUsers = async ({ pageParam = 1 }) => {
  try {
    const res = await axios.get(`https://api.github.com/users?per_page=10&page=${pageParam}`)
    return res.data
  } catch (error) {
    console.error(error)
    return []
  }
}
// src/api/fetchUsers.js
// export async function fetchUsers({ pageParam = 0 }) {
//     const res = await fetch(`https://api.github.com/users?since=${pageParam}&per_page=10`)
//     if (!res.ok) {
//       throw new Error('Failed to fetch users')
//     }
//     const data = await res.json()
//     return data
//   }

  