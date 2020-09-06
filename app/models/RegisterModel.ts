/* eslint-disable @typescript-eslint/lines-between-class-members */
export default class RegisterModel {
  private loginId: string | undefined;
  private name: string | undefined;
  private alias: string | undefined;
  private phone: string | undefined;
  private email: string | undefined;
  private password: string | undefined;

  constructor(
    loginId: string | undefined,
    name: string | undefined,
    alias: string | undefined,
    phone: string | undefined,
    email: string | undefined,
    password: string | undefined
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
