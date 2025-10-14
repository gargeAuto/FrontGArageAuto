import { useState } from "react";
import CarSearch from "../component/CarSearch.tsx";
import type {CarSelection} from "../type/car.ts";

const Car = () => {
    const [immat, setImmat] = useState<string>("");
    const [km, setKm] = useState<string>("");
    const [carSel, setCarSel] = useState<CarSelection>({} as CarSelection);

    return(<CarSearch
        immat={immat}
        km={km}
        onChangeImmat={setImmat}
        onChangeKm={setKm}
        onChangeCar={setCarSel}
    />)
}
export default Car;