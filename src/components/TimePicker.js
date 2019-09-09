import "date-fns";
import React from "react";
import Grid from "@material-ui/core/Grid";
import DateFnsUtils from "@date-io/date-fns";

import SnoozeIcon from "@material-ui/icons/Snooze";
import AlarmIcon from "@material-ui/icons/AddAlarm";
import { IconButton, InputAdornment, Button } from "@material-ui/core";
import { DateTimePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";

const TimePicker = ({
  handleDateChangeFrom,
  toDate,
  fromDate,
  handleDateChangeTo,
  handleFilter,
  isLoading
}) => {
  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Grid container justify="space-between">
        <Grid item xs={4}>
          <DateTimePicker
            autoOk
            disableFuture
            hideTabs
            label="From"
            ampm={true}
            value={fromDate}
            onChange={handleDateChangeFrom}
            allowKeyboardControl={false}
            leftArrowIcon={<AlarmIcon />}
            leftArrowButtonProps={{ "aria-label": "Prev month" }}
            rightArrowButtonProps={{ "aria-label": "Next month" }}
            rightArrowIcon={<SnoozeIcon />}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton>
                    <AlarmIcon />
                  </IconButton>
                </InputAdornment>
              )
            }}
          />
        </Grid>
        <Grid item xs={4}>
          <DateTimePicker
            autoOk
            disableFuture
            hideTabs
            label="To"
            ampm={true}
            value={toDate}
            onChange={handleDateChangeTo}
            allowKeyboardControl={false}
            leftArrowIcon={<AlarmIcon />}
            leftArrowButtonProps={{ "aria-label": "Prev month" }}
            rightArrowButtonProps={{ "aria-label": "Next month" }}
            rightArrowIcon={<SnoozeIcon />}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton>
                    <AlarmIcon />
                  </IconButton>
                </InputAdornment>
              )
            }}
          />
        </Grid>
        <Grid item xs={4}>
          <Button variant="outlined" color="primary" fullWidth type="submit" onClick={handleFilter} className="filterButton">
            {isLoading ? 'Filtering...' : 'Filter'}
          </Button>
        </Grid>
      </Grid>
    </MuiPickersUtilsProvider>
  );
};

export default TimePicker;
