import { createElement, useState } from "react";
import classNames from "classnames";
import { StopCircleFill, PauseCircleFill, PlayCircleFill } from 'react-bootstrap-icons';
import "../ui/TextToSpeech.css";

const splitText = (text, from, to) => [
    text.slice(0, from),
    text.slice(from, to),
    text.slice(to)
  ];
  
  const HighlightedText = ({ text, from, to }) => {
    const [start, highlight, finish] = splitText(text, from, to);
    return (
      <p>
        {start}
        <span style={{ backgroundColor: "#b6d0ff" }}>{highlight}</span>
        {finish}
      </p>
    );
  };

export function BadgeSample(props) {
    const { type, defaultValue, className, style, value, bootstrapStyle, clickable, onClickAction, getRef } = props;
    const [disabled, setDisabled] = useState(false);
    const [pasuedd, setPasued] = useState(false);
  const [highlightSection, setHighlightSection] = useState({
    from: 0,
    to: 0
  });
  const synth = window.speechSynthesis;
  let utterance;
  const handleClick = () => {
    
    if (!synth) {
      console.error("no tts");
      return;
    }

    utterance = new SpeechSynthesisUtterance(value || defaultValue);
    utterance.addEventListener("start", () => setDisabled(true));
    utterance.addEventListener("end", () => setDisabled(false));
    utterance.addEventListener("boundary", ({ charIndex, charLength }) => {
      setHighlightSection({ from: charIndex, to: charIndex + charLength });
    });
    synth.speak(utterance);
  };

  const stoped = () => {
    synth.cancel(utterance);
  };

  const pasued = () => {
    setPasued(true);
    synth.pause(utterance);
  };

  const resumed = () => {
    setPasued(false);
    synth.resume(utterance);
  };
    return (
        <div className="App" onClick={onClickAction}
        ref={getRef}
        style={style}>
      <HighlightedText text={value || defaultValue} {...highlightSection} />
      <button className={disabled?"stopbtn" : "playbtn"} onClick={disabled? stoped : handleClick}>
      {disabled? <div><StopCircleFill />Stop</div> : <div><PlayCircleFill />Listen</div>}
      </button>
      {disabled? <button className={pasuedd?"playbtn" : "pausebtn"} onClick={pasuedd? resumed : pasued}>
      {pasuedd? <div><PlayCircleFill />Resume</div> : <div><PauseCircleFill />Pause</div>}
      </button> : ""}
      
    </div>
    );
}
