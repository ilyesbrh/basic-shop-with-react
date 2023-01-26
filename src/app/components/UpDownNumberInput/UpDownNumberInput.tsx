import { FunctionComponent, useEffect } from "react";
import IconButton from '@mui/material/IconButton';
import { HiOutlineMinusCircle, HiOutlinePlusCircle } from "react-icons/hi";
import "./UpDownNumberInput.scss";

interface UpDownNumberInputProps {
    label: string;
    value: number;
    max?: number;
    min?: number;
    onChange?: Function;

}

const UpDownNumberInput: FunctionComponent<UpDownNumberInputProps> = ({ label, value, max, min, onChange }) => {

    useEffect(() => {
        console.log(Number.isInteger(min) && (value <= min!));
    },)

    return (
        <div className="upDownInput">
            <div className="label">{label}</div>
            <IconButton color="primary" component="button" disabled={Number.isInteger(min) && (value <= min!)} onClick={() => onChange && onChange(false)}>
                <HiOutlineMinusCircle />
            </IconButton>
            <strong>{value}</strong>
            <IconButton color="primary" component="button" disabled={Number.isInteger(max) && (value >= max!)} onClick={() => onChange && onChange(true)}>
                <HiOutlinePlusCircle />
            </IconButton>
        </div>
    );
}

export default UpDownNumberInput;