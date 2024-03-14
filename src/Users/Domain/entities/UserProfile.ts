export class UserProfile{
    public _id: string;
    public name: string;
    public email: string;
    public avatar: string;
    
    constructor(_id: string, name: string, email: string, avatar: string){
        this._id = _id;
        this.name = name;
        this.email = email;
        this.avatar = avatar;
    }
}