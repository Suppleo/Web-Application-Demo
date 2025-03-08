const source = 'mock'
const dbModule = await import(`./data/${source}Repo.js`)
const { db } = dbModule

export { db }
