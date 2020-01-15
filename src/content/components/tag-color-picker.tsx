import * as React from "react";
import { RGB } from "../../common/types";

export interface TagColorPickerProps {
    onValueChanged: (rgb: RGB) => void;
    initialValues?: RGB;
}

const TagColorPicker: React.FC<TagColorPickerProps> = ({ onValueChanged, initialValues }) => {
    const [rVal, setRVal] = React.useState<number>((initialValues && initialValues.R) || 0);
    const [gVal, setGVal] = React.useState<number>((initialValues && initialValues.G) || 0);
    const [bVal, setBVal] = React.useState<number>((initialValues && initialValues.B) || 0);
    
    const commonValueChangeHandler = (value: number, setCallback: React.Dispatch<React.SetStateAction<number>>) => {
        if(value == null || value < 0) {
            setCallback(0);
        } else if(value > 255) {
            setCallback(255);
        } else {
            setCallback(value);
        }
        
        onValueChanged({ R: value, G: gVal, B: bVal });
    }

    const rValChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        const val = Number(event.target.value);
        commonValueChangeHandler(val, setRVal);
    }

    const gValChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        const val = Number(event.target.value);
        commonValueChangeHandler(val, setGVal);
    }

    const bValChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        const val = Number(event.target.value);
        commonValueChangeHandler(val, setBVal);
    }

    return (
        <div className="user-tagger__tag-input__color-picker">
            <div className="user-tagger__tag-input__color-picker__preview" style={{background: `rgb(${rVal},${gVal},${bVal})`}}>

            </div>
            <span className="user-tagger__tag-input__color-picker__part">
                <input type="range" min="0" max="255" value={rVal} name="rRange" onChange={rValChangeHandler} />
                <input type="number" min="0" max="255" value={rVal} name="rNumber" onChange={rValChangeHandler} />
            </span>
            <span className="user-tagger__tag-input__color-picker__part">
                <input type="range" min="0" max="255" value={gVal} name="gRange" onChange={gValChangeHandler} />
                <input type="number" min="0" max="255" value={gVal} name="gNumber" onChange={gValChangeHandler} />
            </span>
            <span className="user-tagger__tag-input__color-picker__part">
                <input type="range" min="0" max="255" value={bVal} name="bRange" onChange={bValChangeHandler} />
                <input type="number" min="0" max="255" value={bVal} name="bNumber" onChange={bValChangeHandler} />
            </span>
        </div>
    );
}

export default TagColorPicker;