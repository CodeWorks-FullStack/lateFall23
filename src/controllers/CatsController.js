import BaseController from "../utils/BaseController.js";




export class CatsController extends BaseController{
  constructor(){
    console.log('🐈 loaded');
    super('api/cats') // label on this controller (door)
    this.router
    .get('', this.getCats)
    .get('/test', this.test)
    .get('/:color', this.getCatsByColor)
  }


  test(request, response, next){
    response.send('<h1>Cool! it worked!</h1>')
  }

  getCats(request, response, next){
    response.send('🐈🐈🐈🐈🐈🐈🐈')
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
