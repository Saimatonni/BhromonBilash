import React from 'react'
import {Routes, Route, Navigate} from 'react-router-dom'
import Home from '../Pages/Home'
import Tours from '../Pages/Tours'
import TourDetails from '../Pages/TourDetails'
import Login from '../Pages/Login'
import Reagister from '../Pages/Reagister'
import SearchResultList from '../Pages/SearchResultList'
import ThankYou from '../Pages/ThankYou'
import TourDetailsPage from '../Pages/TourDetailsPage'
import BudgetTourDetails from '../Pages/BudgetTourDetails'
import RoomDetails from '../Pages/RoomDetails'
import UserProfile from '../Pages/UserProfile'


const Routers = () => {
  return (
    <Routes>
       <Route path ='/' element={<Navigate to = '/home' />}/>
       <Route path='/home' element={<Home/>}/>
       <Route path='/tours' element={<Tours/>}/>
       <Route path='/profile' element={<UserProfile/>}/>
       {/* <Route path='/tours/:id' element={<TourDetails/>}/> */}
       <Route path='/tours/:id' element={<TourDetailsPage/>}/>
       <Route path="/hotels/:id/:budgetType" element={<BudgetTourDetails />} />
       <Route path='/room/:id/:budgetType' element={<RoomDetails />} />
       <Route path='/login' element={<Login/>}/>
       <Route path='/register' element={<Reagister/>}/>
       <Route path='/thank-you' element={<ThankYou/>}/>
       <Route path='/tours/search' element={<SearchResultList/>}/>
    </Routes>
  )
}

export default Routers
