import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import AuthService from '@/services/AuthService'
import axios, { type AxiosResponse } from 'axios'
import { toast } from 'sonner'

function LoginForm (): JSX.Element {
  const handleLogin = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault()
    const form = new FormData(e.currentTarget)
    const email = form.get('email') as string
    const password = form.get('password') as string

    try {
      await AuthService.login(email, password).then((res: AxiosResponse['data']) => {
        console.log(typeof res)
        toast.success(res.message as string)
      })
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data.message as string)
      }
    }
  }

  return (
    <form className='flex flex-col gap-4' onSubmit={handleLogin} action='post'>
      <Input
        type='email'
        name='email'
        placeholder='Correo electrónico'
      />
      <Input
        type='password'
        name='password'
        placeholder='Contraseña'
      />
      <Button type='submit' > Ingresar</Button>
    </form>
  )
}

export default LoginForm
