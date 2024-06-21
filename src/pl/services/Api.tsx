// src/services/api.ts
import axios from '../../axiosConfig';

export interface UserDTO {
    id: number;
    name: string;
    email: string;
    role: string;
    password?: string;
    registerDate: string;
}

interface AuthRequest {
    email: string;
    password: string;
}

interface AuthResponse {
    role: string;
}

export const getAllUsers = async (): Promise<UserDTO[]> => {
    try {
        const response = await axios.get<UserDTO[]>('/api/users');
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const login = async (authRequest: AuthRequest): Promise<AuthResponse> => {
    const response = await axios.post<AuthResponse>('/api/users/login', authRequest);
    return response.data;
};

export const deleteUser = async (id: number): Promise<void> => {
    await axios.delete(`/api/users/delete/${id}`);
};

export const addUser = async (user: Omit<UserDTO, 'id' | 'registerDate'>): Promise<UserDTO> => {
    const response = await axios.post<UserDTO>('/api/users/add', user);
    return response.data;
};

export interface ServiceDTO {
    id: number;
    serviceDate: string; // LocalDateTime in string format
    userName: string;
    serviceName: string;
    price: number;
    status: string;
    createdDate: string; // LocalDateTime in string format
}


export const getAllServices = async (): Promise<ServiceDTO[]> => {
    try {
        const response = await axios.get<ServiceDTO[]>('/api/services');
        return response.data;
    } catch (error) {
        throw error;
    }
};

export interface DocumentDTO {
    id: number;
    number: string;
    user: string;
    type: string;
    date: string; // LocalDate in string format
}

export const getAllDocuments = async (): Promise<DocumentDTO[]> => {
    try {
        const response = await axios.get<DocumentDTO[]>('/api/documents');
        return response.data;
    } catch (error) {
        throw error;
    }
};

export interface StorageDTO {
    id: number;
    name: string;
    type: string;
    stock: number;
    price: number;
}

export const getAllStorage = async (): Promise<StorageDTO[]> => {
    try {
        const response = await axios.get<StorageDTO[]>('/api/storage');
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const addStorageItem = async (item: Omit<StorageDTO, 'id'>): Promise<StorageDTO> => {
    const response = await axios.post<StorageDTO>('/api/storage/add', item);
    return response.data;
};