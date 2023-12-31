import React, { useEffect, useState } from 'react';
import { getAuth, signOut, onAuthStateChanged } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import app from '../../credenciales';

const auth = getAuth(app);
const user = auth.currentUser;

const Navbar = () => {
  const [usuario, setUsuario] = useState(null);
  const navigate = useNavigate();
  
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (usuarioFirebase) => {
      setUsuario(usuarioFirebase);
    });
  
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    // Navigate when the usuario state changes
    if (!usuario) {
      navigate('/Login');
    }
  }, [usuario, navigate]);
  
  const handleSignOut = async () => {
    try {
      await signOut(auth);
      setUsuario(null);
      navigate('/Login');
    } catch (error) {
      console.error('Error al cerrar sesión:', error.message);
    }
  };
  
  if (!usuario) {
    return null;
  }



  
  return (
    <> 
        <div className='navbar'>
            <div>

            </div>
            <div className='p-2'>
              <button onClick={handleSignOut}>
              Cerrar sesión
              </button>
            </div>

        </div> 

    </>
  );
}

export default Navbar;