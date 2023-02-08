class Joke{

  constructor(joke, score, date = new Date()){
    this.joke = joke;
    this.score = score;
    this.date = date;
  }
  get joke(){
    return this.joke;
  }
  set joke(joke){
    this.joke = joke
  }
  get score (){
    return this.score;
  }
  set score(score){
    this.score = score;
  }
  get date(){
    return this.date
  }
  set date(date){
    this.date = date;
  }

}