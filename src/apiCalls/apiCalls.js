
const baseUrl = 'https://icanhazdadjoke.com/';
const opts = {
  headers: {
    'Accept': 'application/json',
    'User-Agent': 'kelly@kellyjandrews.com'
  }
}

export const fetchJoke = async () => {
  const response = await fetch(baseUrl, opts);
  if(response.status >= 400) {
    throw(new Error('Error fetching joke'))
  } else {
    return await response.json()
  }
}
