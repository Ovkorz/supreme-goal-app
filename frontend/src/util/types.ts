export class Goal { 
  name: string;
  description: string;
  progress: number;
  id: number;

  constructor( n: string, desc = "", init_progr = 0, id = -1){
    this.name = n;
    this.description = desc;
    this.progress = init_progr;
    this.id = id
  }

}

export class UserCredentials{
    username: string;
    password: string;

    constructor(usrnm:string, pw:string){
      this.username = usrnm
      this.password = pw
    }
}