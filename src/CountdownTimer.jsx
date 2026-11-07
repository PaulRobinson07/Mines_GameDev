import React, {useState, useEffect } from 'react';
import './CountdownTimer.css';

function CountdownTimer() {
	//XXX Target date is in year-month-day-t(spacing)hour-minute-second
	const targetDate = new Date("2026-11-09T23:59:59").getTime();

	//variables used to stor time
	const [time_left, update_time] = 
	useState({
		days: 0,
		hours: 0,
		minutes: 0,
		seconds:0 
	});

	//updates the variable of time every second
	useEffect(() => {
		//makes the intervalID to update every second
		let intervalId;

		//@brief calculates time and returns if timer should be ended
		//@return bool
		const calculateTime = () => {
			//looped code
				//gets the time differences
				const now = new Date().getTime();
				const distance = targetDate - now;

				//if the time is less than zero don't update any more
				if (distance < 0) {
					//end the timer
					clearInterval(intervalId);

					//set the countdown timer to be zero since the timer is finished
					update_time({
						days: 0,
						hours: 0,
						minutes: 0,
						seconds: 0
					});
					return true;
				}

				//if the timer is still counting update the time
				else {
					update_time({
						days: Math.floor(distance / (1000 * 60 * 60 * 24)),
						hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
						minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
						seconds: Math.floor((distance % (1000 * 60)) / 1000)
					});
					return false;
				}
			}
			//calculates time left on initalization of timer
			const stop_timer = calculateTime();

			//stops the timer and deletes the timer if needed
			if (stop_timer) {
				clearInterval(intervalId);
				return;
			}
			
			//loop every second to update time
			//calculates time and checks if the timer should be stopped
			intervalId = setInterval(() => {
				const stop_timer = calculateTime();
				if (stop_timer) {
					clearInterval(intervalId);
				}
			
			}, 1000);
		
		//XXX do not remove to prevent memory leaks
		return () => clearInterval(intervalId);
	}, []);
	
	//pads the output of timer
	const pad = (num) => String(num).padStart(2,'0');
	
	//html elements
	return(
		<div className='countDownTimerBox'>
			<h1 className='countDownHeader'>Time Until Next Game Jam</h1>
			<p className='countDownTimer'>{pad(time_left.days)}:{pad(time_left.hours)}:{pad(time_left.minutes)}:{pad(time_left.seconds)}</p>
		</div>
	);
}
export default CountdownTimer 
