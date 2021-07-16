import React, { useEffect, useState } from 'react'
import axios from 'axios'
import styled from "styled-components";
import { RightArrow } from '@styled-icons/boxicons-regular/RightArrow'

export default function Itinerary() {
    const [eventData, setEventData] = useState([])

    useEffect(() => {
        const getDailyEvents = async () => {
            try{
                const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api-v1/calendar/event`)
                setEventData(response.data)
            }catch(error) {
                console.log(error)
            }
        }
        
        getDailyEvents()
        console.log({eventData}, )
    }, [])


    const eventList = eventData.map((activity, key) => {

        return (
            <ListItem>
                <RightArrow size="10"/> 
                <div>{activity.start.time.hours}:{activity.start.time.minutes } { activity.title}</div>
                <br></br>
                <br></br>
            </ListItem>
        )
    })
    return(
        <Wrapper>
            <div className='itineraryText'>
            <List>
                {eventList}
            </List>
            </div>
        </Wrapper>
    )
}

const div = styled.div`
&:hover {
    text-decoration: underline;
}
`

const List = styled.div`
`
const ListItem = styled.div`
    padding: 5px 0px;
`
const Wrapper = styled.div`
    width: 190px;
    margin: 10px 0px;
    .h2 {
    margin: 5px 0px;
    padding: 10px 0px;
    }
`