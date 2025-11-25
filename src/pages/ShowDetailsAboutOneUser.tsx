import {fetchCustomerCarsById, fetchCustomers} from "../api/customer-api.ts";
import type {Customer} from "../type/customer.ts";
import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";

const ShowDetailsAboutOneUser = () => {
    const {id} = useParams();
    const [customer, setCustomer] = useState<Customer>();
    const [localstorageUser, setLocalstorageUser] = useState();
    useEffect(() => {

        if (id) {
            console.log(id, "id")
            fetchCustomerCarsById(id)
                .then((customer: Customer) => {
                    setCustomer(customer);
                })
            const localstorage = localStorage.getItem("userName");
            if(!localstorage)return null
            const localstorage2 = JSON.parse(localstorage);
            setLocalstorageUser(localstorage2);

        }
    }, [id]);

    return (
        <>
            <div>{localstorageUser?.name}</div>
          {/*  <div>{customer?.cars[0].model}</div>
            <div>{customer?.cars[1].model}</div>*/}
        </>
    );
};

export default ShowDetailsAboutOneUser;
