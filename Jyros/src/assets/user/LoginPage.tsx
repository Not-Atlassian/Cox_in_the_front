import { useState, useContext } from 'react'
import { SignUpForm } from '@/assets/user/SignUpPage'
import '@/assets/user/index.css'
import { AppContext } from '@/context/AppContext';

export default function LoginPage() {
  const { users, setUser } = useContext(AppContext);
  const [isLogin, setIsLogin] = useState(true)
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (username: string, password: string) => {
    if (isLogin) {
      // Verify user credentials during login
      const user = users.find(
        (user) => user.username === username && user.password === password
      );

      if (user) {
        setUser(user);
        console.log('Login successful:', user);
      } else {
        setError('Invalid username or password');
      }
    } else {
      console.log('Signing up:', { username, password });
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
