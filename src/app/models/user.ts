export class User {
  constructor(
    public login:string, 
    public followers:number, 
    public public_repos:number, 
    public avatar_url:string, 
    public following:number, 
    public url:string,
    public created_at:Date
  ){}
}
