import { useContext, useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { AppContext } from '@/context/AppContext'

interface SignUpProps {
  isLogin: boolean
  onSubmit: (username: string, password: string, confirmPassword?: string) => void
  onToggle: () => void
}

export function SignUpForm({ isLogin, onSubmit, onToggle }: SignUpProps) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const {SignIn, LogIn} = useContext(AppContext) as any;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (isLogin) {
      try {
        await onSubmit(username, password);
        // LogIn(username, password);
      } catch (error) {
        console.log(error);
      }
    } else {
      if (password === confirmPassword) {
        try {
          await SignIn(username, password);
          await onSubmit(username, password);
          isLogin = true;
          window.location.reload();
        } catch (error) {
          console.log(error);
        }
      }
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 w-full max-w-sm">
      <div className="space-y-2">
        <Label htmlFor="username" className="text-sm font-medium text-gray-700">
          Username
        </Label>
        <Input
          id="username"
          type="text"
          placeholder="Enter your username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="password" className="text-sm font-medium text-gray-700">
          Password
        </Label>
        <Input
          id="password"
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
        />
      </div>
      {!isLogin && (
        <div className="space-y-2">
          <Label htmlFor="confirmPassword" className="text-sm font-medium text-gray-700">
            Confirm Password
          </Label>
          <Input
            id="confirmPassword"
            type="password"
            placeholder="Reenter your password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
          />
        </div>
      )}
      <Button type="submit" className="w-full bg-black text-white hover:bg-gray-800">
        {isLogin ? 'Log In' : 'Sign Up'}
      </Button>
      <div className="text-center">
        <button
          type="button"
          onClick={onToggle}
          className="text-sm text-gray-600 hover:underline focus:outline-none"
        >
          {isLogin ? "Don't have an account? Sign up" : "Already have an account? Log in"}
        </button>
      </div>
    </form>
  )
}
