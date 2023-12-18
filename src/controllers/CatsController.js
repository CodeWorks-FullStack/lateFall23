import { catsService } from "../services/CatsService.js";
import BaseController from "../utils/BaseController.js";
import { logger } from "../utils/Logger.js";




export class CatsController extends BaseController{
  constructor(){
    console.log('🐈 loaded');
    super('api/cats') // label on this controller (door)
    this.router
    .get('', this.getCats)
    .get('/test', this.test)
    .get('/:color', this.getCatsByColor)
    .post('', this.createCat)
    .delete('/:catId', this.adoptCat) //NOTE :catId, creates a parameter with the key catId on the request params object. that way users can pass info from the url ex. localhost:3000/api/cats/3
    // .........................................................⬆️ is the value matched with 'catId' in the code
  }


  test(request, response, next){
    response.send('<h1>Cool! it worked!</h1>')
  }

  getCats(request, response, next){
    try{
      // response.send('🐈🐈🐈🐈🐈🐈🐈') before service implement, good for testing
       const cats = catsService.getCats()
      response.send(cats)
    } catch(error){
      next(error)
    }
  }

  createCat(request, response, next){
    try {
      const payload = request.body
      // console.log('request body',payload); can't console log in methods, they get eaten, use logger log
      logger.log('request body', payload) //logger is just for console logging to the debug console
      const cat = catsService.createCat(payload)
      response.send(cat)
    } catch (error) {
      next(error)
    }
  }

  adoptCat(request, response, next){
    try {
      const catId = request.params.catId
      const message = catsService.adoptCat(catId)
      response.send(message)
    } catch (error) {
      next(error)
    }
  }

  getCatsByColor(request, response, next){
    try{

      // response.send(request.params) test did you see how cool that object was?
      if(request.params.color == 'orange'){
        response.send('🐈🐈🐈🐈🐈')
      } else if(request.params.color == 'black') {
        response.send('🐈‍⬛🐈‍⬛🐈‍⬛🐈‍⬛🐈‍⬛')
      } else {
        throw new Error(`${request.params.color} is not a valid input. You can have any color, as long as it is orange or black.`)
      }
    } catch(error) {
      // response.send('🐈‍⬛🐈🐈‍⬛🐈🐈‍⬛🐈🥒')
      next(error)// next with NO error, will kick the request down the hall, eventually leading to a 404
    }
  }
}
