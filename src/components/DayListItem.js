import React from "react";
import classNames from "classnames";
import "components/DayListItem.scss";

export default function DayListItem(props) {
  const dayListItem = classNames("day-list__item", {
    "day-list__item--selected": props.selected === true,
    "day-list__item--full": props.spots === 0,
  });

  const formatSpots = () => {
    let result = props.spots;
    if (props.spots === 1) {
      result += " spot";
    } else if (props.spots === 0) {
      result = "no spots";
    } else {
      result += " spots";
    }
    return result;
  };

  return (
    <li
      className={dayListItem}
      onClick={props.setDay}
      selected={props.selected}
      data-testid="day"
    >
      <h2 className="text--regular">{props.name}</h2>
      <h3 className="text--light">{formatSpots()} remaining</h3>
    </li>
  );
}
