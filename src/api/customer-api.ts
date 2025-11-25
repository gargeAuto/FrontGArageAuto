import axios from "axios";
import api from "./api";
import type {Customer} from "../type/customer.ts"
import type {SearchUser} from "../type/SearchUser.ts";
//import type {Customer} from "../@types/customer.type.ts";


const ENDPOINT = "newusers"
//"/dashboard-garage/clients/${customer.id}"
export const fetchCustomers = async (): Promise<Customer[]> => {
    try {
        const response = await api.get(`/${ENDPOINT}`);

        return response.data.data.data;
    } catch (error) {
        console.error(error);
        return [];
    }
}

export const fetchCustomerCarsById = async (id: string): Promise<Customer> => {
    try {
        const response = await api.get(`/cars/${id}`);
        console.log(response.data?.data ,"Les voitures du clients: ");
        return response.data?.data;

    } catch (error) {
        console.error(error);
        return {} as Customer;
    }
}

export async function fetchSearchCustomers(query: string): Promise<SearchUser[]> {
    const response = await api.get(`/users-search?search=${query}`);
    console.log(response.data?.data, "Customer search: ");
    return response.data.data;
}

