export interface AppState {
    tasks: Task[];
    registration: Registration;
    login: Login;
}

export interface Task {
    title: string;
    description: string;
}

export interface Registration {
    email: string;
    password: string;
    passwordRepeat: string;
    code: string;
}

export interface Login {
    email: string;
    password: string;
}
