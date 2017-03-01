import fetch from 'isomorphic-fetch'

/**
 * Fetch with GET & cors enabled
 *
 * @param {string} The api to be requested
 *
 * @return {promise} Promise containing the fetched data
 */
export async function get(api) {
  let response
  try {
    response = await fetch(api, {method: 'GET', mode: 'cors'})
    response = await response.json()
  } catch(err) {
    response = new Promise()
    console.log(err)
  }
  return response
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
  let response
  try {
    response = await fetch(api, {method: 'POST', mode: 'cors', body: JSON.stringify(payload)})
    response = await response.json()
  } catch(err) {
    response = new Promise()
    console.log(err)
  }
  return response
}