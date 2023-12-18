const fakeDB = {
  cats: [
    {name: 'Jerry', color: 'black', emoji: '🐈‍⬛', id: 1},
    {name: 'Mini', color: 'black', emoji: '🐈‍⬛', id: 2},
    {name: 'Lucy', color: 'orange', emoji: '🐈', id: 3},
  ]
}

class CatsService{
adoptCat(catId) {
  const indexToRemove = fakeDB.cats.findIndex(cat => cat.id == catId)
  if(!fakeDB.cats[indexToRemove]) throw new Error(`Could not adopt, no cat at id: ${catId}`)
  fakeDB.cats.splice(indexToRemove, 1)
  return `she gone 🧑‍🍼`
}
createCat(payload) {
  const cat = payload
  cat.id = fakeDB.cats[fakeDB.cats.length -1].id + 1 // just crazy for sequenced id's today
  fakeDB.cats.push(cat)
  return cat
}
getCats(){
  // return 'cats in service🐈🐈🐈🐈🐈🐈🐈'// just for testing purposes
  const cats = fakeDB.cats // this is usually a request to the DATABASE, today just a fake database
  return cats
}
}

export const catsService = new CatsService()
