export interface Division {
    div_id: string;
    div_name: string;
}

export interface Company {
    company_id: string;
    company_name: string;
    divisions: Division[];
}

export interface LoginUser {
    userId: string;
    username: string;
    email: string;
    companies: Company[];
}

export interface LoginResponse {
    token: string;
    message?: string;
    user: LoginUser;
}

export interface SelectCompanyDivisionResponse {
    token: string;
    message?: string;
}
