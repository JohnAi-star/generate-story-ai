import React from 'react'
import DashboardHeader from './-components/DashboardHeader'
import UserStoryList from './-components/UserStoryList'

function Dashboard() {
  return (
    <div className='p-10 md:px-20 lg:px-40 min-h-screen'>
      <DashboardHeader />

      <UserStoryList />
    </div>
  )
}

export default Dashboard