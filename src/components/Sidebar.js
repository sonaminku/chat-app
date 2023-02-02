import React from 'react'
import CreateRoonBtnModal from './CreateRoonBtnModal'
import DashboardToggle from './dashboard/DashboardToggle'

const Sidebar = () => {
  return (
    <div className='h-100 pt-2'>
      <div>
        <DashboardToggle />
        <CreateRoonBtnModal />
      </div>
      bottom
    </div>
  )
}

export default Sidebar
