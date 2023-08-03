import React from 'react'

export const IconsMenu = () => {
  return (
    <nav id='icons-menu'>
        <div className="container">
            <ul>
                <li><i class="fa-solid fa-earth-europe"></i><a href='#location'>Location</a></li>
                <li><i class="fa-solid fa-umbrella"></i><a href='#current'>Current</a></li>
                <li><i class="fa-regular fa-clock"></i><a href='#hourly'>Hourly</a></li>
                <li><i class="fa-solid fa-calendar-day"></i><a href='#daily'>Daily</a></li>
            </ul>
        </div>
    </nav>
  )
}

