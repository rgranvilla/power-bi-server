interface ICreateEmployeesDTO {
  id?: string;
  first_name: string;
  last_name: string;
  position: string;
  username: string;
  access_level: number;
  email: string;
  password: string;
  leader_id: string;
  gender: string;
  birthday: Date;
  hire_date: Date;
}

export { ICreateEmployeesDTO };
