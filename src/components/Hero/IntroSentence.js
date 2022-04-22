import { useEffect, useState } from "react";
import AnimChar from "../UI/AnimChar/AnimChar";

const IntroSentence = (props) => {
  const { sentence, classes } = props;
  const [letters, setLetters] = useState([]);

  useEffect(() => {
    const lettersElemArr = [];
    let delay = 100,
      counter = 0;

    sentence.split(" ").forEach((word) => {
      if (word === "<br>")
        return lettersElemArr.push(<br key={`<br>-${counter}`} />);

      for (let i = 0; i < word.length; i++) {
        counter++;

        lettersElemArr.push(
          <AnimChar
            key={counter}
            char={word[i]}
            delay={delay * counter}
            isSpaced={i === word.length - 1}
          />
        );
      }
    });

    setLetters(lettersElemArr);
  }, [sentence]);

  return <div className={classes}>{letters}</div>;
};

export default IntroSentence;
