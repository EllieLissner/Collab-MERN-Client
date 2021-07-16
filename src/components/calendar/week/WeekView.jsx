import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import { format } from "date-fns";
import NewEvent from '../components/NewEvent'

export default function WeekView() {
    let history = useHistory();
    const [status, setStatus] = useState("idle");
    const [today, setToday] = useState(new Date());
    const [weekEvents, setWeekEvents] = useState([]);

    //DETERMINE CURRENT 7 DAY WEEK
    let toStartOfWeek = today.getDay() - 1;
    let startOfWeekDate = new Date();
    startOfWeekDate.setDate(today.getDate() - toStartOfWeek);
    //put dates of CURRENT WEEK in array
    let weekArray = [];
    for (let i = 0; i < 7; i++) {
        let date = new Date();
        date.setDate(startOfWeekDate.getDate() + i);
        weekArray.push(format(date, "yyyy-MM-dd"));
  }
    //put array in state
    const [weekRange, setWeekRange] = useState(weekArray);
    //AXIOS CALL(maybe?) just FETCH EVENTS OF THIS WEEK 
    //👹


    //take data and format days of the week
    useEffect(() => {
        //Determine the date for the current week's Monday
        //let current_month = format(today, "LLLL");
        let toStartOfWeek = today.getDay() - 1;
        let startOfWeekDate = new Date();
        startOfWeekDate.setDate(today.getDate() - toStartOfWeek);
    
        // Create an array with all the dates of the current week
        let weekArray = [];
        for (let i = 0; i < 7; i++) {
          let date = new Date();
          date.setDate(startOfWeekDate.getDate() + i);
          weekArray.push(format(date, "yyyy-MM-dd"));
        }
        setWeekRange(weekArray);
      }, [today]);
    
//REFRESH AFTER NEW EVENT FUNCTION
    const nextWeek = () => {
        let nextDay = new Date();
        nextDay.setDate(today.getDate() + 7);
        setToday(nextDay);
      };
    
      const previousWeek = () => {
        let prevDay = new Date();
        prevDay.setDate(today.getDate() - 7);
        setToday(prevDay);
      };
    return(
        <Wrapper>
          <NewEvent  />
           <WeekBar>
        <div className="month">{format(today, "LLLL yyyy")}</div>
        <div className="numbers">
          <WeekButton onClick={(ev) => previousWeek()}> {"‹"} </WeekButton>
          {weekRange.map((weekDay) => {
            let date = new Date(
              weekDay.slice(0, 4),
              weekDay.slice(5, 7) - 1,
              weekDay.slice(8, 10)
            );
            return <div>{date.getDate()}</div>;
          })}
          <WeekButton onClick={(ev) => nextWeek()}> {"›"} </WeekButton>
        </div>
      </WeekBar>
      <WeekContainer>
              <DateContainer>
                <WEDateContainer>
                <Tasks>
                      <SingleTask>
                        <AllDayEvent><h2>Monday July 12th: </h2></AllDayEvent>
                      </SingleTask>
                      <SingleTask>
                        <TaskTime>
                          <h4>8:00AM - 9:00AM - Take the kids to school: <br></br> Location: School </h4>
                        </TaskTime>
                      </SingleTask>
                      <SingleTask>
                        <TaskTime>
                        <h4>9:00AM-12PM - Work Meeting  </h4>
                        </TaskTime>
                      </SingleTask>
                </Tasks>
                </WEDateContainer>
              </DateContainer>

              <DateContainer>
                <WEDateContainer>
                  <Tasks>
                        <SingleTask>
                          <AllDayEvent><h2>Tuesday july 13th :</h2></AllDayEvent>
                        </SingleTask>
                        <SingleTask>
                        <TaskTime>
                          <h4>8:00AM - 9:00AM - Take the kids to school: </h4>
                        </TaskTime>
                      </SingleTask>
                  </Tasks>
                </WEDateContainer>
              </DateContainer>

              <DateContainer>
                <WEDateContainer>
                  <Tasks>
                        <SingleTask>
                          <AllDayEvent><h2>Wednesday july 14th :</h2></AllDayEvent>
                        </SingleTask>
                        <SingleTask>
                        <TaskTime>
                          <h4>8:00AM - 9:00AM - Take the kids to school: </h4>
                        </TaskTime>
                      </SingleTask>
                  </Tasks>
                </WEDateContainer>
              </DateContainer>

              <DateContainer>
                <WEDateContainer>
                  <Tasks>
                        <SingleTask>
                          <AllDayEvent><h2>Thursday july 15th :</h2></AllDayEvent>
                        </SingleTask>
                        <SingleTask>
                        <TaskTime>
                          <h4>8:00AM - 9:00AM - Take the kids to school: </h4>
                        </TaskTime>
                      </SingleTask>
                  </Tasks>
                </WEDateContainer>
              </DateContainer>

              <DateContainer>
                <WEDateContainer>
                  <Tasks>
                        <SingleTask>
                          <AllDayEvent><h2>Friday july 16th :</h2></AllDayEvent>
                        </SingleTask>
                        <SingleTask>
                        <TaskTime>
                          <h4>8:00AM - 9:00AM - Take the kids to school: </h4>
                        </TaskTime>
                      </SingleTask>
                  </Tasks>
                </WEDateContainer>
              </DateContainer>

              <DateContainer>
                <WEDateContainer>
                  <Tasks>
                        <SingleTask>
                          <AllDayEvent><h2>Saturday july 17th :</h2></AllDayEvent>
                        </SingleTask>
                        <SingleTask>
                        <TaskTime>
                          <h4>11:00AM - 2:00PM - Soccer Practice </h4>
                        </TaskTime>
                      </SingleTask>
                  </Tasks>
                </WEDateContainer>
              </DateContainer>

              <DateContainer>
                <WEDateContainer>
                  <Tasks>
                        <SingleTask>
                          <AllDayEvent><h2>Sunday july 18th :</h2></AllDayEvent>
                        </SingleTask>
                        <SingleTask>
                        <TaskTime>
                          <h4>12:00PM - 3:00PM - Brunch<br></br></h4>
                        </TaskTime>
                      </SingleTask>
                  </Tasks>
                </WEDateContainer>
              </DateContainer>
      </WeekContainer>
        </Wrapper>
    )
}
const Wrapper = styled.div`
  height: 900px;
  background-color: white;
`;
const WeekBar = styled.div`
  text-align: center;
  background-color: white;
  padding-bottom: 8px;
  .month {
    padding-top: 8px;
    font-size: 1.4rem;
    text-transform: lowercase;
  }
  .numbers {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding: 10px 0px;
    font-size: 1.3rem;
  }
`;
const WeekButton = styled.button`
  margin: 0 10px;
  border: none;
  background-color: white;
  font-size: 1.4rem;
  line-height: 1rem;
  &:active {
    outline: none;
  }
  &:focus {
    outline: none;
  }
`;
const WeekContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  height: 80%;
  .week-date {
    width: 100%;
    text-align: center;
    padding: 5px 0;
    font-size: 1.1rem;
    font-weight: 500;
    text-decoration: underline 3px solid rgb(187, 222, 215);
  }
`;

const DateContainer = styled.div`
  border: 1px solid #dae2f1;
  width: 49%;
  height: 43%;
`;
const WEDateContainer = styled.div`
  border-bottom: 1px solid #cedefd;
  height: 40%;
  &:last-of-type {
    border: none;
  }
`;

const Tasks = styled.div`
  padding: 5px 5px;
`;

const SingleTask = styled.div`
  margin: 5px 0;
`;
const AllDayEvent = styled.div`
  background-color: rgb(254, 182, 185, 0.7);
  padding: 5px 5px;
  margin: 5px 0px;
`;
const TaskTime = styled.div`
  display: inline;
  background-color: rgb(97, 191, 191);
  margin-right: 5px;
  font-size: 0.9rem;
  padding: 1px 2px;
  text-transform: lowercase;
  color: black;
  font-weight: 400;
`;
const TaskTitle = styled.div`
  display: inline;
  font-size: 0.95rem;
`;
