import "./styles.css";

export default function SessionContainer({ session }) {
  return (
    <li className="day__container">
      <p className="day__ident">Day {session.day}</p>
      {session.exercises.length > 0 && (
        <ul className="day__exercise__list">
          {session.exercises.map((exercise, index) => (
            <li className="day__exercise__item" key={index + exercise}>
              <div>{exercise.name.toUpperCase()}</div>
              <div>{exercise.mode}</div>
            </li>
          ))}
        </ul>
      )}
    </li>
  );
}
