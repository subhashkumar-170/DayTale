import React from 'react'
import { Link } from 'react-router-dom'

export default function Navbar() {
  return (
    <div>
      <ul>
        <Link to = '/home'>
          <li>Home</li>
        </Link>
        <Link to = '/new'>
          <li>New</li>
        </Link>
        <Link to = '/mytales'>
          <li>MyTales</li>
        </Link>
      </ul>
    </div>
  )
}
