export const fetchJoke = jest.fn()
  .mockImplementationOnce(() => ({
    "id": "R7UfaahVfFd",
    "joke": "My dog used to chase people on a bike a lot. It got so bad I had to take his bike away.",
    "status": 200
  }))
  .mockImplementationOnce(() => {
    throw(new Error('Error fetching joke'))
  })
