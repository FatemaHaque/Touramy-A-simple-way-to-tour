import React, { useRef } from 'react'
import './search-bar.css'
import { Col, Form, FormGroup } from 'reactstrap'
import { BASE_URL } from '../utils/config'
import { useNavigate } from 'react-router-dom'

const SearchBar = () => {
   const locationRef = useRef('')
   // const distanceRef = useRef(0)
   // const maxGroupSizeRef = useRef(0)
   const navigate = useNavigate()

   const searchHandler = async() => {
      const location = locationRef.current.value
      // const distance = distanceRef.current.value
      // const maxGroupSize = maxGroupSizeRef.current.value

      if (location === '' ) {
         return alert('All fields are required!')
      }

      const res = await fetch(`${BASE_URL}/tours/search/getTourBySearch?city=${location}`)
      
      if(!res.ok) alert('Something went wrong')

      const result = await res.json()

      console.log(result)

      navigate(`/tours/search?city=${location}`, {state: result.data})
   }

   return <Col lg="12" className='bg-white rounded-full px-5 py-2'>
      <div className="search__bar">
         <Form className='flex items-center justify-between gap-4'>
            <FormGroup className='d-flex gap-3 form__group '>
               <span><i class='ri-map-pin-line'></i></span>
               <div>
                  <h6 className='text-2xl'>Location</h6>
                  <input type="text" placeholder='Where are you going?' ref={locationRef} />
               </div>
            </FormGroup>
            {/* <FormGroup className='d-flex gap-3 form__group form__group-fast'>
               <span><i class='ri-map-pin-time-line'></i></span>
               <div>
                  <h6>Distance</h6>
                  <input type="number" placeholder='Distance k/m' ref={distanceRef} />
               </div>
            </FormGroup>
            <FormGroup className='d-flex gap-3 form__group form__group-last'>
               <span><i class='ri-group-line'></i></span>
               <div>
                  <h6>Max People</h6>
                  <input type="number" placeholder='0' ref={maxGroupSizeRef} />
               </div>
            </FormGroup> */}

            <span className='search__icon' type='submit' onClick={searchHandler}>
               <i class='ri-search-line'></i>
            </span>
         </Form>
      </div>
   </Col>
}

export default SearchBar