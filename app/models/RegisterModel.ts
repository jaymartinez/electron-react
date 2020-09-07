/* eslint-disable @typescript-eslint/lines-between-class-members */
export default class RegisterModel {
  private loginId: string;
  private name: string;
  private alias: string;
  private phone: string;
  private email: string;
  private password: string;

  constructor(
    loginId: string,
    name: string,
    alias: string,
    phone: string,
    email: string,
    password: string
  ) {
    this.loginId = loginId;
    this.name = name;
    this.alias = alias;
    this.phone = phone;
    this.email = email;
    this.password = password;
  }

  get LoginId() {
    return this.loginId;
  }

  get Name() {
    return this.name;
  }

  get Alias() {
    return this.alias;
  }

  get Email() {
    return this.email;
  }

  get Password() {
    return this.password;
  }

  get Phone() {
    return this.phone;
  }
}
