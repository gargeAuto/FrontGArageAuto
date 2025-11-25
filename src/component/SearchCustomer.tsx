import {useState} from "react";
import {fetchSearchCustomers} from "../api/customer-api.ts";
import type {SearchUser} from "../type/SearchUser";

const SearchCustomer = () => {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState<SearchUser[]>([]);

    const handleSearch = async () => {
        if (query.trim().length === 0) return;
        const users = await fetchSearchCustomers(query);
        setResults(users);
    };

    return (
        <div>
            <input
                type="text"
                placeholder="Rechercher..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
            />

            <button onClick={handleSearch}>Rechercher</button>

            <ul>
                {results.map((user) => (
                    <li key={user.id}>
                        {user.name} {user.surname} — {user.email}
                        {user.model && <> — voiture : {user.model}</>}
                        {user.immat && <> — immatriculation : {user.make}</>}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default SearchCustomer;
