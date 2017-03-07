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
    if(response.status.toString().substring(0, 2) !== '20') {
      throw new Error('Failed to fetch the data')
    }    
    return await response.json()
  } catch(err) {
    throw new Error('No connection to API')
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
    if(response.status.toString().substring(0, 2) !== '20') {
      throw new Error('Failed to fetch the data')
    }
    return await response.json()
  } catch(err) {
    throw new Error('No connection to API')
  }
  
}
