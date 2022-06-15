import React from "react";
import "components/InterviewerList.scss";
import InterviewerListItem from "./InterviewerListItem";

export default function InterviewerList(props) {
  const interviewersArray = props.interviewers.map((interviewer) => {
    return (
      <InterviewerListItem
        key={interviewer.id}
        avatar={interviewer.avatar}
        name={interviewer.name}
        setInterviewer={() => {
          props.setInterviewer(interviewer.id);
        }}
        selected={props.interviewer === interviewer.id}
      />
    );
  });

  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">{interviewersArray}</ul>
    </section>
  );
}
