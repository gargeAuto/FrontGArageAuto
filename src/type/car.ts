import type {Dayjs} from "dayjs";

export type MakeName = string;
export type ModelName = string;
export type YearValue = number;

export type MakeDto = { id: number; name: string };
export type ModelDto = { id: number; name: string };
export type YearDto = { years: number };

export type CarSelection = {
    immat: string;
    km: string;
    make: MakeName | null;
    model: ModelName | null;
    year: YearValue | null;
    date?:Dayjs
};

export type CarSearchProps = {
    onChangeCar?: (sel: CarSelection) => void;
    immat: string;
    km: string;
    onChangeImmat: (v: string) => void;
    onChangeKm: (v: string) => void;
    onValidityChange?: (isValid: boolean) => void;
};
/*
export type CarDetailProps = {}
*/

export type CarDetail = {
    immat: string;
    km: string;
    make: string;
    model: string;
    year: number;
}