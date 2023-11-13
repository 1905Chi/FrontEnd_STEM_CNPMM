import React, { Component } from "react";
import { Calendar,momentLocalizer } from "react-big-calendar";
import moment from "moment";
import Dialog from "@mui/material/Dialog";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import "react-big-calendar/lib/css/react-big-calendar.css";

class CalendarCustom extends React.Component {
  constructor() {
    super();
    this.state = {
      events: [],
      title: "",
      start: new Date(),
      end: new Date(),
      desc: "",
      openSlot: false,
      openEvent: false,
      clickedEvent: {},
    };
    this.handleClose = this.handleClose.bind(this);
  }

  handleSlotSelected(slotInfo) {
    console.log("Real slotInfo", slotInfo);
    this.setState({
      title: "",
      desc: "",
      start: slotInfo.start,
      end: slotInfo.end,
      openSlot: true,
    });
  }

  handleEventSelected(event) {
    console.log("event", event);
    this.setState({
      openEvent: true,
      clickedEvent: event,
      start: event.start,
      end: event.end,
      title: event.title,
      desc: event.desc,
    });
  }

  setTitle(e) {
    this.setState({ title: e });
  }

  setDescription(e) {
    this.setState({ desc: e });
  }

  handleStartTime = (date) => {
    this.setState({ start: date });
  };

  handleEndTime = (date) => {
    this.setState({ end: date });
  };

  setNewAppointment() {
    const { start, end, title, desc } = this.state;
    let appointment = { title, start, end, desc };
    let events = this.state.events.slice();
    events.push(appointment);
    this.setState({ events, openSlot: false });
  }

  updateEvent() {
    const { title, desc, start, end, events, clickedEvent } = this.state;
    const index = events.findIndex((event) => event === clickedEvent);
    const updatedEvent = events.slice();
    updatedEvent[index].title = title;
    updatedEvent[index].desc = desc;
    updatedEvent[index].start = start;
    updatedEvent[index].end = end;
    this.setState({ events: updatedEvent, openEvent: false });
  }

  deleteEvent() {
    let updatedEvents = this.state.events.filter(
      (event) => event.start !== this.state.start
    );
    this.setState({ events: updatedEvents, openEvent: false });
  }

  handleClose() {
    this.setState({ openEvent: false, openSlot: false });
  }

  render() {
    const localizer = Calendar.momentLocalizer(moment);
    const eventActions = [
      <Button
        key="cancel"
        color="secondary"
        onClick={() => this.handleClose()}
      >
        Cancel
      </Button>,
      <Button
        key="delete"
        color="secondary"
        onClick={() => {
          this.deleteEvent();
          this.handleClose();
        }}
      >
        Delete
      </Button>,
      <Button
        key="confirm"
        color="primary"
        onClick={() => {
          this.updateEvent();
          this.handleClose();
        }}
      >
        Confirm Edit
      </Button>,
    ];

    const appointmentActions = [
      <Button
        key="cancel"
        color="secondary"
        onClick={() => this.handleClose()}
      >
        Cancel
      </Button>,
      <Button
        key="submit"
        color="primary"
        onClick={() => {
          this.setNewAppointment();
          this.handleClose();
        }}
      >
        Submit
      </Button>,
    ];

    return (
      <div id="Calendar">
        <Calendar
          events={this.state.events}
          views={["month", "week", "day", "agenda"]}
          localizer={localizer}
          timeslots={2}
          defaultView="month"
          defaultDate={new Date()}
          selectable={true}
          onSelectEvent={(event) => this.handleEventSelected(event)}
          onSelectSlot={(slotInfo) => this.handleSlotSelected(slotInfo)}
        />

        <Dialog
          title="Book an appointment"
          actions={appointmentActions}
          modal={false}
          open={this.state.openSlot}
          onClose={this.handleClose}
        >
          <TextField
            label="Title"
            onChange={(e) => {
              this.setTitle(e.target.value);
            }}
          />
          <br />
          <TextField
            label="Description"
            onChange={(e) => {
              this.setDescription(e.target.value);
            }}
          />
          <TextField
            label="Start Time"
            type="datetime-local"
            value='19-10-2021'
            onChange={(e) => this.handleStartTime(e.target.value)}
          />
          <TextField
            label="End Time"
            type="datetime-local"
            value={moment(this.state.end)}
            onChange={(e) => this.handleEndTime(e.target.value)}
          />
        </Dialog>

        <Dialog
          title={`View/Edit Appointment of 
          )}`}
          actions={eventActions}
          modal={false}
          open={this.state.openEvent}
          onClose={this.handleClose}
        >
          <TextField
            label="Title"
            value={this.state.title}
            onChange={(e) => this.setTitle(e.target.value)}
          />
          <br />
          <TextField
            label="Description"
            multiline
            value={this.state.desc}
            onChange={(e) => this.setDescription(e.target.value)}
          />
          <TextField
            label="Start Time"
            type="datetime-local"
            value='19-10-2021'
            onChange={(e) => this.handleStartTime(e.target.value)}
          />
          <TextField
            label="End Time"
            type="datetime-local"
            value='19-10-2021'
            onChange={(e) => this.handleEndTime(e.target.value)}
          />
        </Dialog>
      </div>
    );
  }
}

export default CalendarCustom;
