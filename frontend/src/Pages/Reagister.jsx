import React ,{useState} from 'react'
import { Conatiner, Row, Col, Form, FormGroup, Button, Container } from 'reactstrap'
import { Link, useHistory} from 'react-router-dom';
import '../styles/login.css'
import registerImg from '../assets/images/register.png'
import userIcon from '../assets/images/user.png'

const Register = () => {

//   const [credentials, setCredentials] = useState({
//    userName:undefined,
//    address:undefined,
//    phone:undefined, 
//    email: undefined,
//    password: undefined,

//  })

//   const handleChange = e =>{
//     setCredentials(prev=>({...prev, [e.target.id]:e.target.value}))
// }

// const handleClick = e => {
//   e.preventDefault();
// }
// const {history} = useHistory();

const [credentials, setCredentials] = useState({
  username: '',
  address: '',
  phone: '',
  email: '',
  password: '',
});

const handleChange = (e) => {
  setCredentials({ ...credentials, [e.target.id]: e.target.value });
};

const handleSubmit = async (e) => {
  e.preventDefault();

  // Send a POST request to your registration API
  const registrationData = {
    name: credentials.username,
    address: credentials.address,
    phone: credentials.phone,
    email: credentials.email,
    password: credentials.password,
  };

  try {
    const response = await fetch('http://localhost:3000/api/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(registrationData),
    });

    if (response.ok) {
      const data = await response.json();
      if (data.success) {
        // Registration is successful, redirect to the login page
        // history.push('/login');
        console.log(data.message);
      } else {
        // Handle registration failure (you can display an error message)
        console.error(data.message);
      }
    } else {
      // Handle the case where the API request fails
      console.error('Failed to register.');
    }
  } catch (error) {
    // Handle any unexpected errors
    console.error('An error occurred:', error);
  }
};
  return (
    <section>
      <Container>
        <Row>
          <Col lg='8' className='m-auto'>
            <div className="login__container d-flex justify-content-between">
              <div className="login__img">
                <img src={registerImg} alt="" />
              </div>
              <div className="login__form">
                <div className="user">
                  <img src={userIcon} alt="" />
                </div>
                <h2>Register</h2>
                <Form onSubmit={handleSubmit}>
                <FormGroup>
                    <input type="text" placeholder='Username' required id="username" onChange={handleChange}/>
                  </FormGroup>
                  <FormGroup>
                    <input type="text" placeholder='Address' required id="address" onChange={handleChange}/>
                  </FormGroup>
                  <FormGroup>
                  <FormGroup>
                    <input type="text" placeholder='PhoneNumber' required id="phone" onChange={handleChange}/>
                  </FormGroup>
                    <input type="email" placeholder='Email' required id="email" onChange={handleChange}/>
                  </FormGroup>
                  <FormGroup>
                    <input type="password" placeholder='Password' required id="password" onChange={handleChange}/>
                  </FormGroup>
                  <Button className='btn secondary__btn auth__btn' type="submit">Register</Button>
                </Form>
                <p>Already have an accout? <Link to='/login'>Login</Link></p>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  )
}

export default Register