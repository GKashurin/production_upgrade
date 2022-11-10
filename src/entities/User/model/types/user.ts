export interface User {
    avatar?: string;
    id: string;
    username: string;
}

export interface UserSchema {
    authData?: User;
    _inited: boolean;
}
