import { createElement, useCallback } from "react";

import { BadgeSample } from "./components/BadgeSample";
import "./ui/TextToSpeech.css";

export function TextToSpeech(props) {
    const { texttospeechType, texttospeechValue, valueAttribute, onClickAction, style, bootstrapStyle } = props;
    const onClickHandler = useCallback(() => {
        if (onClickAction && onClickAction.canExecute) {
            onClickAction.execute();
        }
    }, [onClickAction]);

    return (
        <BadgeSample
            type={texttospeechType}
            bootstrapStyle={bootstrapStyle}
            className={props.class}
            clickable={!!onClickAction}
            defaultValue={texttospeechValue ? texttospeechValue : ""}
            onClickAction={onClickHandler}
            style={style}
            value={valueAttribute ? valueAttribute.displayValue : ""}
        />
    );
}
