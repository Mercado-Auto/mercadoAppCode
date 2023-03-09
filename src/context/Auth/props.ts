import { Login, Register, User } from "../../interfaces/Auth";

export interface AuthContextProps {
	logged: boolean;
	currentUser?: User;
  isLoadingLogin: boolean;

	login: (data: Login) => Promise<void>;
	logout: () => void;
}
