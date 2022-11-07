interface IUserResponseDTO {
  id: string;
  username: string;
  email: string;
  avatar: string;
  avatar_url(): string;
}

export { IUserResponseDTO };
