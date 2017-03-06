import fetch from 'isomorphic-fetch'

/**
 * Fetch with GET & cors enabled
 *
 * @param {string} The api to be requested
 *
 * @return {promise} Promise containing the fetched data
 */
export async function get(api) {
  try {
    const response = await fetch(`${process.env.API_URL}${api}`, {method: 'GET', mode: 'cors'})
    if(response.status === 404) {
      throw new Error('No connection to API')
    }    
    return await response.json()
  } catch(err) {
    return new Promise()
  }
}

/**
 * Fetch with POST & cors enabled
 *
 * @param {string} The api to be requested
 * @param {object} Payload sent with the request
 *
 * @return {promise} Promise containing the fetched data
 */
export async function post(api, payload) {
  try {
    const response = await fetch(`${process.env.API_URL}${api}`, {method: 'POST', mode: 'cors', body: JSON.stringify(payload)})
    if(response.status === 404) {
      throw new Error('No connection to API')
    }
    return await response.json()
  } catch(err) {
    return new Promise()
  }
  
}
