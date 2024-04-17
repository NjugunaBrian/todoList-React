import { SunIcon, MoonIcon } from './icons';
import React from 'react'

const Modes = ({toggleTheme, isDarkMode}) => {

    return (
        <button type='button' className='mode-button' onClick={toggleTheme}>
            {isDarkMode ?
                <SunIcon id='lightIcon' />
                :
                <MoonIcon id='darkIcon' />
            }
        </button>
    )
}

export default Modes
