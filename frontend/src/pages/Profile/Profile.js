import './Profile.css'

import { useEffect,useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { updateProfileInformation } from '../../store/slices/authSlice';

const Profile = () => {
  const dispatch = useDispatch();
  const [ editingInformation , setEditingInformation ] = useState(false);

  const { user } = useSelector(state => state.auth);  
  const profile = user.profile;

  const firstNameRef = useRef();
  const lastNameRef = useRef();
  const addressRef = useRef();
  const address2Ref = useRef();
  const cityRef = useRef();
  const zipCodeRef = useRef();
  const stateRef = useRef();
  
  const editProfile = () => {
    setEditingInformation(true);
  };

  const updateProfile = () => {
    const newProfile = { ...profile,
      firstName: firstNameRef.current.value,
      lastName: lastNameRef.current.value,
      address: addressRef.current.value,
      address2: address2Ref.current.value,
      city: cityRef.current.value,
      zipCode: zipCodeRef.current.value,
      state: stateRef.current.value
    }

    dispatch(updateProfileInformation({ newProfile, email: user.email }));
    setEditingInformation(false);
  };

  useEffect(() => {
    if(editingInformation){
      firstNameRef.current.value = profile.firstName ? profile.firstName : "";
      lastNameRef.current.value = profile.lastName ? profile.lastName : "";
      addressRef.current.value = profile.address ? profile.address : "";
      address2Ref.current.value = profile.address2 ? profile.address2 : "";
      cityRef.current.value = profile.city ? profile.city : "";
      zipCodeRef.current.value = profile.zipCode ? profile.zipCode : "";
      stateRef.current.value = profile.state ? profile.state : "";
    }
  }, [editingInformation])

  return (
    <div className="profile-page">
      <h1 className="center">Profile</h1>
      <div className="profile-page-main">
        <div className="profile-page-information-wrapper">
          <div className="profile-page-information">
            <p>Email: </p>
            <p>{ user.email }</p>
            <p>First Name: </p>
            { editingInformation ? <input type="text"  ref={ firstNameRef }/> :
              <p>{ profile.firstName }</p>}
            <p>Last Name: </p>
            { editingInformation ? <input type="text" ref= { lastNameRef }/> :
              <p>{ profile.lastName }</p>}
            <p>Address: </p>
            { editingInformation ? <input type="text" ref= { addressRef }/> :
              <p>{ profile.address }</p>}
            <p>Address Line 2:</p>
            { editingInformation ? <input type="text" ref= { address2Ref }/> :
              <p>{ profile.address2 }</p>}
            <p>Town/City: </p>
            { editingInformation ? <input type="text" ref= { cityRef }/> :
              <p>{ profile.city }</p>}
            <p>Postal Code: </p>
            { editingInformation ? <input type="text" ref= { zipCodeRef }/> :
              <p>{ profile.zipCode }</p>}
            <p>State: </p>
            { editingInformation ? <input type="text" ref= { stateRef }/> :
              <p>{ profile.state }</p>}
          </div>
          <div className="profile-page-information-buttons">
            {!editingInformation && 
              <button className="profile-page-information-button" 
                  onClick={ editProfile }>Edit</button>
            }
            {editingInformation && 
              <button className="profile-page-information-button"
                  onClick={ () => setEditingInformation(false) }>Cancel</button>
            }
            {editingInformation && 
              <button className="profile-page-information-button"
                  onClick={ updateProfile }>Confirm</button>
            }
          </div>
        </div>
        <div className="profile-page-preferences">

        </div>
      </div>
    </div>
  );
};

export default Profile;