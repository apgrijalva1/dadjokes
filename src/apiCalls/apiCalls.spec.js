import { fetchJoke } from './apiCalls'

describe('fetchJoke', () => {
  it('returns an object if status code is ok', () => {
    window.fetch = jest.fn().mockImplementation(() => ({
      status: 200,
      json: () => new Promise((resolve, reject) => {
        resolve({
          joke: "joke here",
        })
      }),
    }))

    expect(fetchJoke()).resolves.toEqual({ joke: "joke here" })
  })

  it('throws an error if status code is not ok', () => {
    window.fetch = jest.fn().mockImplementation(() => ({
      status: 500,
    }))

    expect(fetchJoke()).rejects.toEqual(Error('Error fetching joke'))
  })
})
