export class Goal { 
  name: string;
  description: string;
  target: number;
  progress: number;
  id: number;
  
  done = 0;

  constructor( n: string, desc = "", t =1, d= 0, id = -1){
    this.name = n;
    this.description = desc;
    this.target = t;
    this.done = d;
    this.id = id

    this.progress = this.done / this.target;
  }

  getProgress(){
    this.progress = this.done / this.target;
    return this.progress;
  }
}

export type UserCredentials = {
    username: string;
    password: string;
    token: string;
}

export type GoalData = {
  id: number,
  title:string,
  description: string,

  target:number,
  amount_done: number,
  created_by: number,
}