import { useState, useContext } from 'react'
import { SignUpForm } from '@/assets/user/SignUpPage'
import '@/assets/user/index.css'
import { AppContext } from '@/context/AppContext';
import { useNavigate } from 'react-router-dom';

export default function LoginPage() {

  const [isLogin, setIsLogin] = useState(true);
  const {LogIn} = useContext(AppContext) as any;
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate(); // Initialize navigate hook

  const handleSubmit = async (username: string, password: string) => {
    try {
      LogIn(username, password);
      navigate('/backlog');
    }
    catch (error){
      // if(error.message == "")
      console.log(error)

    }
  };

  const toggleAuthMode = () => {
    setIsLogin(!isLogin)
  }

  return (
    <div className=" items-center justify-center bg-gray-100">
      <div className="bg-white w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">
          {isLogin ? 'Log In' : 'Sign Up'}
        </h1>
        <SignUpForm
          isLogin={isLogin}
          onSubmit={handleSubmit}
          onToggle={toggleAuthMode}
        />
      </div>
    </div>
  )
}
