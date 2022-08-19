interface ICreateEmployeesDTO {
  id?: string;
  first_name: string;
  last_name: string;
  position: string;
  username: string;
  avatar?: string;
  access_level: number;
  email: string;
  password: string;
  leader_username: string;
  gender: string;
  birthday: Date;
  hire_date: Date;
}

interface IFindById {
  id: string;
}
interface IFindEmployeesDTO {
  username?: string;
  email?: string;
}

export { ICreateEmployeesDTO, IFindEmployeesDTO, IFindById };
