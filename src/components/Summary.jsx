import quizCompleteImg from '../assets/quiz-complete.png';
import QUESTIONS from "../quesitions.js";

export default function Summary({userAnswers}) {
  const skippedAnswers = userAnswers.filter((answer) => answer === null);
  const correctAnswers = userAnswers.filter((answer, index) =>
    QUESTIONS[index].answers[0] === answer);

  const skippedAnswersShare = Math.round(skippedAnswers.length / userAnswers.length * 100);
  const correctAnswersShare = Math.round(correctAnswers.length / userAnswers.length * 100);
  const wrongAnswersShare = 100 - skippedAnswersShare - correctAnswersShare;

  return (
    <div id="summary">
      <img src={quizCompleteImg} alt="Trophy icon"/>
      <h2>Quiz Completed!</h2>
      <div id="summary-stats">
        <p>
          <span className="number">{skippedAnswersShare}%</span>
          <span className="text">skipped</span>
        </p>
        <p>
          <span className="number">{correctAnswersShare}%</span>
          <span className="text">answered correctly</span>
        </p>
        <p>
          <span className="number">{wrongAnswersShare}%</span>
          <span className="text">answered incorrectly</span>
        </p>
      </div>
      <ol>
        {userAnswers.map((answer, index) => {
          let cssClass = 'user-answer';
          // Check if the answer is correct or skipped
          if (answer === null) {
            cssClass += ' skipped';
          } else if (QUESTIONS[index].answers[0] === answer) {
            cssClass += ' correct';
          } else {
            cssClass += ' wrong';
          }

          return (
            <li key={index + answer}>
              <h3>{index + 1}</h3>
              <p className="question">{QUESTIONS[index].text}</p>
              <p className={cssClass}>{answer ?? "Skipped"}</p>
            </li>
          )
        })}
      </ol>
    </div>
  )
}