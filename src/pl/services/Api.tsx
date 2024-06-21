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
    name: string;
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
    serviceName: string;
    status: string;
    serviceCost: number;
    appointmentDate: string; // LocalDateTime in string format
    partnerName: string;
    clientName: string;
    usedParts: string[]; // List of used parts
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
export const getAllServicesForClient = async (clientName: string): Promise<ServiceDTO[]> => {
    try {
        const response = await axios.get<ServiceDTO[]>(`/api/services/client/${clientName}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};
export const getAllServicesForPartner = async (partnerName: string): Promise<ServiceDTO[]> => {
    try {
        const response = await axios.get<ServiceDTO[]>(`/api/services/partner/${partnerName}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const changeServicePartnerStatus = async (serviceId: number): Promise<void> => {
    try {
        await axios.post<void>(`/api/services/partner/change-status/${serviceId}`);
    } catch (error) {
        throw error;
    }
};
export const rejectServicePartnerStatus = async (serviceId: number): Promise<void> => {
    try {
        await axios.post<void>(`/api/services/partner/reject/${serviceId}`);
    } catch (error) {
        throw error;
    }
};

export const changeServiceClientStatus = async (serviceId: number): Promise<void> => {
    try {
        await axios.post<void>(`/api/services/client/change-status/${serviceId}`);
    } catch (error) {
        throw error;
    }
};

export interface DocumentDTO {
    id: number;
    number: string;
    user: string;
    partnerName: string;
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

export const getAllDocumentsForClient = async (clientName: string): Promise<DocumentDTO[]> => {
    try {
        const response = await axios.get<DocumentDTO[]>(`/api/documents/client/${clientName}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const getAllDocumentsForPartner = async (partnerName: string): Promise<DocumentDTO[]> => {
    try {
        const response = await axios.get<DocumentDTO[]>(`/api/documents/partner/${partnerName}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export interface StorageDTO {
    id: number;
    name: string;
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

export interface MechanicService {
    orderId: number;
    serviceName: string;
    serviceCost: number;
    appointmentDate: string;
    ourPartners: string[];
}

export const getAllMechanicServices = async (): Promise<MechanicService[]> => {
    const response = await axios.get<MechanicService[]>('/api/services/mechanic');
    return response.data;
};

export const updateMechanicService = async (
    orderId: number,
    appointmentDate: string,
    hour: string,
    partner: string,
    fullName: string
): Promise<void> => {
    await axios.post<MechanicService>(`/api/services/mechanic/add`, {
        orderId,
        appointmentDate,
        hour,
        partner,
        fullName
    });
    return
};
