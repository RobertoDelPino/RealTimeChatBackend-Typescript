export class UserProfile{
    public name: string;
    public email: string;
    public avatar: string;
    constructor(name: string, email: string, avatar: string){
        this.name = name;
        this.email = email;
        this.avatar = avatar;
    }
}