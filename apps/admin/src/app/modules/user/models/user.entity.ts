import { ModuleResponse } from "./modules.entity";

export class UserResponse{
 id = 0;
 fullName : string;
 email : string;
 rolId : number;
 rol : string;
 modules : ModuleResponse[] = [];
}

export class UserResponseEdit{
  id : number;
  fullName : string;
  email : string;
  password : string;
  rolId : number;
  rol : string;
  modules : ModuleResponse[] = [];
}

export class UserRequest{
  id = 0;
  fullName : string;
  email : string;
  password : string;
  rolId : number;
  modules : ModuleResponse[] = [];
}



