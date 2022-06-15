import React from "react";
import classNames from "classnames";
import "components/InterviewerListItem.scss";

export default function InterviewerListItem(props) {
  const interviewerListItem = classNames("interviewers__item", {
    "interviewers__item--selected": props.selected === true,
  });

  return (
    <li onClick={props.setInterviewer} className={interviewerListItem}>
      <img
        className="interviewers__item-image"
        src={props.avatar}
        alt={props.name}
      />
      {props.selected && props.name}
    </li>
  );
}
