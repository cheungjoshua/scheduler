import React from "react";
import DayListItem from "components/DayListItem";

export default function DayList(props) {
  const dayListItem = props.days.map((day) => {
    return (
      <DayListItem
        key={day.id}
        name={day.name}
        spots={day.spots}
        selected={day.name === props.day}
        setDay={props.setDay}
      />
    );
  });

  return <ul>{dayListItem}</ul>;
}
