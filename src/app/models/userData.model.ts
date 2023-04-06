export class UserData {
  constructor(
    public id: number,
    public email: string | null,
    public firstName: string,
    public lastName: string,
    public password: string,
    public securityQuestion: string,
    public securityAnswer: string,
    public imgPath?: string,
    public description?: string
  ) {}
}
