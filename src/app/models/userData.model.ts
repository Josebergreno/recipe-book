export class UserData {
  constructor(
    public email: string,
    public firstName: string,
    public lastName: string,
    public password: string,
    public securityQuestion: string,
    public securityAnswer: string,
    public imgPath?: string,
    public desc?: string
  ) {}
}
