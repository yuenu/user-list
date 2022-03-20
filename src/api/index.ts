import { Response } from "../types"

export const getUsers = async(count: number, page: number): Promise<Response> => {
  const res = await fetch(`https://randomuser.me/api/?results=${count}&page=${page}`, {
    headers: {
      'content-type': 'application/json'
    }
  })

  return await res.json()
}