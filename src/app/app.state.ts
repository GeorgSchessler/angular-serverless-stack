export interface AppState {
    tasks: Task[];
    registration: Registration;
}

export interface Task {
    title: string;
    description: string;
}

export interface Registration {
    email: string;
    password: string;
    passwordRepeat: string;
    code: string
}
